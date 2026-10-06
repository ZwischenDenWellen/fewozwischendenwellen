import { DollarSign, ShieldCheck, Clock, Calendar, Check, AlertCircle } from 'lucide-react';
import { ApartmentInfo } from '../types';

interface PricingConditionsProps {
  apartment: ApartmentInfo;
  onScrollToCalendar: () => void;
}

export function PricingConditions({ apartment, onScrollToCalendar }: PricingConditionsProps) {
  const { pricing } = apartment;

  return (
    <section id="preise" className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1 flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-amber-700" />
            Transparente Mietpreise & Konditionen
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900">
            Faire Saisonpreise – ohne versteckte Kosten
          </h2>
          <p className="text-stone-600 mt-2 text-base">
            Buchen Sie direkt beim Eigentümer und sparen Sie die Service- und Vermittlungsgebühren großer Buchungsportale.
          </p>
        </div>

        {/* Pricing Table Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Nebensaison */}
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-500">Nebensaison</div>
            <div>
              <span className="font-display text-3xl sm:text-4xl font-bold text-stone-900">{pricing.basePricePerNight} €</span>
              <span className="text-stone-500 text-xs"> / Nacht</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Gültig von Januar bis Mai sowie Oktober bis Dezember (ausgenommen Feiertage). Ideal für ruhige Strandspaziergänge.
            </p>
            <div className="pt-2 text-xs text-stone-700 space-y-1.5">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Mindestaufenthalt: {pricing.minimumStayNights} Nächte</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Inkl. Heizung, Strom & Wasser</span>
              </div>
            </div>
          </div>

          {/* Hauptsaison */}
          <div className="p-6 rounded-2xl bg-amber-50/70 border-2 border-amber-800/20 space-y-4 relative shadow-xs">
            <div className="absolute top-4 right-4 bg-amber-800 text-white text-2xs uppercase tracking-wider font-bold px-2 py-0.5 rounded">
              Sommer & Feiertage
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-900">Hauptsaison</div>
            <div>
              <span className="font-display text-3xl sm:text-4xl font-bold text-amber-950">{pricing.highSeasonPricePerNight} €</span>
              <span className="text-stone-600 text-xs"> / Nacht</span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed">
              Gültig von Juni bis September sowie zu Ostern, Weihnachten & Silvester. Traumhafter Sommer am Waginger See und in den Bergen.
            </p>
            <div className="pt-2 text-xs text-stone-800 space-y-1.5">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span>Mindestaufenthalt: 4 Nächte</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-700" />
                <span>5% Rabatt ab 7 Übernachtungen</span>
              </div>
            </div>
          </div>

          {/* Nebenkosten */}
          <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-500">Nebenkosten & Service</div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between pb-2 border-b border-stone-200">
                <span className="text-stone-700">Endreinigung (einmalig):</span>
                <span className="font-bold text-stone-900">{pricing.cleaningFee} €</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-stone-200">
                <span className="text-stone-700">Kurbeitrag {apartment.city} (Erw./Tag):</span>
                <span className="font-bold text-stone-900">{pricing.touristTaxPerAdultPerNight.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-stone-200">
                <span className="text-stone-700">Kaution (erstattungsfähig):</span>
                <span className="font-bold text-stone-900">{pricing.deposit} €</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-700">PKW-Stellplatz & WLAN:</span>
                <span className="font-bold text-emerald-700">Kostenlos inklusive</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cancellation & Payment policies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8 rounded-2xl bg-stone-100/60 border border-stone-200">
          <div className="space-y-3">
            <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              Sorgenfrei buchen: Flexible Stornierungsbedingungen
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Bis zu <strong>14 Tage vor Anreise</strong> können Sie Ihre Buchung kostenfrei und ohne Angabe von Gründen stornieren. Bei späteren Absagen bemühen wir uns um eine Weitervermietung; gelingt dies, erstatten wir Ihnen den vollen Betrag zurück.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-stone-900 text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-800" />
              Zahlungsweise & Anreise
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Nach Erhalt der Buchungsbestätigung wird eine Anzahlung von 20% fällig. Die Restsumme überweisen Sie bequem bis 14 Tage vor Anreise. Am Anreisetag steht Ihnen die Wohnung ab 15:00 Uhr zur Verfügung (Schlüsseltresor mit individuellem Code).
            </p>
          </div>
        </div>

        {/* CTA to calendar */}
        <div className="mt-8 text-center">
          <button
            onClick={onScrollToCalendar}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm transition-colors shadow-xs"
          >
            <Calendar className="w-4 h-4 text-amber-300" />
            <span>Jetzt Reisedaten im Kalender auswählen</span>
          </button>
        </div>
      </div>
    </section>
  );
}
