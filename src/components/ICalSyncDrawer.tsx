import React, { useState } from 'react';
import { 
  X, CalendarSync, Download, Plus, Trash2, RefreshCw, Upload, 
  ExternalLink, Copy, Check, Shield, DollarSign, Home, Sliders, Mail
} from 'lucide-react';
import { ICalFeed, ManualBlock, ApartmentInfo, BookingInquiry } from '../types';
import { formatDateGerman } from '../utils/ical';

interface ICalSyncDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  feeds: ICalFeed[];
  manualBlocks: ManualBlock[];
  inquiries: BookingInquiry[];
  apartment: ApartmentInfo;
  isSyncingAll: boolean;
  onSyncSingleFeed: (feedId: string) => void;
  onSyncAllFeeds: () => void;
  onAddFeed: (feed: Omit<ICalFeed, 'id' | 'eventCount' | 'status'>) => void;
  onDeleteFeed: (feedId: string) => void;
  onToggleFeed: (feed: ICalFeed) => void;
  onImportIcsFile: (file: File) => void;
  onAddManualBlock: (block: { startDate: string; endDate: string; reason: string }) => void;
  onRemoveManualBlock: (id: string) => void;
  onDownloadICal: () => void;
  getExportICalContent: () => string;
  onUpdateApartment: (info: Partial<ApartmentInfo>) => void;
  onResetDefaults: () => void;
}

