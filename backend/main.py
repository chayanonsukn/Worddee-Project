from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx 
import random
import uvicorn
import json
import os

app = FastAPI()

# ========================================================
# อนุญาตให้ Frontend (Next.js) ใช้งาน API ได้
# ========================================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ========================================================
# URL ของ n8n (Production URL)
# ========================================================
N8N_HOST = os.getenv("N8N_HOST", "localhost") 
N8N_WEBHOOK_URL = f"http://{N8N_HOST}:5678/webhook/validate" 

# คลังคำศัพท์จำลอง
WORDS_DB = [
    {"word": "Resilience", "meaning": "ความสามารถในการฟื้นตัว", "level": "Advanced"},
    {"word": "Ambition", "meaning": "ความทะเยอทะยาน", "level": "Intermediate"},
    {"word": "Curiosity", "meaning": "ความอยากรู้อยากเห็น", "level": "Intermediate"},
    {"word": "Negotiate", "meaning": "เจรจาต่อรอง", "level": "Advanced"},
    {"word": "Perspective", "meaning": "มุมมอง", "level": "Intermediate"},
    {"word": "Happy", "meaning": "มีความสุข", "level": "Beginner"},
    {"word": "Journey", "meaning": "การเดินทาง", "level": "Beginner"},
]

# ========================================================
# รูปแบบฟอร์มข้อมูลที่ส่งเข้ามา
# ========================================================
class SentenceInput(BaseModel):
    word: str
    sentence: str

# ========================================================
# API ENDPOINTS
# ========================================================

@app.get("/")
def read_root():
    return {"message": "Worddee Backend is Ready!"}

@app.get("/api/word")
def get_random_word():
    return random.choice(WORDS_DB)

@app.post("/api/validate-sentence")
async def validate_sentence(data: SentenceInput):
    print(f"Checking: {data.word} -> {data.sentence}")
    
    async with httpx.AsyncClient() as client:
        try:
            # 1. ส่งข้อมูลไป n8n
            response = await client.post(
                N8N_WEBHOOK_URL,
                json={"word": data.word, "sentence": data.sentence},
                timeout=30.0
            )
            
            # 2. รับของตอบกลับ
            n8n_data = response.json()
            
            # เช็คก่อนว่า n8n ส่ง JSON ที่ถูกต้องมาเลยหรือเปล่า? (ถ้าใช่ ก็ส่งกลับเลย)
            if isinstance(n8n_data, dict) and "score" in n8n_data:
                return n8n_data
            
            # ======================================================
            # 🧹 โซนทำความสะอาด (Cleaning Data)
            # ======================================================
            raw_text = n8n_data.get("text", "")
            if not raw_text:
                raw_text = str(n8n_data)

            # ลบ Markdown
            clean_text = raw_text.replace("```json", "").replace("```", "").strip()
            
            # แปลงเป็น JSON Object
            try:
                final_json = json.loads(clean_text)
                return final_json
            except json.JSONDecodeError:
                return n8n_data

        except Exception as e:
            print(f"Error: {e}")
            raise HTTPException(status_code=500, detail="AI Error")

@app.get("/api/summary")
def get_summary():
    # Mock data for dashboard
    return {
        "name": "Chayanon", # Example name
        "missions_completed": True,
        "streak": 1,
        "hours_learned": 10,
        "minutes_learned": 0,
        "graph_data": [
            {"name": "Mon", "score": 4.0},
            {"name": "Tue", "score": 3.0},
            {"name": "Wed", "score": 2.0},
            {"name": "Thu", "score": 2.78},
            {"name": "Fri", "score": 1.89},
            {"name": "Sat", "score": 2.39},
            {"name": "Sun", "score": 3.49},
        ]
    }

# ========================================================
# Run the app
# ========================================================
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)