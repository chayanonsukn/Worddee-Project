'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import WordCard from '../../components/WordCard';
import FeedbackResult from '../../components/FeedbackResult';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import { fetchRandomWord, validateSentence } from '../../services/api';

export default function WordOfTheDay() {
  // wordData: เก็บข้อมูลคำศัพท์ที่ได้จาก API
  const [wordData, setWordData] = useState(null);
  // loading: สถานะการโหลดข้อมูลคำศัพท์เริ่มต้น (Initial Loading State)
  const [loading, setLoading] = useState(true);
  // submitting: สถานะกำลังส่งข้อมูลเพื่อตรวจสอบ (Submitting State)
  const [submitting, setSubmitting] = useState(false);
  // result: เก็บผลลัพธ์ที่ได้จากการตรวจสอบ (Feedback Result)
  const [result, setResult] = useState(null);
  // userSentence: เก็บประโยคที่ผู้ใช้งานพิมพ์
  const [userSentence, setUserSentence] = useState('');

  // useEffect ทำงานเมื่อ Component ถูก Mount (โหลดครั้งแรก) เพื่อดึงคำศัพท์
  useEffect(() => {
    loadNewWord();
  }, []);

  // ฟังก์ชันสำหรับโหลดคำศัพท์ใหม่ (Fetch Word)
  const loadNewWord = async () => {
    setLoading(true); // ตั้งค่า Loading State เป็น true
    setResult(null); // รีเซ็ตผลลัพธ์เดิม (Reset result)
    setSubmitting(false); // รีเซ็ตสถานะ Submitting
    try {
      const data = await fetchRandomWord();
      setWordData(data);
      setUserSentence('');
    } catch (error) {
      console.error('Error fetching word:', error);
    } finally {
      setLoading(false);
    }
  };

  // ฟังก์ชันจัดการเมื่อผู้ใช้งานกดส่งประโยค (Handle Submit)
  const handleSubmit = async (sentence) => {
    if (!wordData) return;
    setUserSentence(sentence); // บันทึกประโยคของผู้ใช้
    setSubmitting(true); // เริ่มสถานะกำลังส่งข้อมูล (Submitting State)
    try {
      // เรียก API เพื่อตรวจสอบความถูกต้องของประโยค (Validate Sentence)
      const feedback = await validateSentence(wordData.word, sentence);
      setResult(feedback); // เก็บผลลัพธ์ที่ได้ลง State
    } catch (error) {
      console.error('Error validating sentence:', error);
      alert('Something went wrong. Please try again.');
      setSubmitting(false); // หยุด submitting ถ้า error
    }
    // อย่าเพิ่งแยกส่วน finally ออกมาตรงนี้ เพื่อให้ Skeleton (หน้าจอโหลด) ยังแสดงค้างไว้จนกว่าผลลัพธ์จะเรนเดอร์เสร็จตามปกติ
    // แต่การจัดการ State ให้ชัดเจนจะดีกว่า
    // ค่อยสั่งปิดสถานะ submitting (กำลังส่ง) เมื่อเราได้ผลลัพธ์มาแล้ว
    setSubmitting(false);
  };
  // กำหนด Content ที่จะแสดงผลตามลำดับความสำคัญของ State (Render Logic)
  // 1. Loading: กำลังโหลดคำศัพท์
  // 2. Submitting: กำลังตรวจสอบประโยค
  // 3. Result: แสดงผลลัพธ์
  // 4. wordData: แสดงการ์ดคำศัพท์ปกติ
  let content;
  if (loading) {
     content = <div className="text-white text-xl animate-pulse">Loading word...</div>;
  } else if (submitting) {
     content = <LoadingSkeleton />;
  } else if (result) {
     content = <FeedbackResult result={result} userSentence={userSentence} onReset={loadNewWord} />;
  } else if (wordData) {
     content = <WordCard wordData={wordData} onSubmit={handleSubmit} />;
  } else {
     content = <div className="text-white">Failed to load word. Please refresh.</div>;
  }

  return (
    <div className="min-h-screen bg-[#8da399]">
      <Navbar />
      <div className="flex justify-center items-center p-8 min-h-[calc(100vh-80px)]">
        {content}
      </div>
    </div>
  );
}