export function ICalSyncDrawer({
  isOpen,
  onClose,
  feeds,
  manualBlocks,
  inquiries,
  apartment,
  isSyncingAll,
  onSyncSingleFeed,
  onSyncAllFeeds,
  onAddFeed,
  onDeleteFeed,
  onToggleFeed,
  onImportIcsFile,
  onAddManualBlock,
  onRemoveManualBlock,
  onDownloadICal,
  getExportICalContent,
  onUpdateApartment,
  onResetDefaults
}: ICalSyncDrawerProps) {
  const [activeTab, setActiveTab] = useState<'feeds' | 'export' | 'blocks' | 'settings' | 'inquiries'>('feeds');

  // New Feed form
  const [newFeedName, setNewFeedName] = useState('');
  const [newFeedUrl, setNewFeedUrl] = useState('');
  const [newFeedColor, setNewFeedColor] = useState('#FF385C');

  // New Manual Block form
  const [blockStart, setBlockStart] = useState('');
  const [blockEnd, setBlockEnd] = useState('');
  const [blockReason, setBlockReason] = useState('Eigentümer-Eigenbedarf');

  // Copy feedback
  const [hasCopiedExport, setHasCopiedExport] = useState(false);

  // Settings form local state
  const [editPriceBase, setEditPriceBase] = useState(apartment.pricing.basePricePerNight);
  const [editPriceHigh, setEditPriceHigh] = useState(apartment.pricing.highSeasonPricePerNight);
  const [editCleaning, setEditCleaning] = useState(apartment.pricing.cleaningFee);
  const [editMinStay, setEditMinStay] = useState(apartment.pricing.minimumStayNights);
  const [editPhone, setEditPhone] = useState(apartment.host.phone);
  const [editEmail, setEditEmail] = useState(apartment.host.email);

  if (!isOpen) return null;

  const handleAddFeedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFeedName || !newFeedUrl) return;

    onAddFeed({
      name: newFeedName,
      url: newFeedUrl,
      color: newFeedColor,
      enabled: true
    });

    setNewFeedName('');
    setNewFeedUrl('');
  };

  const handleAddBlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blockStart || !blockEnd || blockStart >= blockEnd) {
      alert('Bitte wählen Sie ein gültiges Start- und Enddatum.');
      return;
    }

    onAddManualBlock({
      startDate: blockStart,
      endDate: blockEnd,
      reason: blockReason || 'Eigentümersperre'
    });

    setBlockStart('');
    setBlockEnd('');
  };

  const handleCopyICal = () => {
    const ics = getExportICalContent();
    navigator.clipboard.writeText(ics);
    setHasCopiedExport(true);
    setTimeout(() => setHasCopiedExport(false), 3000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateApartment({
      pricing: {
        ...apartment.pricing,
        basePricePerNight: Number(editPriceBase),
        highSeasonPricePerNight: Number(editPriceHigh),
        cleaningFee: Number(editCleaning),
        minimumStayNights: Number(editMinStay)
      },
      host: {
        ...apartment.host,
        phone: editPhone,
        email: editEmail
      }
    });
    alert('Einstellungen wurden erfolgreich gespeichert.');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-2xl h-full shadow-2xl flex flex-col border-l border-stone-200 animate-slide-left">
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <div className="flex items-center gap-2">
              <CalendarSync className="w-5 h-5 text-amber-800" />
              <h2 className="font-display font-bold text-lg text-stone-900">
                Vermieter-Bereich & Kalendersync (iCal)
              </h2>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Automatische Belegungssynchronisation für Airbnb, Booking.com & FeWo-direkt
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-stone-200 text-stone-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-stone-200 bg-stone-100/70 px-4 text-xs font-medium overflow-x-auto">
          <button
            onClick={() => setActiveTab('feeds')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'feeds'
                ? 'border-amber-800 text-amber-900 font-bold bg-white'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <CalendarSync className="w-3.5 h-3.5" />
            <span>iCal Feeds ({feeds.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('export')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'export'
                ? 'border-amber-800 text-amber-900 font-bold bg-white'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>iCal Export</span>
          </button>

          <button
            onClick={() => setActiveTab('blocks')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'blocks'
                ? 'border-amber-800 text-amber-900 font-bold bg-white'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Sperrzeiten ({manualBlocks.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'inquiries'
                ? 'border-amber-800 text-amber-900 font-bold bg-white'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>Anfragen ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 px-3 border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'settings'
                ? 'border-amber-800 text-amber-900 font-bold bg-white'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Preise & Daten</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: iCal Feeds */}
          {activeTab === 'feeds' && (
            <div className="space-y-6">
              {/* Sync All Button */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-stone-50 border border-stone-200">
                <div>
                  <h4 className="font-semibold text-stone-900 text-sm">Automatischer Kalenderabgleich</h4>
                  <p className="text-xs text-stone-500">Gleicht Belegungen von allen aktiven Portalen ab.</p>
                </div>
                <button
                  onClick={onSyncAllFeeds}
                  disabled={isSyncingAll}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-800 hover:bg-amber-900 text-white text-xs font-semibold shadow-xs disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncingAll ? 'animate-spin' : ''}`} />
                  <span>{isSyncingAll ? 'Gleiche ab...' : 'Jetzt alle synchronisieren'}</span>
                </button>
              </div>

              {/* Connected Feeds List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">Verbundene Kalender-Feeds</h4>

                {feeds.length === 0 ? (
                  <div className="p-4 rounded-xl border border-dashed border-stone-300 text-center text-xs text-stone-500">
                    Bisher sind keine externen iCal-Feeds hinterlegt. Fügen Sie unten einen Airbnb- oder Booking-Link hinzu.
                  </div>
                ) : (
                  feeds.map(feed => (
                    <div
                      key={feed.id}
                      className="p-4 rounded-xl border border-stone-200 bg-white hover:border-stone-300 transition-colors space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: feed.color }}
                          />
                          <span className="font-semibold text-stone-900 text-sm">{feed.name}</span>
                          <span className="text-2xs text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                            {feed.eventCount} {feed.eventCount === 1 ? 'Belegung' : 'Belegungen'}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* Toggle enabled */}
                          <button
                            onClick={() => onToggleFeed({ ...feed, enabled: !feed.enabled })}
                            className={`text-2xs px-2 py-1 rounded font-medium ${
                              feed.enabled ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-500'
                            }`}
                          >
                            {feed.enabled ? 'Aktiv' : 'Pausiert'}
                          </button>

                          {/* Sync this feed */}
                          <button
                            onClick={() => onSyncSingleFeed(feed.id)}
                            disabled={feed.status === 'syncing'}
                            className="p-1.5 rounded hover:bg-stone-100 text-stone-600"
                            title="Diesen Feed aktualisieren"
                          >
                            <RefreshCw className={`w-3.5 h-3.5 ${feed.status === 'syncing' ? 'animate-spin text-amber-700' : ''}`} />
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => onDeleteFeed(feed.id)}
                            className="p-1.5 rounded hover:bg-rose-50 text-rose-600"
                            title="Feed entfernen"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="text-2xs text-stone-500 truncate font-mono bg-stone-50 p-1.5 rounded">
                        {feed.url}
                      </div>

                      {feed.lastSyncedAt && (
                        <div className="text-2xs text-stone-400">
                          Letzter Sync: {new Date(feed.lastSyncedAt).toLocaleTimeString('de-DE')} Uhr
                        </div>
                      )}

                      {feed.errorMessage && (
                        <div className="text-2xs text-rose-600 bg-rose-50 p-2 rounded border border-rose-200">
                          {feed.errorMessage}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Add New Feed Form */}
              <form onSubmit={handleAddFeedSubmit} className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 space-y-3">
                <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <Plus className="w-4 h-4" />
                  Neuen iCal-Feed hinzufügen (Airbnb, Booking.com, FeWo-direkt)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="sm:col-span-2">
                    <label className="text-2xs font-semibold text-stone-600 uppercase block mb-1">Name des Portals</label>
                    <input
                      type="text"
                      placeholder="z.B. Mein Airbnb Kalender"
                      value={newFeedName}
                      onChange={e => setNewFeedName(e.target.value)}
                      required
                      className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-2xs font-semibold text-stone-600 uppercase block mb-1">Markierungsfarbe</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={newFeedColor}
                        onChange={e => setNewFeedColor(e.target.value)}
                        className="w-9 h-8 p-0.5 rounded border border-stone-300 cursor-pointer"
                      />
                      <span className="text-2xs text-stone-500">{newFeedColor}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-2xs font-semibold text-stone-600 uppercase block mb-1">iCal-Export URL des Portals (.ics Link)</label>
                  <input
                    type="url"
                    placeholder="https://www.airbnb.de/calendar/ical/...ics"
                    value={newFeedUrl}
                    onChange={e => setNewFeedUrl(e.target.value)}
                    required
                    className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-white"
                  />
                  <span className="text-2xs text-stone-500 mt-1 block">
                    Tipp: Bei Airbnb finden Sie diesen Link unter: Inserat &rarr; Preise & Verfügbarkeit &rarr; Kalender synchronisieren &rarr; Kalender exportieren.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-3 rounded-lg bg-amber-800 hover:bg-amber-900 text-white font-semibold text-xs transition-colors shadow-2xs"
                >
                  Feed speichern und Belegungen importieren
                </button>
              </form>

              {/* Upload local .ics file option */}
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-stone-800">
                  <Upload className="w-4 h-4 text-stone-600" />
                  <span>Direkter .ics Datei-Upload (ohne CORS-Einschränkungen)</span>
                </div>
                <p className="text-2xs text-stone-500">
                  Haben Sie eine .ics-Datei von Ihrem Buchungsprogramm oder Portal heruntergeladen? Ziehen Sie sie hier hinein:
                </p>
                <input
                  type="file"
                  accept=".ics,text/calendar"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) {
                      onImportIcsFile(file);
                      e.target.value = '';
                    }
                  }}
                  className="text-xs text-stone-600 file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-stone-200 file:text-stone-800 hover:file:bg-stone-300 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* TAB 2: iCal Export */}
          {activeTab === 'export' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
                <h4 className="font-bold flex items-center gap-1.5">
                  <ExternalLink className="w-4 h-4" />
                  So binden Sie diesen Kalender in Airbnb & Booking.com ein
                </h4>
                <p className="leading-relaxed">
                  Damit externe Portale wissen, wann Ihre Fewo belegt ist (durch Direktbucher oder Ihre Eigenbedarfssperren), exportieren Sie diesen Kalender.
                </p>
                <ol className="list-decimal list-inside space-y-1 font-medium pl-1 text-2xs">
                  <li>Laden Sie die .ics-Datei herunter oder kopieren Sie den Kalender-Inhalt.</li>
                  <li>Öffnen Sie Ihr Vermieterportal (z.B. Airbnb &rarr; Kalender synchronisieren &rarr; Kalender importieren).</li>
                  <li>Hinterlegen Sie die Kalenderdatei als Quelle. Fertig!</li>
                </ol>
              </div>

              {/* Download Action */}
              <div className="p-4 rounded-xl border border-stone-200 bg-white space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-semibold text-stone-900 text-sm">Kalenderdatei herunterladen</h5>
                    <p className="text-xs text-stone-500">Enthält alle aktuellen Reservierungen im RFC 5545 iCalendar-Format.</p>
                  </div>
                  <button
                    onClick={onDownloadICal}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-xs"
                  >
                    <Download className="w-4 h-4" />
                    <span>.ics herunterladen</span>
                  </button>
                </div>
              </div>

              {/* Copy Raw iCal text */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">Vorschau iCalendar Feed (RFC 5545)</span>
                  <button
                    onClick={handleCopyICal}
                    className="flex items-center gap-1 text-xs text-amber-800 hover:underline font-semibold"
                  >
                    {hasCopiedExport ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Kopiert!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>In Zwischenablage kopieren</span>
                      </>
                    )}
                  </button>
                </div>
                <textarea
                  readOnly
                  rows={8}
                  value={getExportICalContent()}
                  className="w-full text-2xs font-mono p-3 bg-stone-900 text-stone-200 rounded-xl focus:outline-none resize-none"
                />
              </div>
            </div>
          )}

          {/* TAB 3: Sperrzeiten (Manual Blocks) */}
          {activeTab === 'blocks' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                  Aktive manuelle Sperren ({manualBlocks.length})
                </h4>

                {manualBlocks.length === 0 ? (
                  <div className="p-4 rounded-xl border border-dashed border-stone-300 text-center text-xs text-stone-500">
                    Keine manuellen Sperrzeiten eingetragen.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {manualBlocks.map(block => (
                      <div
                        key={block.id}
                        className="p-3 rounded-xl border border-stone-200 bg-white flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-semibold text-stone-900">{block.reason}</div>
                          <div className="text-stone-500 text-2xs">
                            {formatDateGerman(block.startDate)} bis {formatDateGerman(block.endDate)}
                          </div>
                        </div>
                        <button
                          onClick={() => onRemoveManualBlock(block.id)}
                          className="p-1.5 rounded hover:bg-rose-50 text-rose-600"
                          title="Sperre aufheben"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Add manual block form */}
              <form onSubmit={handleAddBlockSubmit} className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-3">
                <h4 className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-amber-800" />
                  Neuen Zeitraum sperren (z.B. Eigenbedarf)
                </h4>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-2xs font-semibold text-stone-600 uppercase block mb-1">Beginn der Sperre</label>
                    <input
                      type="date"
                      required
                      value={blockStart}
                      onChange={e => setBlockStart(e.target.value)}
                      className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-2xs font-semibold text-stone-600 uppercase block mb-1">Ende der Sperre</label>
                    <input
                      type="date"
                      required
                      value={blockEnd}
                      onChange={e => setBlockEnd(e.target.value)}
                      className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-2xs font-semibold text-stone-600 uppercase block mb-1">Grund / Notiz</label>
                  <input
                    type="text"
                    value={blockReason}
                    onChange={e => setBlockReason(e.target.value)}
                    placeholder="z.B. Eigentümerurlaub oder Malerarbeiten"
                    className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 px-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs transition-colors shadow-2xs"
                >
                  Zeitraum im Kalender sperren
                </button>
              </form>
            </div>
          )}

          {/* TAB 4: Inquiries */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Eingegangene Buchungsanfragen ({inquiries.length})
              </h4>

              {inquiries.length === 0 ? (
                <div className="p-6 rounded-xl border border-dashed border-stone-300 text-center text-xs text-stone-500">
                  Bisher liegen noch keine Anfragen vor. Gäste können direkt über den Kalender anfragen.
                </div>
              ) : (
                inquiries.map(inq => (
                  <div key={inq.id} className="p-4 rounded-xl border border-stone-200 bg-white space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-900 text-sm">{inq.guestName}</span>
                      <span className="text-xs font-semibold text-amber-900 bg-amber-50 px-2 py-0.5 rounded">
                        {inq.totalEstimatedPrice.toFixed(2)} €
                      </span>
                    </div>
                    <div className="text-xs text-stone-600">
                      Zeitraum: {formatDateGerman(inq.checkIn)} – {formatDateGerman(inq.checkOut)} ({inq.nights} Nächte)
                    </div>
                    <div className="text-2xs text-stone-500 flex gap-4">
                      <span>E-Mail: {inq.guestEmail}</span>
                      {inq.guestPhone && <span>Tel: {inq.guestPhone}</span>}
                    </div>
                    {inq.message && (
                      <div className="text-2xs italic text-stone-600 bg-stone-50 p-2 rounded">
                        "{inq.message}"
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 5: Settings / Preise */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                Preise & Vermieter-Kontaktdaten anpassen
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-2xs font-semibold text-stone-600 uppercase block mb-1">
                    Nebensaison (€/Nacht)
                  </label>
                  <input
                    type="number"
                    value={editPriceBase}
                    onChange={e => setEditPriceBase(Number(e.target.value))}
                    className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-white"
                  />
                </div>

                <div>
                  <label className="text-2xs font-semibold text-stone-600 uppercase block mb-1">
                    Hauptsaison (€/Nacht)
                  </label>
                  <input
                    type="number"
                    value={editPriceHigh}
                    onChange={e => setEditPriceHigh(Number(e.target.value))}
                    className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-white"
                  />
                </div>

                <div>
                  <label className="text-2xs font-semibold text-stone-600 uppercase block mb-1">
                    Endreinigung (€)
                  </label>
                  <input
                    type="number"
                    value={editCleaning}
                    onChange={e => setEditCleaning(Number(e.target.value))}
                    className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-white"
                  />
                </div>

                <div>
                  <label className="text-2xs font-semibold text-stone-600 uppercase block mb-1">
                    Mindestaufenthalt (Nächte)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={editMinStay}
                    onChange={e => setEditMinStay(Number(e.target.value))}
                    className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="text-2xs font-semibold text-stone-600 uppercase block mb-1">
                    Telefonnummer Vermieter
                  </label>
                  <input
                    type="text"
                    value={editPhone}
                    onChange={e => setEditPhone(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-white"
                  />
                </div>

                <div>
                  <label className="text-2xs font-semibold text-stone-600 uppercase block mb-1">
                    E-Mail für Anfragen
                  </label>
                  <input
                    type="email"
                    value={editEmail}
                    onChange={e => setEditEmail(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-stone-300 bg-white"
                  />
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
                <div className="font-semibold flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Direkter E-Mail-Empfang aktiv</span>
                </div>
                <p className="text-2xs leading-relaxed text-emerald-800">
                  Gäste müssen kein eigenes E-Mail-Programm installiert haben. Das Buchungsformular sendet alle Anfragen direkt im Hintergrund an <strong>{editEmail}</strong>. In Ihrem E-Mail-Programm können Sie einfach auf „Antworten“ klicken.
                </p>
              </div>

              <div className="pt-3 flex items-center justify-between">
                <button
                  type="submit"
                  className="py-2.5 px-4 rounded-lg bg-amber-800 hover:bg-amber-900 text-white font-semibold text-xs shadow-xs"
                >
                  Änderungen speichern
                </button>

                <button
                  type="button"
                  onClick={onResetDefaults}
                  className="text-2xs text-rose-600 hover:underline"
                >
                  Auf Standardwerte zurücksetzen
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
