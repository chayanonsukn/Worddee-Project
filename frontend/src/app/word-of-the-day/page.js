'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import WordCard from '../../components/WordCard';
import FeedbackResult from '../../components/FeedbackResult';
import LoadingSkeleton from '../../components/LoadingSkeleton';
import { fetchRandomWord, validateSentence } from '../../services/api';

export default function WordOfTheDay() {
  const [wordData, setWordData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false); // New state for submission loading
  const [result, setResult] = useState(null);
  const [userSentence, setUserSentence] = useState('');

  useEffect(() => {
    loadNewWord();
  }, []);

  const loadNewWord = async () => {
    setLoading(true);
    setResult(null); // Reset result
    setSubmitting(false);
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

  const handleSubmit = async (sentence) => {
    if (!wordData) return;
    setUserSentence(sentence);
    setSubmitting(true); // Start submitting state
    try {
      const feedback = await validateSentence(wordData.word, sentence);
      setResult(feedback);
    } catch (error) {
      console.error('Error validating sentence:', error);
      alert('Something went wrong. Please try again.');
      setSubmitting(false); // Stop submitting if error
    }
    // Don't separate finally here to keep skeleton showing until result renders usually, 
    // but better to manage state explicitly. 
    // Let's hide submitting when we have result.
    setSubmitting(false);
  };

  // Re-write render logic to prioritize states correctly
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
