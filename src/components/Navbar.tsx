import { Calendar, Settings, Github, Sparkles, MapPin } from 'lucide-react';
import { ApartmentInfo, ICalFeed } from '../types';

interface NavbarProps {
  apartment: ApartmentInfo;
  feeds: ICalFeed[];
  onOpenHostSettings: () => void;
  onOpenGitHubGuide: () => void;
  onScrollToCalendar: () => void;
}

export function Navbar({
  apartment,
  feeds,
  onOpenHostSettings,
  onOpenGitHubGuide,
  onScrollToCalendar
}: NavbarProps) {
  const activeFeedsCount = feeds.filter(f => f.enabled).length;

  return (
    <header className="sticky top-0 z-40 bg-stone-50/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex flex-col group">
            <span className="font-display font-bold text-xl sm:text-2xl text-stone-900 group-hover:text-amber-800 transition-colors">
              {apartment.name}
            </span>
            <span className="text-xs text-stone-500 flex items-center gap-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-amber-700" />
              {apartment.city} · {apartment.region}
            </span>
          </a>
        </div>

        {/* Navigation links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
          <a href="#ueberblick" className="hover:text-stone-900 transition-colors">Überblick</a>
          <a href="#ausstattung" className="hover:text-stone-900 transition-colors">Ausstattung</a>
          <a href="#lage" className="hover:text-stone-900 transition-colors">Lage</a>
          <a href="#preise" className="hover:text-stone-900 transition-colors">Preise & Konditionen</a>
          <a href="#kalender" className="hover:text-amber-800 transition-colors font-semibold flex items-center gap-1.5 text-stone-900">
            <Calendar className="w-4 h-4 text-amber-700" />
            Belegungskalender
          </a>
          <a href="#kontakt" className="hover:text-stone-900 transition-colors">Kontakt</a>
        </nav>


        {/* Action controls */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Primary CTA */}
          <button
            onClick={onScrollToCalendar}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg bg-amber-800 hover:bg-amber-900 text-white shadow-sm transition-all hover:shadow active:scale-98"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Jetzt anfragen</span>
          </button>
        </div>
      </div>
    </header>
  );
}
