import React from 'react';
import { SearchIcon } from './icons';

interface SearchbarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSearchSubmit: () => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ searchTerm, onSearchChange, onSearchSubmit }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearchSubmit();
    }
  };
    
  return (
    <div className="w-full p-4 sm:p-6 bg-slate-800/50 rounded-xl">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. Mountains"
            className="w-full bg-slate-800/50 text-white placeholder-slate-400 border border-slate-700 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-slate-400" />
          </div>
        </div>
        <button 
          onClick={onSearchSubmit}
          className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-500 transition-colors duration-300 shadow-lg shadow-indigo-500/20"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Searchbar;
