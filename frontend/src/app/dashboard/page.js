'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { fetchSummary } from '../../services/api';
import { Flame, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSummary();
  }, []);

  const loadSummary = async () => {
    try {
      const data = await fetchSummary();
      setSummary(data);
    } catch (error) {
      console.error('Error fetching summary:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-[#8da399] flex items-center justify-center text-white">Loading dashboard...</div>;
  }

  if (!summary) {
    return <div className="min-h-screen bg-[#8da399] flex items-center justify-center text-white">Failed to load dashboard.</div>;
  }

  return (
    <div className="min-h-screen bg-[#8da399]">
      <Navbar />
      <div className="p-8 max-w-6xl mx-auto">
        
        <h1 className="text-3xl font-serif font-bold text-[#1a403d] mb-6">
          {summary.name}’s learner dashboard
        </h1>

        <h2 className="text-xl font-serif font-bold text-[#1a403d] mb-4">Your missions today</h2>
        
        {summary.missions_completed && (
            <div className="bg-[#f0fdf4] border border-green-200 rounded-xl p-4 mb-8 text-center text-[#1a403d]">
                Well done! You've completed all your missions.
            </div>
        )}

        <h2 className="text-xl font-serif font-bold text-[#1a403d] mb-4">Overview</h2>

        <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
            <h3 className="text-lg font-bold text-[#1a403d] mb-6">Learning consistency</h3>
            
            <div className="flex justify-around items-center mb-8">
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-4xl font-bold text-[#1a403d] mb-2">
                        <Flame className="w-8 h-8 text-green-500 fill-green-500" />
                        {summary.streak}
                    </div>
                    <p className="text-gray-500 text-sm">Day streak</p>
                </div>
                <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-4xl font-bold text-[#1a403d] mb-2">
                        <Clock className="w-8 h-8 text-blue-400" />
                        {summary.hours_learned}
                    </div>
                    <p className="text-gray-500 text-sm">[Hours / Minutes] learned</p>
                </div>
            </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg min-h-[400px]">
             <div className="flex justify-between items-center mb-6">
                <div className="flex gap-4">
                    <span className="font-bold text-[#1a403d]">IELTS speaking test</span>
                    <span className="text-gray-400">All parts</span>
                </div>
                <a href="#" className="text-blue-400 text-sm underline">View scoring criteria</a>
             </div>

             <div className="flex justify-between text-xs text-gray-500 mb-4">
                <span>Latest band scores</span>
                <span>Progress</span>
             </div>

             <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={summary.graph_data}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis hide />
                        <Tooltip 
                            cursor={{fill: 'transparent'}}
                            contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                        <Bar dataKey="score" radius={[10, 10, 10, 10]} barSize={40}>
                            {summary.graph_data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.score >= 3 ? '#1a403d' : '#e2e8f0'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
             </div>
             
             <div className="flex justify-center mt-6">
                <button className="bg-[#1a403d] text-white px-8 py-3 rounded-full font-bold hover:bg-[#14302e] transition-colors">
                    Take the test
                </button>
             </div>
        </div>

      </div>
    </div>
  );
}
