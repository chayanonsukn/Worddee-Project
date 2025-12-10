# 1. เลือก Base Image เป็น Python เวอร์ชันเล็ก (slim) เพื่อให้โหลดเร็ว
FROM python:3.11-slim

# 2. ตั้งโฟลเดอร์ทำงานข้างใน Container เป็น /app
WORKDIR /app

# 3. Copy ไฟล์ requirements.txt เข้าไปก่อน
COPY requirements.txt .

# 4. สั่งลง Library ตามรายการ (ใช้ --no-cache-dir เพื่อประหยัดพื้นที่)
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy ไฟล์โค้ดที่เหลือ (เช่น main.py) เข้าไป
COPY . .

# 6. แจ้งว่า Container นี้จะใช้ Port 8000
EXPOSE 8000

# 7. คำสั่งรัน Server เมื่อ Container เริ่มทำงาน
# main:app หมายถึง ไฟล์ main.py และตัวแปรชื่อ app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]