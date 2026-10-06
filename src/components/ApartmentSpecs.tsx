import { BedDouble, Bath, Home, Users, Compass, ShieldCheck } from 'lucide-react';
import { ApartmentInfo } from '../types';

interface ApartmentSpecsProps {
  apartment: ApartmentInfo;
  onOpenHostSettings: () => void;
}

export function ApartmentSpecs({ apartment }: ApartmentSpecsProps) {
  return (
    <section className="py-12 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main 2-column description */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">
                <span>2025 frisch saniert</span>
                <span>·</span>
                <span>76 m² Ferienwohnung</span>
                <span>·</span>
                <span>Feldrandlage</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 mb-4">
                Ihre Ferienwohnung im Zentrum der Ostseestrände
              </h2>
              <p className="text-stone-700 text-base sm:text-lg leading-relaxed whitespace-pre-line">
                {apartment.fullStory}
              </p>
            </div>

            {/* Room breakdown cards */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-stone-900 flex items-center gap-2">
                <Home className="w-5 h-5 text-amber-800" />
                Raumaufteilung & 76 m² Wohlfühlkomfort
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-stone-100/70 border border-stone-200">
                  <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm mb-1">
                    <BedDouble className="w-4 h-4 text-amber-800" />
                    1. Schlafzimmer (Doppelbett)
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Gemütliches Schlafzimmer mit Doppelbett, Nachttisch, Lampe, Kleiderschrank und Fenster mit Blick in den ruhigen Garten.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-100/70 border border-stone-200">
                  <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm mb-1">
                    <BedDouble className="w-4 h-4 text-amber-800" />
                    2. Schlafzimmer (2 Einzelbetten)
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Zweites Schlafzimmer mit zwei bequemen Einzelbetten, Holzschrank und gemütlicher Sitzecke – ideal für Kinder oder Freunde.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-100/70 border border-stone-200">
                  <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm mb-1">
                    <Bath className="w-4 h-4 text-amber-800" />
                    Badezimmer mit zwei Waschbecken
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Modernes, helles Badezimmer mit Duschkabine, WC, großem Spiegel und zwei Waschbecken – kein Gedränge am Morgen!
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-100/70 border border-stone-200">
                  <div className="flex items-center gap-2 text-stone-900 font-semibold text-sm mb-1">
                    <Compass className="w-4 h-4 text-amber-800" />
                    Wohn-Essbereich & separate Küche
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Wohnbereich mit bequemem Sofa, Sessel, Flachbild-TV, Esstisch und voll ausgestatteter Küche mit Geschirrspüler, Herd & Backofen.
                  </p>
                </div>
              </div>
            </div>

            {/* House rules mini-grid */}
            <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200/80">
              <h3 className="text-base font-semibold text-stone-900 mb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-800" />
                Wichtige Informationen & Hausregeln
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-xs text-stone-700">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-stone-900">Check-in:</span> {apartment.rules.checkInTime}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-stone-900">Check-out:</span> {apartment.rules.checkOutTime}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-stone-900">Nichtraucher:</span> Reine Nichtraucherwohnung
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-stone-900">Haustiere:</span> Allergikerfreundlich (keine Haustiere)
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-stone-900">Parken:</span> 1 fester Stellplatz kostenfrei
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar: Host Info Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-6">
              <div className="flex items-center gap-4">
                <img
                  src={apartment.host.avatar}
                  alt={apartment.host.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-amber-700/30 shadow-xs"
                />
                <div>
                  <h3 className="font-bold text-stone-900 text-lg">{apartment.host.name}</h3>
                  <div className="text-xs text-amber-800 font-medium">Ihre Gastgeber</div>
                  <div className="text-xs text-stone-500 mt-0.5">{apartment.host.responseTime}</div>
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed italic">
                "{apartment.host.bio}"
              </p>

              <div className="pt-4 border-t border-stone-100 space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span className="font-medium">Sprachen:</span>
                  <span>{apartment.host.languages.join(', ')}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span className="font-medium">Telefon:</span>
                  <a href={`tel:${apartment.host.phone}`} className="text-amber-800 hover:underline font-medium">
                    {apartment.host.phone}
                  </a>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span className="font-medium">E-Mail:</span>
                  <a href={`mailto:${apartment.host.email}`} className="text-amber-800 hover:underline truncate max-w-[170px]" title={apartment.host.email}>
                    {apartment.host.email}
                  </a>
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-xs text-stone-600">
                <div className="font-semibold text-stone-900 mb-1 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-amber-700" />
                  Direktbuchungsvorteil
                </div>
                Sie sparen bis zu 15% Portalgebühren gegenüber Plattformen wie Airbnb oder Booking.com.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
