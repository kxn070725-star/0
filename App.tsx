import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ConceptInput } from './components/ConceptInput';
import { ConceptDisplay } from './components/ConceptDisplay';
import { analyzeConcept } from './services/geminiService';
import { ConceptData, AppState } from './types';
import { AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [conceptData, setConceptData] = useState<ConceptData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async (prompt: string) => {
    setAppState(AppState.LOADING);
    setError(null);
    try {
      const data = await analyzeConcept(prompt);
      setConceptData(data);
      setAppState(AppState.SUCCESS);
    } catch (err) {
      console.error(err);
      setAppState(AppState.ERROR);
      setError(err instanceof Error ? err.message : 'Something went wrong while consulting the muse.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black text-slate-200 selection:bg-indigo-500/30">
      
      <Header />
      
      <main className="flex flex-col items-center">
        <ConceptInput onAnalyze={handleAnalyze} isLoading={appState === AppState.LOADING} />

        {appState === AppState.ERROR && error && (
          <div className="mt-8 p-4 bg-red-900/20 border border-red-500/30 rounded-lg flex items-center space-x-3 text-red-200 max-w-md animate-bounce-short">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {appState === AppState.IDLE && (
            <div className="mt-20 text-center opacity-40 max-w-md px-6">
                <p className="font-serif italic text-2xl mb-4">"The soul becomes dyed with the color of its thoughts."</p>
                <p className="text-sm font-sans uppercase tracking-widest">— Marcus Aurelius</p>
            </div>
        )}

        {appState === AppState.SUCCESS && conceptData && (
          <ConceptDisplay data={conceptData} />
        )}
      </main>

       {/* Footer / Credit */}
      <footer className="fixed bottom-4 w-full text-center pointer-events-none">
        <p className="text-slate-700 text-xs">Powered by Gemini 2.5 Flash</p>
      </footer>
    </div>
  );
};

export default App;