import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  const maxPagesToShow = 5;

  let startPage: number, endPage: number;
  if (totalPages <= maxPagesToShow) {
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= Math.ceil(maxPagesToShow / 2)) {
      startPage = 1;
      endPage = maxPagesToShow;
    } else if (currentPage + Math.floor(maxPagesToShow / 2) >= totalPages) {
      startPage = totalPages - maxPagesToShow + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - Math.floor(maxPagesToShow / 2);
      endPage = currentPage + Math.floor(maxPagesToShow / 2);
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center items-center space-x-1 sm:space-x-2 my-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 sm:px-4 py-2 bg-slate-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600 transition-colors"
      >
        &larr; Prev
      </button>

      {startPage > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className="px-3 sm:px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors font-stylish-body text-lg">1</button>
          {startPage > 2 && <span className="px-2 sm:px-4 py-2 text-slate-400">...</span>}
        </>
      )}

      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 font-stylish-body text-lg ${
            currentPage === number ? 'bg-indigo-500 text-white font-bold scale-110' : 'bg-slate-700 hover:bg-slate-600'
          }`}
        >
          {number}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-2 sm:px-4 py-2 text-slate-400">...</span>}
          <button onClick={() => onPageChange(totalPages)} className="px-3 sm:px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors font-stylish-body text-lg">{totalPages}</button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 sm:px-4 py-2 bg-slate-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600 transition-colors"
      >
        Next &rarr;
      </button>
    </nav>
  );
};

export default Pagination;