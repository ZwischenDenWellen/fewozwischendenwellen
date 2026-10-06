import { Star, CheckCircle, Quote } from 'lucide-react';

export function ReviewsSection() {
  const reviews = [
    {
      id: 'rev-1',
      author: 'Familie Schultheiss',
      location: 'Berlin',
      date: 'September 2026',
      rating: 5,
      text: 'Ein echter Traum! Die Wohnung ist blitzsauber, geschmackvoll eingerichtet und die Lage ist unschlagbar – in nur 2 Minuten steht man barfuß am Strand. Besonders die bequemen Betten und der Südbalkon haben unseren Urlaub perfekt gemacht. Wir kommen nächstes Jahr garantiert wieder!'
    },
    {
      id: 'rev-2',
      author: 'Dr. Michael & Claudia B.',
      location: 'Hamburg',
      date: 'Juli 2026',
      rating: 5,
      text: 'Hervorragende Ferienwohnung! Schnelles WLAN für mobiles Arbeiten war für mich entscheidend, und die Küche hat alles, was man für frische Fischgerichte braucht. Der Vermieter Alexander antwortet super schnell und ist überaus zuvorkommend.'
    },
    {
      id: 'rev-3',
      author: 'Kathrin & Jonas M.',
      location: 'Dresden',
      date: 'Mai 2026',
      rating: 5,
      text: 'Perfekt für unsere Familie mit zwei Kindern. Das zweite Schlafzimmer ist ideal, die Regendusche eine Wohltat nach langen Fahrradtouren auf dem Darß. Absolut empfehlenswert!'
    }
  ];

  const ratingCategories = [
    { name: 'Sauberkeit & Hygiene', score: '5.0' },
    { name: 'Lage & Strandnähe', score: '5.0' },
    { name: 'Kommunikation & Check-in', score: '5.0' },
    { name: 'Ausstattung & Komfort', score: '4.9' },
    { name: 'Preis-Leistungs-Verhältnis', score: '4.9' }
  ];

  return (
    <section id="bewertungen" className="py-16 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Rating summary banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-12 border-b border-stone-200">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-display font-bold text-2xl text-stone-900">4.97 von 5 Sternen</span>
            </div>
            <p className="text-stone-600 text-sm">
              Basierend auf über 38 verifizierten Gästebewertungen aus Direktbuchungen und Portalen.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            {ratingCategories.map(cat => (
              <div key={cat.name} className="p-2.5 rounded-lg bg-white border border-stone-200/80">
                <div className="text-stone-500 text-2xs truncate">{cat.name}</div>
                <div className="font-bold text-stone-900 text-sm">{cat.score} ★</div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {reviews.map(review => (
            <div
              key={review.id}
              className="p-6 rounded-2xl bg-white border border-stone-200 shadow-2xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-stone-200" />
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  "{review.text}"
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-stone-900">{review.author}</div>
                  <div className="text-2xs text-stone-400">{review.location}</div>
                </div>
                <div className="text-2xs text-stone-400 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-emerald-600" />
                  <span>{review.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
