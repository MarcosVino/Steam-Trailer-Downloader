
import React, { useState, useCallback } from 'react';
import { GameData } from './types';
import { fetchGameDetails } from './services/steamService';
import { generateGameSummary } from './services/geminiService';

import UrlInputForm from './components/UrlInputForm';
import GameDetails from './components/GameDetails';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';
import Header from './components/Header';

const App: React.FC = () => {
  const [steamUrl, setSteamUrl] = useState<string>('');
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [aiSummary, setAiSummary] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (url: string) => {
    if (!url) {
      setError('Please enter a Steam URL.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGameData(null);
    setAiSummary('');

    try {
      const details = await fetchGameDetails(url);
      setGameData(details);

      try {
        const summary = await generateGameSummary(details.description);
        setAiSummary(summary);
      } catch (geminiError) {
        // We can still show game details even if Gemini fails
        console.error('Gemini API error:', geminiError);
        if (geminiError instanceof Error) {
          setAiSummary(`Could not generate AI summary: ${geminiError.message}`);
        } else {
          setAiSummary('Could not generate AI summary.');
        }
      }

    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-gray-200 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <main>
          <UrlInputForm
            steamUrl={steamUrl}
            setSteamUrl={setSteamUrl}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />

          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}

          {gameData && (
            <GameDetails gameData={gameData} aiSummary={aiSummary} />
          )}

          {!isLoading && !gameData && !error && (
             <div className="text-center mt-16 p-8 bg-slate-800/50 rounded-lg border border-slate-700">
               <h2 className="text-2xl font-bold text-slate-300 mb-2">Welcome!</h2>
               <p className="text-slate-400">
                 Enter a Steam game URL above to find its trailer and get an AI-powered summary.
               </p>
             </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;