
import React from 'react';

interface UrlInputFormProps {
  steamUrl: string;
  setSteamUrl: (url: string) => void;
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const UrlInputForm: React.FC<UrlInputFormProps> = ({ steamUrl, setSteamUrl, onSubmit, isLoading }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(steamUrl);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-slate-800 p-2 rounded-lg shadow-lg border border-slate-700">
        <input
          type="url"
          value={steamUrl}
          onChange={(e) => setSteamUrl(e.target.value)}
          placeholder="e.g., https://store.steampowered.com/app/730/..."
          className="w-full px-4 py-3 bg-slate-700 text-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition duration-200 disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          disabled={isLoading}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
             <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span>Get Trailer</span>
        </button>
      </div>
    </form>
  );
};

export default UrlInputForm;
