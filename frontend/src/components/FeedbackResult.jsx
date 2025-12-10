import Link from 'next/link';

export default function FeedbackResult({ result, userSentence, onReset }) {
  return (
    <div className="bg-white rounded-3xl p-12 max-w-4xl w-full shadow-xl text-center">
      <h1 className="text-3xl font-serif font-bold text-[#1a403d] mb-6">Challenge completed</h1>
      
      <div className="flex justify-center gap-4 mb-8">
        <span className="bg-[#fcefc7] text-[#5c4d00] px-6 py-2 rounded-full font-bold">
            Level {result.level || 'Beginner'}
        </span>
        <span className="bg-[#f3f0ff] text-[#4c1d95] px-6 py-2 rounded-full font-bold">
            Score {result.score}
        </span>
      </div>

      <div className="text-left bg-white border border-gray-100 rounded-xl p-6 mb-4 shadow-sm">
        <p className="text-gray-800">
            <span className="font-bold">Your sentence:</span> {userSentence}
        </p>
      </div>

      <div className="text-left bg-[#e6fffa] border border-[#b2f5ea] rounded-xl p-6 mb-8">
        <p className="text-[#234e52] mb-2">
            <span className="font-bold">Suggestion:</span> {result.suggestion}
        </p>
        {result.corrected_sentence && (
             <p className="text-[#234e52] text-sm italic">
                "{result.corrected_sentence}"
            </p>
        )}
      </div>

      <div className="flex justify-between items-center">
        <button 
            onClick={onReset}
            className="px-8 py-3 rounded-full border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors"
        >
            Close
        </button>
        <Link 
            href="/dashboard"
            className="px-8 py-3 rounded-full bg-[#1a403d] text-white font-bold hover:bg-[#14302e] transition-colors shadow-lg"
        >
            View my progress
        </Link>
      </div>
    </div>
  );
}
