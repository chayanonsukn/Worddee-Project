import Link from 'next/link';
import { User } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white py-4 px-8 flex justify-between items-center shadow-sm">
      <div className="text-xl font-bold text-black">worddee.ai</div>
      <div className="flex gap-8 text-sm font-medium text-gray-500">
        <Link href="/dashboard" className="hover:text-[#1a403d] transition-colors">My Progress</Link>
        <Link href="/word-of-the-day" className="text-[#5c9ea6] hover:text-[#1a403d] transition-colors">Word of the Day</Link>
      </div>
      <div className="text-[#0070f3]">
        <User className="w-6 h-6 text-[#0070f3]" />
      </div>
    </nav>
  );
}
