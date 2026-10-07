import { useState } from 'react';
import { Calendar, Sparkles, MapPin, Menu, X, Image as ImageIcon } from 'lucide-react';
import { ApartmentInfo, ICalFeed } from '../types';

interface NavbarProps {
  apartment: ApartmentInfo;
  feeds?: ICalFeed[];
  onOpenHostSettings?: () => void;
  onOpenGitHubGuide?: () => void;
  onScrollToCalendar: () => void;
}

export function Navbar({
  apartment,
  onScrollToCalendar
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#ueberblick', label: 'Überblick' },
    { href: '#ausstattung', label: 'Ausstattung' },
    { href: '#lage', label: 'Lage' },
    { href: '#preise', label: 'Preise & Konditionen' },
    { href: '#kalender', label: 'Belegungskalender', isCalendar: true },
    { href: '#kontakt', label: 'Kontakt' }
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Navigation links (Desktop & Tablets) */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-xs sm:text-sm font-medium text-stone-600">
          <a href="#ueberblick" className="hover:text-stone-900 transition-colors">Überblick</a>
          <a href="#ausstattung" className="hover:text-stone-900 transition-colors">Ausstattung</a>
          <a href="#lage" className="hover:text-stone-900 transition-colors">Lage</a>
          <a href="#preise" className="hover:text-stone-900 transition-colors">Preise & Konditionen</a>
          <a
            href="#kalender"
            className="hover:text-amber-800 transition-colors font-semibold flex items-center gap-1.5 text-stone-900"
          >
            <Calendar className="w-4 h-4 text-amber-700" />
            <span>Belegungskalender</span>
          </a>
        </nav>

        {/* Action controls & Mobile menu toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Primary CTA */}
          <button
            onClick={() => {
              handleLinkClick();
              onScrollToCalendar();
            }}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-amber-800 hover:bg-amber-900 text-white shadow-xs transition-all hover:shadow active:scale-98 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300" />
            <span>Jetzt anfragen</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-100 transition-colors"
            aria-label="Navigation öffnen"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-4 space-y-1 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleLinkClick}
              className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                item.isCalendar
                  ? 'text-amber-900 bg-amber-50 font-bold flex items-center gap-2'
                  : 'text-stone-700 hover:bg-stone-50'
              }`}
            >
              {item.isCalendar && <Calendar className="w-4 h-4 text-amber-700" />}
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
