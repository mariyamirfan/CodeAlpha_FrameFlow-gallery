import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Searchbar from './components/Searchbar';
import CategorySidebar from './components/CategorySidebar';
import ImageGrid from './components/ImageGrid';
import Pagination from './components/Pagination';
import Lightbox from './components/Lightbox';
import Footer from './components/Footer';
import { Image } from './types';
import { fetchImages } from './services/imageService';
import { IMAGES_PER_PAGE, TOTAL_PAGES } from './constants';

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const [currentQuery, setCurrentQuery] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const loadImages = useCallback((query: string, page: number) => {
    setIsLoading(true);
    fetchImages(query, page)
      .then(fetchedImages => {
        setImages(fetchedImages);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Failed to load images:", error);
        setImages([]); // Clear images on error to show "No images found"
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    loadImages(currentQuery, currentPage);
  }, [currentQuery, currentPage, loadImages]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentQuery(category);
    setCurrentPage(1);
    setSearchTerm('');
    setIsMobileMenuOpen(false); // Close mobile menu on selection
  };

  const handleSearchSubmit = () => {
    if (searchTerm.trim() === '') return;
    const newQuery = searchTerm.trim();
    setActiveCategory(''); // Deselect category when searching
    setCurrentQuery(newQuery);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= TOTAL_PAGES) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const showNextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prevIndex) => (prevIndex === null ? 0 : (prevIndex + 1) % images.length));
    }
  };

  const showPrevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prevIndex) => (prevIndex === null ? 0 : (prevIndex - 1 + images.length) % images.length));
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-30 md:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      <div className="container mx-auto flex flex-row gap-8 px-4 md:px-8">
        {/* Sidebar Container */}
        <div className={`fixed top-0 left-0 h-full z-40 transition-transform duration-300 ease-in-out md:sticky md:top-8 md:h-fit md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <CategorySidebar 
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
              onClose={() => setIsMobileMenuOpen(false)}
          />
        </div>

        <main className="flex-1 flex flex-col gap-8 min-w-0">
            <Header onMenuClick={() => setIsMobileMenuOpen(true)} />
            <Searchbar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onSearchSubmit={handleSearchSubmit}
            />
            <ImageGrid 
                images={images} 
                onImageClick={openLightbox} 
                isLoading={isLoading} 
            />
            {!isLoading && images.length > 0 && (
                <Pagination 
                currentPage={currentPage} 
                totalPages={TOTAL_PAGES} 
                onPageChange={handlePageChange} 
                />
            )}
            <Footer />
        </main>
      </div>
      
      <Lightbox 
        image={selectedImageIndex !== null ? images[selectedImageIndex] : null}
        onClose={closeLightbox}
        onNext={showNextImage}
        onPrev={showPrevImage}
      />
    </div>
  );
};

export default App;