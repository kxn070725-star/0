import React from 'react';
import { Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full py-8 flex flex-col items-center justify-center space-y-2">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-indigo-500/20 rounded-full border border-indigo-500/30">
            <Sparkles className="w-6 h-6 text-indigo-400" />
        </div>
        <h1 className="text-3xl font-serif font-bold tracking-tight bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 bg-clip-text text-transparent">
          Synesthesia
        </h1>
      </div>
      <p className="text-slate-400 text-sm tracking-wide uppercase font-medium">The Idea Visualizer</p>
    </header>
  );
};