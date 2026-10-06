import { 
  Wifi, Tv, Sun, Car, Utensils, Coffee, Droplets, Shirt, Zap, Baby, ShieldCheck, Building,
  Sparkles, Check
} from 'lucide-react';
import { Amenity } from '../types';

interface AmenitiesSectionProps {
  amenities: Amenity[];
}

export function AmenitiesSection({ amenities }: AmenitiesSectionProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wifi': return <Wifi className="w-5 h-5" />;
      case 'Tv': return <Tv className="w-5 h-5" />;
      case 'Sun': return <Sun className="w-5 h-5" />;
      case 'Car': return <Car className="w-5 h-5" />;
      case 'Utensils': return <Utensils className="w-5 h-5" />;
      case 'Coffee': return <Coffee className="w-5 h-5" />;
      case 'Droplets': return <Droplets className="w-5 h-5" />;
      case 'Shirt': return <Shirt className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'Baby': return <Baby className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'Building': return <Building className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  // Group by category
  const categories = Array.from(new Set(amenities.map(a => a.category)));

  return (
    <section id="ausstattung" className="py-16 bg-white border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1">Komfort & Details</div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900">
            Ausstattung für Ihren Rundum-Wohlfühlurlaub
          </h2>
          <p className="text-stone-600 mt-2 text-base">
            Von der voll ausgestatteten Küche über schnelles Glasfaser-Internet.
          </p>
        </div>

        {/* Categorized amenities layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map(category => {
            const categoryItems = amenities.filter(a => a.category === category);
            return (
              <div key={category} className="p-6 rounded-2xl bg-stone-50 border border-stone-200/80">
                <h3 className="font-semibold text-stone-900 text-base mb-4 flex items-center justify-between pb-2 border-b border-stone-200">
                  <span>{category}</span>
                  <span className="text-xs text-stone-500 font-normal">{categoryItems.length} Ausstattungsmerkmale</span>
                </h3>

                <ul className="space-y-3.5">
                  {categoryItems.map(item => (
                    <li key={item.id} className="flex items-center gap-3 text-stone-700 text-sm">
                      <div className={`p-2 rounded-lg shrink-0 ${item.highlight ? 'bg-amber-100 text-amber-900' : 'bg-stone-200 text-stone-700'}`}>
                        {getIcon(item.icon)}
                      </div>
                      <span className="font-medium text-stone-900">{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Special highlight note */}
        <div className="mt-8 p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-stone-700 flex items-center gap-3">
          <Check className="w-5 h-5 text-amber-800 shrink-0" />
          <span>
            <strong>Bettwäsche & Handtücher:</strong> Erstausstattung bei Anreise bezugsfertig inklusive. Küchenrolle, Toilettenpapier und Spülmaschinentabs ebenfalls vorhanden.
          </span>
        </div>
      </div>
    </section>
  );
}
