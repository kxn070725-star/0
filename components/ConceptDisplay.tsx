import React from 'react';
import { ConceptData } from '../types';
import { DataVisuals } from './DataVisuals';
import { Music, Palette, Info } from 'lucide-react';

interface ConceptDisplayProps {
  data: ConceptData;
}

export const ConceptDisplay: React.FC<ConceptDisplayProps> = ({ data }) => {
  const primaryColor = data.colors[0] || '#6366f1';

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 px-4 animate-fade-in-up pb-20">
      {/* Main Card */}
      <div className="bg-slate-800/40 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Header Section with Gradient based on generated colors */}
        <div
            className="h-32 w-full relative"
            style={{
                background: `linear-gradient(to right, ${data.colors[0]}, ${data.colors[1]})`
            }}
        >
            <div className="absolute -bottom-12 left-8 md:left-12">
                 <div className="h-24 w-24 rounded-2xl shadow-xl flex items-center justify-center bg-slate-900 border-4 border-slate-800" style={{backgroundColor: data.colors[2]}}>
                    <span className="text-4xl">✨</span>
                 </div>
            </div>
        </div>

        <div className="pt-16 pb-8 px-8 md:px-12">
            
            {/* Title & Description */}
            <div className="mb-10">
                <div className="flex flex-col md:flex-row md:items-baseline md:space-x-4 mb-2">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
                        {data.title}
                    </h2>
                    <span className="text-indigo-300 font-mono text-sm tracking-widest uppercase opacity-80 mt-2 md:mt-0">
                        {data.abstract}
                    </span>
                </div>
                <p className="text-slate-300 text-lg leading-relaxed max-w-2xl font-light italic border-l-2 border-indigo-500/50 pl-4 mt-4">
                    "{data.description}"
                </p>
            </div>

            {/* Grid Layout for Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                
                {/* Left Column: Visuals */}
                <div className="space-y-6">
                    <div className="bg-slate-900/50 rounded-2xl p-6 border border-white/5">
                        <div className="flex items-center space-x-2 mb-4 text-slate-400">
                             <Info className="w-4 h-4" />
                             <span className="text-xs font-bold uppercase tracking-wider">Psychometric Profile</span>
                        </div>
                        <DataVisuals attributes={data.attributes} primaryColor={primaryColor} />
                    </div>
                </div>

                {/* Right Column: Palette & Sound */}
                <div className="space-y-6">
                    
                    {/* Color Palette */}
                    <div className="bg-slate-900/50 rounded-2xl p-6 border border-white/5">
                         <div className="flex items-center space-x-2 mb-4 text-slate-400">
                             <Palette className="w-4 h-4" />
                             <span className="text-xs font-bold uppercase tracking-wider">Generated Palette</span>
                        </div>
                        <div className="flex h-24 rounded-xl overflow-hidden shadow-lg">
                            {data.colors.map((color, idx) => (
                                <div
                                    key={idx}
                                    className="flex-1 group relative flex flex-col justify-end p-2 cursor-pointer transition-all hover:flex-[2]"
                                    style={{ backgroundColor: color }}
                                    title={color}
                                >
                                    <span className="text-[10px] font-mono opacity-0 group-hover:opacity-100 bg-black/50 text-white p-1 rounded backdrop-blur-sm self-center transition-opacity">
                                        {color}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Soundtrack */}
                     <div className="bg-slate-900/50 rounded-2xl p-6 border border-white/5">
                        <div className="flex items-center space-x-2 mb-4 text-slate-400">
                             <Music className="w-4 h-4" />
                             <span className="text-xs font-bold uppercase tracking-wider">Sonic Ambience</span>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="p-3 bg-indigo-500/10 rounded-full text-indigo-400">
                                <span className="animate-pulse">🎵</span>
                            </div>
                            <p className="text-slate-300 font-light mt-2">
                                {data.soundtrackMood}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};