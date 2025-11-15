import React from 'react';
import { Image } from '../types';
import ImageCard from './ImageCard';

interface ImageGridProps {
  images: Image[];
  onImageClick: (index: number) => void;
  isLoading: boolean;
}

const ImageGrid: React.FC<ImageGridProps> = ({ images, onImageClick, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 animate-pulse">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="aspect-[4/3] bg-slate-800 rounded-lg"></div>
        ))}
      </div>
    );
  }
  
  if (images.length === 0) {
      return <div className="text-center py-10 text-slate-400">No images found.</div>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <ImageCard
          key={image.id}
          image={image}
          onClick={() => onImageClick(index)}
        />
      ))}
    </div>
  );
};

export default ImageGrid;