import { useState } from 'react';

export default function WordCard({ wordData, onSubmit }) {
  const [sentence, setSentence] = useState('');

  const handleSubmit = () => {
    if (sentence.trim()) {
      onSubmit(sentence);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 max-w-4xl w-full shadow-xl relative">
      <div className="absolute top-0 right-0 mt-[-15px] mr-8">
         <span className="bg-[#fcefc7] text-[#5c4d00] px-4 py-1 rounded-full text-sm font-bold shadow-sm">
            Level {wordData.level}
         </span>
      </div>

      <h1 className="text-3xl font-serif font-bold text-[#1a403d] mb-2">Word of the day</h1>
      <p className="text-gray-500 mb-6">Practice writing a meaningful sentence using today's word.</p>

      <div className="flex flex-col md:flex-row gap-8 mb-8 border border-gray-200 rounded-2xl p-4">
        <div className="w-full md:w-1/3">
            {/* Placeholder for image - using a colored div if no image provided, or a generic one */}
            <div className="w-full h-48 bg-gray-200 rounded-xl overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2573&auto=format&fit=crop" 
                    alt="Word context" 
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
        <div className="w-full md:w-2/3 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
                <button className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-600">
                    ▶
                </button>
                <h2 className="text-3xl font-serif font-bold text-[#1a403d]">{wordData.word}</h2>
            </div>
            <p className="text-gray-500 italic mb-2">Noun [{wordData.word.toLowerCase()}]</p>
            <p className="text-gray-700 mb-4">
                <span className="font-bold">Meaning:</span> {wordData.meaning}
            </p>
            <p className="text-gray-500 text-sm">
                &quot;The jet braked hard as its wheels touched the <span className="underline">{wordData.word.toLowerCase()}</span>.&quot;
            </p>
        </div>
      </div>

      <textarea
        className="w-full border-2 border-gray-300 bg-gray-50 rounded-xl p-4 mb-6 focus:outline-none focus:ring-2 focus:ring-[#1a403d] focus:border-transparent resize-none text-gray-800 placeholder-gray-400"
        rows="3"
        placeholder={`The plane ${wordData.word.toLowerCase()} is under construction.`}
        value={sentence}
        onChange={(e) => setSentence(e.target.value)}
      ></textarea>

      <div className="flex justify-between items-center">
        <button className="px-8 py-3 rounded-full border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors">
            Do it later
        </button>
        <button 
            onClick={handleSubmit}
            className="px-8 py-3 rounded-full bg-[#1a403d] text-white font-bold hover:bg-[#14302e] transition-colors shadow-lg"
        >
            Submit
        </button>
      </div>
    </div>
  );
}
