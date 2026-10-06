import { Mail, Phone, MessageSquare, Clock, MapPin, Sparkles } from 'lucide-react';
import { ApartmentInfo } from '../types';

interface HostProfileProps {
  apartment: ApartmentInfo;
  onScrollToCalendar: () => void;
}

export function HostProfile({ apartment, onScrollToCalendar }: HostProfileProps) {
  const { host } = apartment;

  return (
    <section id="kontakt" className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-stone-900 text-white relative overflow-hidden shadow-xl">
          {/* Subtle background decoration */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-amber-600/10 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left: Host Avatar & Story (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
                <Sparkles className="w-4 h-4" />
                <span>Ihr persönlicher Kontakt</span>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <img
                  src={host.avatar}
                  alt={host.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-amber-400 shadow-lg"
                />
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                    {host.name}
                  </h3>
                  <div className="text-amber-300 text-xs sm:text-sm font-medium mt-0.5">
                    Private Gastgeber der {apartment.name}
                  </div>
                  <div className="flex items-center gap-2 text-stone-400 text-2xs mt-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{host.responseTime}</span>
                  </div>
                </div>
              </div>

              <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Haben Sie Fragen zur Ferienwohnung, zur Ausstattung für Kleinkinder oder zu Ausflugszielen auf dem Darß? Wir freuen uns über Ihre Nachricht und antworten Ihnen persönlich.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-stone-300 pt-2">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>{apartment.city}, {apartment.country}</span>
                </div>
                <span>·</span>
                <div>
                  Sprachen: <span className="text-white font-medium">{host.languages.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Right: Contact Action Buttons Card (5 cols) */}
            <div className="lg:col-span-5 bg-stone-800/90 p-6 rounded-2xl border border-stone-700/80 space-y-4">
              <div className="font-bold text-base text-white">
                Direkter Kontakt zu den Vermietern
              </div>

              <div className="space-y-3">
                {/* Phone */}
                <a
                  href={`tel:${host.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-stone-700/60 hover:bg-stone-700 text-white transition-colors border border-stone-600/60 text-xs group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-amber-400/20 text-amber-300">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-2xs text-stone-400 font-medium">Telefonisch erreichen</div>
                      <div className="font-bold text-white text-sm group-hover:text-amber-300 transition-colors">{host.phone}</div>
                    </div>
                  </div>
                  <span className="text-2xs text-stone-400">Jetzt anrufen &rarr;</span>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${host.email}?subject=Anfrage%20Ferienwohnung`}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-stone-700/60 hover:bg-stone-700 text-white transition-colors border border-stone-600/60 text-xs group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-400/20 text-emerald-300">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-2xs text-stone-400 font-medium">E-Mail schreiben</div>
                      <div className="font-bold text-white text-xs sm:text-sm group-hover:text-emerald-300 transition-colors truncate max-w-[200px]">{host.email}</div>
                    </div>
                  </div>
                  <span className="text-2xs text-stone-400">Senden &rarr;</span>
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${host.phone.replace(/[^0-9]/g, '')}?text=Hallo%20Familie%20Meyer%2C%20ich%20habe%20eine%20Frage%20zur%20Ferienwohnung`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-stone-700/60 hover:bg-stone-700 text-white transition-colors border border-stone-600/60 text-xs group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-green-500/20 text-green-400">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-2xs text-stone-400 font-medium">WhatsApp Chat</div>
                      <div className="font-bold text-white text-sm group-hover:text-green-300 transition-colors">Nachricht per WhatsApp</div>
                    </div>
                  </div>
                  <span className="text-2xs text-stone-400">Öffnen &rarr;</span>
                </a>
              </div>

              {/* Direct Booking CTA */}
              <button
                onClick={onScrollToCalendar}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-900 font-bold text-xs uppercase tracking-wider transition-colors shadow-md text-center"
              >
                Zum Belegungskalender
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
