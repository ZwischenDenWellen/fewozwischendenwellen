import { MapPin, Navigation, Compass, Waves, Coffee, ShoppingBag, Train } from 'lucide-react';
import { ApartmentInfo } from '../types';

interface LocationSectionProps {
  apartment: ApartmentInfo;
}

export function LocationSection({ apartment }: LocationSectionProps) {
  const distances = [
    { title: 'Weissenhäuser Strand (Ostsee)', dist: '6 Kilometer', time: '7 Min. mit PKW', icon: <Waves className="w-4 h-4 text-sky-600" /> },
    { title: 'Heiligenhafen (Seebrücke & Yachthafen)', dist: '12 Kilometer', time: '10 Min. mit PKW', icon: <Navigation className="w-4 h-4 text-indigo-600" /> },
    { title: 'Sonneninsel Fehmarn (Ostsee)', dist: '20 Kilometer', time: '18 Min. mit PKW', icon: <Compass className="w-4 h-4 text-amber-700" /> },
    { title: 'Oldenburger Wallmuseum', dist: '1,8 Kilometer', time: '4 Min. mit PKW', icon: <ShoppingBag className="w-4 h-4 text-emerald-600" /> },
    { title: 'Rathaus & historischer Stadtkern', dist: '1,1 Kilometer', time: '13 Min. zu Fuß', icon: <Coffee className="w-4 h-4 text-amber-800" /> },
    { title: 'Grömitz & Hohwachter Bucht', dist: '22 Kilometer', time: '20 Min. mit PKW', icon: <Train className="w-4 h-4 text-purple-600" /> }
  ];

  return (
    <section id="lage" className="py-16 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-amber-700" />
            Lage & Umgebung
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900">
            Im Herzen der Halbinsel Wagrien & OstseeSpitze
          </h2>
          <p className="text-stone-600 mt-2 text-base">
            Ruhige Feldrandlage in Oldenburg in Holstein: Die perfekte Ausgangslage, um jeden Tag flexibel den schönsten Ostseestrand nach Wind- und Sonnenbedingungen zu wählen.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Distances List (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500 mb-2">
              Entfernungen im Überblick
            </h3>

            <div className="space-y-3">
              {distances.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white border border-stone-200/90 shadow-2xs flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-stone-100 shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-stone-900">{item.title}</div>
                      <div className="text-2xs text-stone-500">{item.time}</div>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-stone-700 bg-stone-50 px-2 py-1 rounded border border-stone-200/60">
                    {item.dist}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-stone-700 space-y-1">
              <span className="font-semibold text-stone-900 block">Anreise mit dem PKW oder der Bahn:</span>
              <span>
                Feste Anreiseadresse: {apartment.address}, {apartment.postalCode} {apartment.city}. Reservierter PKW-Stellplatz Nr. 12 direkt vor dem Hauseingang.
              </span>
            </div>
          </div>

          {/* Interactive Styled Map Card (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-stone-200 bg-white shadow-sm flex flex-col">
            <div className="relative h-[340px] sm:h-[400px] w-full bg-sky-100 overflow-hidden group">
              {/* Stylized OpenStreetMap Embed or Interactive Visual View */}
              <iframe
                title="Lage der Ferienwohnung"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=10.88%2C54.28%2C10.91%2C54.2849&layer=mapnik&marker=54.284957%2C10.891743`}
                className="w-full h-full border-0"
                loading="lazy"
              />

              {/* Marker Overlay Badge */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs px-3 py-2 rounded-xl border border-stone-200 shadow-md flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-600 animate-bounce" />
                <div>
                  <div className="text-xs font-bold text-stone-900">{apartment.name}</div>
                  <div className="text-2xs text-stone-500">{apartment.address}, {apartment.city}</div>
                </div>
              </div>
            </div>

            {/* Map footer with Google Maps directions link */}
            <div className="p-4 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <span className="text-stone-600">
                Breitengrad: {apartment.coordinates.lat} · Längengrad: {apartment.coordinates.lng}
              </span>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${apartment.address}, ${apartment.postalCode} ${apartment.city}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg font-medium transition-colors self-start sm:self-auto"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Routenplaner in Google Maps öffnen</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
