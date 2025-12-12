import React, { useState, useCallback } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface ConceptInputProps {
  onAnalyze: (prompt: string) => void;
  isLoading: boolean;
}

export const ConceptInput: React.FC<ConceptInputProps> = ({ onAnalyze, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onAnalyze(input);
    }
  }, [input, isLoading, onAnalyze]);

  return (
    <div className="w-full max-w-xl mx-auto px-4 sticky top-6 z-50">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
        <div className="relative flex items-center bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-full p-2 shadow-2xl">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a thought, dream, or emotion..."
            className="flex-1 bg-transparent border-none outline-none text-slate-100 placeholder-slate-500 px-4 py-2 text-lg font-light"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 rounded-full transition-colors duration-200 text-white flex items-center justify-center w-12 h-12"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};