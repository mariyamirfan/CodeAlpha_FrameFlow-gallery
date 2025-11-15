import React from 'react';
import { Image } from '../types';
import { PictureIcon } from './icons';

interface ImageCardProps {
  image: Image;
  onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-lg shadow-lg aspect-[4/3]"
      onClick={onClick}
    >
      <img
        src={image.url}
        alt={image.alt}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
      />
      
      {/* Permanent overlay with text at the top */}
      <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/70 to-transparent text-white">
        <div className="flex items-start gap-2">
          <PictureIcon className="w-5 h-5 mt-0.5 flex-shrink-0 text-slate-300" />
          <h3 className="font-semibold text-sm leading-tight">{image.alt}</h3>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;