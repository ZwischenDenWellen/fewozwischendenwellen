import { useState } from 'react';
import { Shield, FileText, X } from 'lucide-react';
import { ApartmentInfo } from '../types';

interface FooterProps {
  apartment: ApartmentInfo;
  onOpenGitHubGuide: () => void;
  onOpenHostSettings: () => void;
}

export function Footer({ apartment, onOpenGitHubGuide, onOpenHostSettings }: FooterProps) {
  const [legalModalType, setLegalModalType] = useState<'impressum' | 'datenschutz' | null>(null);

  return (
    <>
      <footer className="bg-stone-900 text-stone-400 py-12 text-xs border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Col 1: Brand */}
            <div className="space-y-3 md:col-span-2">
              <div className="font-display font-bold text-white text-lg">
                {apartment.name}
              </div>
              <p className="text-stone-400 text-xs max-w-sm leading-relaxed">
                Renovierte 3-Zimmer Ferienwohnung (76 m²) im Zentrum der Strände in Oldenburg in Holstein. Feldrandlage, 2 Schlafzimmer mit 4 Betten, Bad mit zwei Waschbecken, Küche, WLAN und iCal-Kalendersync.
              </p>
              <div className="text-stone-500 text-2xs">
                Adresse: {apartment.address}, {apartment.postalCode} {apartment.city}
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div className="space-y-2">
              <div className="font-bold text-white uppercase tracking-wider text-2xs">Navigation</div>
              <ul className="space-y-1.5 text-xs">
                <li><a href="#ueberblick" className="hover:text-white transition-colors">Überblick & Fotos</a></li>
                <li><a href="#ausstattung" className="hover:text-white transition-colors">Ausstattung</a></li>
                <li><a href="#lage" className="hover:text-white transition-colors">Lage & Anreise</a></li>
                <li><a href="#preise" className="hover:text-white transition-colors">Preise & Saisonzeiten</a></li>
                <li><a href="#kalender" className="hover:text-white transition-colors">Belegungskalender</a></li>
              </ul>
            </div>

            {/* Col 3: Host & Tools */}
            <div className="space-y-2">
              <div className="font-bold text-white uppercase tracking-wider text-2xs">Vermieter & Tools</div>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <button
                    onClick={onOpenHostSettings}
                    className="hover:text-amber-300 text-stone-300 transition-colors text-left"
                  >
                    Vermieter-Bereich (iCal Sync)
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenGitHubGuide}
                    className="hover:text-white transition-colors text-left"
                  >
                    GitHub Pages Bereitstellung
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setLegalModalType('impressum')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Impressum
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setLegalModalType('datenschutz')}
                    className="hover:text-white transition-colors text-left"
                  >
                    Datenschutzerklärung
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-2xs text-stone-500">
            <div>
              © {new Date().getFullYear()} {apartment.name}. Alle Rechte vorbehalten.
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-emerald-500" />
                Direktbuchung beim Eigentümer
              </span>
              <span>·</span>
              <span>RFC 5545 iCalendar Standard</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Impressum / Datenschutz Modal */}
      {legalModalType && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full max-h-[80vh] shadow-2xl border border-stone-200 flex flex-col overflow-hidden animate-scale-up">
            <div className="p-4 bg-stone-100 border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
                <FileText className="w-4 h-4 text-amber-800" />
                <span>{legalModalType === 'impressum' ? 'Impressum' : 'Datenschutzerklärung'}</span>
              </div>
              <button
                onClick={() => setLegalModalType(null)}
                className="p-1.5 rounded-lg hover:bg-stone-200 text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs text-stone-700 leading-relaxed">
              {legalModalType === 'impressum' ? (
                <>
                  <h4 className="font-bold text-sm text-stone-900">Angaben gemäß § 5 TMG</h4>
                  <p>
                    <strong>Betreiber der Ferienwohnung:</strong><br />
                    {apartment.host.name}<br />
                    {apartment.address}<br />
                    {apartment.postalCode} {apartment.city}
                  </p>
                  <p>
                    <strong>Kontakt:</strong><br />
                    Telefon: {apartment.host.phone}<br />
                    E-Mail: {apartment.host.email}
                  </p>
                  <p>
                    <strong>Haftung für Inhalte & Links:</strong><br />
                    Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
                  </p>
                </>
              ) : (
                <>
                  <h4 className="font-bold text-sm text-stone-900">Datenschutzerklärung</h4>
                  <p>
                    Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften (DSGVO).
                  </p>
                  <p>
                    <strong>Erhebung von Kontaktdaten:</strong><br />
                    Wenn Sie uns per Buchungsanfrage Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                  </p>
                  <p>
                    <strong>Kalender-Synchronisation (iCal):</strong><br />
                    Die Synchronisation mit externen Buchungsportalen (wie Airbnb oder Booking.com) erfolgt anonymisiert rein über Datumsintervalle. Es werden keine privaten Daten externer Gäste auf dieser Website gespeichert.
                  </p>
                </>
              )}
            </div>

            <div className="p-3 bg-stone-50 border-t border-stone-200 text-right">
              <button
                onClick={() => setLegalModalType(null)}
                className="px-4 py-1.5 rounded-lg bg-stone-900 text-white text-xs font-semibold"
              >
                Schließen
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
