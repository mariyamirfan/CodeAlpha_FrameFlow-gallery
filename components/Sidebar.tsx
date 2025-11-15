import React from 'react';
import { SearchIcon } from './icons';

interface SidebarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSearchSubmit: () => void;
  totalResults: number;
  currentQuery: string;
}

const Sidebar: React.FC<SidebarProps> = ({ searchTerm, onSearchChange, onSearchSubmit, totalResults, currentQuery }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchSubmit();
    }
  };
    
  return (
    <aside className="w-full md:w-64 lg:w-72 p-6 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl md:sticky md:top-40 h-fit">
      <h2 className="text-xl font-semibold text-white mb-4">Search</h2>
      <div className="relative mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. Mountains"
          className="w-full bg-slate-800/50 text-white placeholder-slate-400 border border-slate-700 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-slate-400" />
        </div>
      </div>
      <button 
        onClick={onSearchSubmit}
        className="w-full bg-indigo-600 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-indigo-500 transition-colors duration-300 shadow-lg shadow-indigo-500/20"
      >
        Search
      </button>

      {currentQuery && (
          <div className="mt-6 text-sm text-slate-400">
              Showing <span className="font-bold text-white">{totalResults}</span> results for <span className="font-bold text-white">‘{currentQuery}’</span>
          </div>
      )}
    </aside>
  );
};

export default Sidebar;