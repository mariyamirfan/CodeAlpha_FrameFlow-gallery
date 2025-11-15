import React, { useEffect } from 'react';
import { Image } from '../types';
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon } from './icons';

interface LightboxProps {
  image: Image | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ image, onClose, onNext, onPrev }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, onNext, onPrev]);

  if (!image) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-2 sm:p-4 transition-opacity duration-300 animate-fade-in">
      <div className="relative max-w-4xl w-full h-full flex items-center justify-center">
        <img
          src={image.url.replace('800x600', '1600x1200')} // Load a larger version
          alt={image.alt}
          className="w-auto h-auto max-w-full max-h-full object-contain rounded-lg shadow-2xl"
        />
         <div className="absolute bottom-0 left-0 w-full p-4 text-center text-white bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
             <p className="font-bold">{image.alt}</p>
             <p className="text-sm text-slate-300">by {image.author}</p>
         </div>
      </div>

      <button
        onClick={onClose}
        className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white hover:text-indigo-400 transition-colors"
        aria-label="Close"
      >
        <CloseIcon className="w-8 h-8 sm:w-10 sm:h-10" />
      </button>

      <button
        onClick={onPrev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white bg-black/30 p-1 sm:p-2 rounded-full hover:bg-black/60 transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeftIcon className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      <button
        onClick={onNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white bg-black/30 p-1 sm:p-2 rounded-full hover:bg-black/60 transition-colors"
        aria-label="Next image"
      >
        <ChevronRightIcon className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>
    </div>
  );
};

export default Lightbox;