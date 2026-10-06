import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { PhotoItem } from '../types';

interface ImageLightboxModalProps {
  photos: PhotoItem[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageLightboxModal({
  photos,
  initialIndex,
  isOpen,
  onClose
}: ImageLightboxModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, photos.length]);

  if (!isOpen || photos.length === 0) return null;

  const currentPhoto = photos[currentIndex];

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 backdrop-blur-sm animate-fade-in">
      {/* Top bar */}
      <div className="flex items-center justify-between text-white/80 max-w-7xl mx-auto w-full pt-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Maximize2 className="w-4 h-4 text-amber-400" />
          <span>{currentIndex + 1} von {photos.length}</span>
          <span className="text-white/40">·</span>
          <span className="text-white/90 font-semibold">{currentPhoto.category}</span>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Schließen"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main photo area */}
      <div className="relative flex-1 flex items-center justify-center max-w-6xl mx-auto w-full my-4">
        <button
          onClick={prevPhoto}
          className="absolute left-2 sm:left-4 z-10 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-transform active:scale-95"
          aria-label="Vorheriges Foto"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="max-h-[75vh] flex flex-col items-center">
          <img
            src={currentPhoto.url}
            alt={currentPhoto.title}
            className="max-h-[70vh] max-w-full object-contain rounded-lg shadow-2xl transition-opacity duration-200"
          />
          <div className="text-center mt-3 max-w-2xl">
            <h4 className="text-white font-medium text-base sm:text-lg">{currentPhoto.title}</h4>
            <p className="text-stone-300 text-xs sm:text-sm mt-0.5">{currentPhoto.caption}</p>
          </div>
        </div>

        <button
          onClick={nextPhoto}
          className="absolute right-2 sm:right-4 z-10 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-transform active:scale-95"
          aria-label="Nächstes Foto"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Thumbnail strip */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-center gap-2 overflow-x-auto py-2">
        {photos.map((photo, idx) => (
          <button
            key={photo.id}
            onClick={() => setCurrentIndex(idx)}
            className={`relative rounded-md overflow-hidden shrink-0 transition-all ${
              idx === currentIndex
                ? 'ring-2 ring-amber-400 scale-105 opacity-100'
                : 'opacity-50 hover:opacity-80'
            }`}
          >
            <img
              src={photo.url}
              alt={photo.title}
              className="w-16 h-12 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
