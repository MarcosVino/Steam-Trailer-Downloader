import React from 'react';
import { GameData } from '../types';

interface GameDetailsProps {
  gameData: GameData;
  aiSummary: string;
}

const GameDetails: React.FC<GameDetailsProps> = ({ gameData, aiSummary }) => {

  return (
    <div className="bg-slate-800/50 rounded-lg shadow-2xl overflow-hidden border border-slate-700 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="md:col-span-1">
          <img src={gameData.headerImage} alt={`${gameData.name} header`} className="w-full h-full object-cover"/>
        </div>
        <div className="p-6 md:col-span-2 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">{gameData.name}</h2>
            
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-2">AI Summary</h3>
              <p className="text-slate-300 leading-relaxed">
                {aiSummary || 'Generating summary...'}
              </p>
            </div>
          </div>

          <div className="mt-6">
             <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">Available Trailers</h3>
             <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                {gameData.trailers.map(trailer => {
                    const downloadFileName = `${gameData.name.replace(/[^a-zA-Z0-9]/g, '_')}_${trailer.name.replace(/[^a-zA-Z0-9]/g, '_')}.mp4`;
                    return (
                        <div key={trailer.id} className="bg-slate-700/50 p-3 rounded-lg flex items-center gap-4 border border-slate-600 hover:bg-slate-700 transition-colors duration-200">
                            <img src={trailer.thumbnail} alt={`${trailer.name} thumbnail`} className="w-28 h-auto object-cover rounded-md shadow-md shrink-0"/>
                            <div className="flex-grow min-w-0">
                                <p className="font-semibold text-white truncate" title={trailer.name}>{trailer.name}</p>
                            </div>
                            <a
                              href={trailer.url}
                              download={downloadFileName}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-transform transform hover:scale-105 text-sm"
                              aria-label={`Download ${trailer.name}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                <span className="hidden sm:inline">Download</span>
                            </a>
                        </div>
                    );
                })}
             </div>
          </div>

        </div>
      </div>
       <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
          }
          /* Custom scrollbar for webkit browsers */
          .overflow-y-auto::-webkit-scrollbar {
            width: 8px;
          }
          .overflow-y-auto::-webkit-scrollbar-track {
            background: #1e293b; /* slate-800 */
            border-radius: 10px;
          }
          .overflow-y-auto::-webkit-scrollbar-thumb {
            background-color: #475569; /* slate-600 */
            border-radius: 10px;
            border: 2px solid #1e293b; /* slate-800 */
          }
          .overflow-y-auto::-webkit-scrollbar-thumb:hover {
            background-color: #64748b; /* slate-500 */
          }
        `}</style>
    </div>
  );
};

export default GameDetails;