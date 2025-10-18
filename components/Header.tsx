
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="text-center mb-8">
            <div className="flex justify-center items-center gap-4 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                    Steam Trailer Fetcher
                </h1>
            </div>
            <p className="text-lg text-slate-400">
                Instantly download any game's trailer from its Steam page.
            </p>
        </header>
    );
}

export default Header;
