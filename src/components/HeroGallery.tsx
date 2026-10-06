import { Image as ImageIcon, Sparkles, CheckCircle2 } from 'lucide-react';
import { PhotoItem, ApartmentInfo } from '../types';

interface HeroGalleryProps {
  apartment: ApartmentInfo;
  onOpenLightbox: (index: number) => void;
  onScrollToCalendar: () => void;
}

export function HeroGallery({ apartment, onOpenLightbox, onScrollToCalendar }: HeroGalleryProps) {
  const { photos, pricing } = apartment;
  const coverPhoto = photos[0];
  const secondaryPhotos = photos.slice(1, 5);

  return (
    <section id="ueberblick" className="pt-6 sm:pt-8 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Title & Top Metadata */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 mb-2">
            <span className="flex items-center gap-1 bg-amber-100 text-amber-900 px-2.5 py-1 rounded-md">
              <Sparkles className="w-3.5 h-3.5" />
              Direkt beim Vermieter buchen
            </span>
            <span className="text-stone-400">·</span>
            <span className="text-stone-600">Provisionsfrei & Bestpreis</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
            {apartment.name}
          </h1>
          <p className="text-stone-600 text-base sm:text-lg mt-2 max-w-3xl">
            {apartment.tagline}
          </p>
        </div>

        {/* Pricing hint on hero */}
        <div className="flex items-center gap-4 bg-stone-100/80 p-3 sm:p-4 rounded-xl border border-stone-200/80 self-start md:self-auto">
          <div>
            <div className="text-xs text-stone-500 font-medium">ab Nebensaison</div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-bold font-display text-stone-900">{pricing.basePricePerNight} €</span>
              <span className="text-xs text-stone-500">/ Nacht</span>
            </div>
          </div>
          <button
            onClick={onScrollToCalendar}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-xs transition-colors"
          >
            Verfügbarkeit
          </button>
        </div>
      </div>

      {/* Modern 5-Photo Mosaic Grid */}
      <div className="relative rounded-2xl overflow-hidden shadow-md bg-stone-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[340px] sm:h-[460px] md:h-[520px]">
          {/* Main Large Photo (Left 2 cols) */}
          {coverPhoto && (
            <div
              onClick={() => onOpenLightbox(0)}
              className="md:col-span-2 relative group cursor-pointer overflow-hidden h-full"
            >
              <img
                src={coverPhoto.url}
                alt={coverPhoto.title}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <span className="text-white font-medium text-sm drop-shadow">{coverPhoto.title}</span>
              </div>
            </div>
          )}

          {/* 4 Smaller Photos (Right 2 cols: 2x2 grid) */}
          <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-2 h-full">
            {secondaryPhotos.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => onOpenLightbox(index + 1)}
                className="relative group cursor-pointer overflow-hidden h-full"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <span className="text-white text-xs font-medium drop-shadow truncate">{photo.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View all photos button */}
        <button
          onClick={() => onOpenLightbox(0)}
          className="absolute bottom-4 right-4 z-10 flex items-center gap-2 bg-white/95 hover:bg-white text-stone-900 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg shadow-lg backdrop-blur-xs transition-all hover:scale-102"
        >
          <ImageIcon className="w-4 h-4 text-amber-700" />
          <span>Alle {photos.length} Fotos ansehen</span>
        </button>
      </div>

      {/* Key Quick Highlights Bar */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-xl bg-white border border-stone-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-sm shrink-0">
            {apartment.sizeSqm}m²
          </div>
          <div>
            <div className="text-xs text-stone-500 font-medium">Wohnfläche</div>
            <div className="text-sm font-semibold text-stone-900">{apartment.sizeSqm} m² (3 Zimmer)</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-sm shrink-0">
            {apartment.maxGuests}P
          </div>
          <div>
            <div className="text-xs text-stone-500 font-medium">Kapazität</div>
            <div className="text-sm font-semibold text-stone-900">Bis zu {apartment.maxGuests} Personen</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold text-sm shrink-0">
            150m
          </div>
          <div>
            <div className="text-xs text-stone-500 font-medium">Strandnähe</div>
            <div className="text-sm font-semibold text-stone-900">Nur 2 Gehminuten</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-stone-200/90 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-sm shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-stone-500 font-medium">Inklusive</div>
            <div className="text-sm font-semibold text-stone-900">PKW & WLAN 250 Mbit</div>
          </div>
        </div>
      </div>
    </section>
  );
}
