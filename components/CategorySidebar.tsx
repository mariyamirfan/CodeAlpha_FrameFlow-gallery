
import React from 'react';
import { CATEGORIES } from '../constants';
import { CloseIcon } from './icons';

interface CategorySidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  onClose: () => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({ activeCategory, onCategoryChange, onClose }) => {
  return (
    <>
      {/* Custom scrollbar styling */}
      <style>{`
        .category-scrollbar::-webkit-scrollbar {
            width: 6px;
        }
        .category-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .category-scrollbar::-webkit-scrollbar-thumb {
            background: #475569;
            border-radius: 3px;
        }
        .category-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #64748b;
        }
      `}</style>
      <aside className="w-64 sm:w-72 flex-shrink-0 p-4 sm:p-6 h-full flex flex-col
                       bg-slate-900 border-r border-slate-700/50
                       md:bg-slate-900 md:border-none md:rounded-xl md:h-auto md:max-h-[calc(100vh-4rem)]
                       md:w-56 lg:w-64">
        <div className="flex justify-between items-center mb-4 flex-shrink-0">
          <h2 className="text-3xl font-stylish text-white">Categories</h2>
          <button 
            onClick={onClose} 
            className="md:hidden text-slate-400 hover:text-white"
            aria-label="Close menu"
          >
              <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col gap-1 overflow-y-auto pr-2 category-scrollbar">
          {CATEGORIES.map((category) => (
            <button
              key={category.name}
              onClick={() => onCategoryChange(category.name)}
              className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 ease-in-out group
                ${
                  activeCategory === category.name
                    ? 'bg-slate-800'
                    : 'hover:bg-slate-800/50'
                }`}
            >
              <div className={`w-1 h-5 rounded-full transition-colors duration-200
                  ${activeCategory === category.name ? 'bg-indigo-500' : 'bg-transparent group-hover:bg-slate-700'}
              `}></div>
  
              <div className="flex items-center ml-3 flex-shrink-0">
                { 'imageUrls' in category ? (
                    <div className="flex -space-x-2">
                        <img src={category.imageUrls[0]} alt="All category part 1" className="w-6 h-6 rounded-full object-cover border-2 border-slate-900"/>
                        <img src={category.imageUrls[1]} alt="All category part 2" className="w-6 h-6 rounded-full object-cover border-2 border-slate-900"/>
                    </div>
                ) : (
                    <img
                        src={category.imageUrl}
                        alt={`${category.name} category`}
                        className="w-6 h-6 rounded-full object-cover"
                    />
                )}
              </div>

              <span className={`ml-3 text-lg truncate min-w-0 font-stylish-body
                  ${activeCategory === category.name ? 'text-white font-bold' : 'text-slate-300 group-hover:text-white'}
              `}>
                  {category.name}
              </span>
            </button>
          ))}
        </div>
      </aside>
    </>
  );
};

export default CategorySidebar;