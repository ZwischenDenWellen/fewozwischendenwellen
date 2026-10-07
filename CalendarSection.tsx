import { useState, useMemo } from 'react';
import { 
  ChevronLeft, ChevronRight, Calendar as CalendarIcon, RefreshCw, Download, 
  Settings, Info, AlertCircle, CheckCircle, ArrowRight
} from 'lucide-react';
import { ApartmentInfo, ICalFeed, ICalEvent, ManualBlock, BookingInquiry } from '../types';
import { calculateStayPricing } from '../utils/pricing';
import { checkBookingConflict, formatDateGerman } from '../utils/ical';

interface CalendarSectionProps {
  apartment: ApartmentInfo;
  feeds: ICalFeed[];
  events: ICalEvent[];
  manualBlocks: ManualBlock[];
  inquiries: BookingInquiry[];
  isSyncingAll: boolean;
  syncStatusMessage: string | null;
  onSyncAllFeeds: () => void;
  onOpenHostSettings: () => void;
  onDownloadICal: () => void;
  onOpenBookingModal: (checkIn: string, checkOut: string, calculatedTotal: number) => void;
}

export function CalendarSection({
  apartment,
  feeds,
  events,
  manualBlocks,
  inquiries,
  isSyncingAll,
  syncStatusMessage,
  onSyncAllFeeds,
  onOpenHostSettings,
  onDownloadICal,
  onOpenBookingModal
}: CalendarSectionProps) {
  // Navigation: base month offset (0 = current month)
  const [monthOffset, setMonthOffset] = useState<number>(0);

  // Selected booking range
  const [checkInDate, setCheckInDate] = useState<string | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<string | null>(null);
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [adultsCount, setAdultsCount] = useState<number>(2);

  // Calculate current date info
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const todayIso = useMemo(() => {
    return today.toISOString().split('T')[0];
  }, [today]);

  // Two visible months: month 1 and month 2
  const { month1Date, month2Date } = useMemo(() => {
    const base = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
    const next = new Date(base.getFullYear(), base.getMonth() + 1, 1);
    return { month1Date: base, month2Date: next };
  }, [today, monthOffset]);

  // Aggregate all blocked dates into quick lookup maps
  // A night is blocked from startDate (inclusive) to endDate (exclusive).
  const blockedNightsMap = useMemo(() => {
    const map = new Map<string, { reason: string; color: string; feedName: string }>();

    // 1. iCal Events
    events.forEach(ev => {
      let cur = new Date(ev.startDate);
      const end = new Date(ev.endDate);
      while (cur < end) {
        const iso = cur.toISOString().split('T')[0];
        map.set(iso, {
          reason: ev.summary,
          color: ev.color || '#3b82f6',
          feedName: ev.feedName
        });
        cur.setDate(cur.getDate() + 1);
      }
    });

    // 2. Manual Blocks
    manualBlocks.forEach(b => {
      let cur = new Date(b.startDate);
      const end = new Date(b.endDate);
      while (cur < end) {
        const iso = cur.toISOString().split('T')[0];
        map.set(iso, {
          reason: b.reason || 'Eigentümersperre',
          color: '#475569',
          feedName: 'Vermieter'
        });
        cur.setDate(cur.getDate() + 1);
      }
    });

    // 3. Inquiries that are confirmed
    inquiries.filter(i => i.status === 'confirmed').forEach(inq => {
      let cur = new Date(inq.checkIn);
      const end = new Date(inq.checkOut);
      while (cur < end) {
        const iso = cur.toISOString().split('T')[0];
        map.set(iso, {
          reason: `Direktbuchung (${inq.guestName})`,
          color: '#d97706',
          feedName: 'Direktbuchung'
        });
        cur.setDate(cur.getDate() + 1);
      }
    });

    return map;
  }, [events, manualBlocks, inquiries]);

  // Helpers to check date status
  const isNightBlocked = (isoDate: string) => blockedNightsMap.has(isoDate);

  // Handle date click
  const handleDateClick = (isoDate: string) => {
    setValidationError(null);

    // Cannot select past dates
    if (isoDate < todayIso) return;

    // If starting a new selection or both already selected
    if (!checkInDate || (checkInDate && checkOutDate)) {
      // Check if this date night is already blocked
      if (isNightBlocked(isoDate)) {
        setValidationError('Dieser Tag ist leider bereits belegt.');
        return;
      }
      setCheckInDate(isoDate);
      setCheckOutDate(null);
      return;
    }

    // If checkInDate is already set and user clicked checkOut
    if (checkInDate && !checkOutDate) {
      if (isoDate <= checkInDate) {
        // User clicked an earlier date or same date: set as new check-in
        if (isNightBlocked(isoDate)) {
          setValidationError('Dieser Tag ist leider bereits belegt.');
          return;
        }
        setCheckInDate(isoDate);
        return;
      }

      // Check for conflicts between checkIn and isoDate
      const conflict = checkBookingConflict(checkInDate, isoDate, events, manualBlocks);
      if (conflict.hasConflict) {
        setValidationError(conflict.conflictingReason || 'Im gewählten Zeitraum liegt bereits eine Buchung vor.');
        return;
      }

      // Check minimum stay
      const start = new Date(checkInDate);
      const end = new Date(isoDate);
      const diffNights = Math.round((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
      if (diffNights < apartment.pricing.minimumStayNights) {
        setValidationError(`Mindestaufenthalt beträgt ${apartment.pricing.minimumStayNights} Nächte.`);
        return;
      }

      setCheckOutDate(isoDate);
    }
  };

  const handleResetSelection = () => {
    setCheckInDate(null);
    setCheckOutDate(null);
    setValidationError(null);
  };

  // Price calculations
  const priceCalc = useMemo(() => {
    if (!checkInDate || !checkOutDate) return null;
    return calculateStayPricing(checkInDate, checkOutDate, adultsCount, apartment);
  }, [checkInDate, checkOutDate, adultsCount, apartment]);

  // Generate calendar days for a given month
  const getDaysForMonth = (yearMonthDate: Date) => {
    const year = yearMonthDate.getFullYear();
    const month = yearMonthDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Monday is 0, Sunday is 6 in German standard
    let startDayOfWeek = firstDay.getDay() - 1;
    if (startDayOfWeek === -1) startDayOfWeek = 6;

    const days: Array<{
      date: Date;
      isoDate: string;
      dayNumber: number;
      isCurrentMonth: boolean;
      isPast: boolean;
      isBlocked: boolean;
      blockInfo?: { reason: string; color: string; feedName: string };
      isCheckIn: boolean;
      isCheckOut: boolean;
      isInSelectedRange: boolean;
      isHoverCandidate: boolean;
    }> = [];

    // Empty lead cells
    for (let i = 0; i < startDayOfWeek; i++) {
      const prevDate = new Date(year, month, 1 - (startDayOfWeek - i));
      const iso = prevDate.toISOString().split('T')[0];
      days.push({
        date: prevDate,
        isoDate: iso,
        dayNumber: prevDate.getDate(),
        isCurrentMonth: false,
        isPast: true,
        isBlocked: false,
        isCheckIn: false,
        isCheckOut: false,
        isInSelectedRange: false,
        isHoverCandidate: false
      });
    }

    // Days of the month
    for (let d = 1; d <= lastDay.getDate(); d++) {
      const date = new Date(year, month, d);
      const iso = date.toISOString().split('T')[0];
      const isPast = iso < todayIso;
      const isBlocked = isNightBlocked(iso);
      const blockInfo = blockedNightsMap.get(iso);

      const isCheckIn = checkInDate === iso;
      const isCheckOut = checkOutDate === iso;
      const isInSelectedRange = Boolean(
        checkInDate && checkOutDate && iso > checkInDate && iso < checkOutDate
      );

      const isHoverCandidate = Boolean(
        checkInDate && !checkOutDate && hoveredDate && iso > checkInDate && iso <= hoveredDate
      );

      days.push({
        date,
        isoDate: iso,
        dayNumber: d,
        isCurrentMonth: true,
        isPast,
        isBlocked,
        blockInfo,
        isCheckIn,
        isCheckOut,
        isInSelectedRange,
        isHoverCandidate
      });
    }

    return days;
  };

  const month1Days = useMemo(() => getDaysForMonth(month1Date), [month1Date, todayIso, blockedNightsMap, checkInDate, checkOutDate, hoveredDate]);
  const month2Days = useMemo(() => getDaysForMonth(month2Date), [month2Date, todayIso, blockedNightsMap, checkInDate, checkOutDate, hoveredDate]);

  const monthNames = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
  ];

  return (
    <section id="kalender" className="py-16 bg-stone-100/70 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1 flex items-center gap-1.5">
              <CalendarIcon className="w-4 h-4 text-amber-700" />
              Live iCal-Synchronisation
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-stone-900">
              Verfügbarkeit & Preisrechner
            </h2>
            <p className="text-stone-600 mt-1 text-sm sm:text-base">
              Wählen Sie Ihren Wunschzeitraum für eine unverbindliche Buchungsanfrage zum garantierten Direktbucherpreis.
            </p>
          </div>
        </div>

        {/* Sync message banner if any */}
        {syncStatusMessage && (
          <div className="mb-6 p-3 rounded-xl bg-sky-50 border border-sky-200 text-xs text-sky-900 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-sky-600 shrink-0" />
              <span>{syncStatusMessage}</span>
            </div>
            <button
              onClick={() => onSyncAllFeeds()}
              className="text-sky-800 font-semibold underline text-2xs cursor-pointer"
            >
              Erneut abgleichen
            </button>
          </div>
        )}

        {/* Main Grid: Calendar on Left (2 cols), Booking Calculator on Right (1 col) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Calendar Widget (8 cols) */}
          <div className="lg:col-span-7 xl:col-span-8 bg-white p-5 sm:p-7 rounded-2xl border border-stone-200/90 shadow-sm space-y-6">
            {/* Calendar Controls */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <span className="text-xs sm:text-sm font-semibold text-stone-800">
                  Mindestaufenthalt: {apartment.pricing.minimumStayNights} Nächte
                </span>
                {checkInDate && (
                  <button
                    onClick={handleResetSelection}
                    className="text-xs text-rose-700 hover:text-rose-900 hover:underline font-medium"
                  >
                    Auswahl zurücksetzen
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMonthOffset(prev => prev - 1)}
                  disabled={monthOffset <= 0}
                  className="p-2 rounded-lg border border-stone-200 hover:bg-stone-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Vorheriger Monat"
                >
                  <ChevronLeft className="w-4 h-4 text-stone-700" />
                </button>
                <button
                  onClick={() => setMonthOffset(prev => prev + 1)}
                  className="p-2 rounded-lg border border-stone-200 hover:bg-stone-50 transition-colors"
                  aria-label="Nächster Monat"
                >
                  <ChevronRight className="w-4 h-4 text-stone-700" />
                </button>
              </div>
            </div>

            {/* Validation alert if user clicked invalid range */}
            {validationError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2 animate-fade-in">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Multi-Month Calendar View */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Month 1 */}
              <div>
                <h4 className="font-display font-bold text-center text-stone-900 text-base mb-3">
                  {monthNames[month1Date.getMonth()]} {month1Date.getFullYear()}
                </h4>
                <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-stone-400 mb-2">
                  <span>Mo</span><span>Di</span><span>Mi</span><span>Do</span><span>Fr</span><span>Sa</span><span>So</span>
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {month1Days.map((day, idx) => (
                    <DayCell
                      key={`m1-${idx}`}
                      day={day}
                      onClick={() => day.isCurrentMonth && handleDateClick(day.isoDate)}
                      onMouseEnter={() => day.isCurrentMonth && setHoveredDate(day.isoDate)}
                      onMouseLeave={() => setHoveredDate(null)}
                    />
                  ))}
                </div>
              </div>

              {/* Month 2 */}
              <div>
                <h4 className="font-display font-bold text-center text-stone-900 text-base mb-3">
                  {monthNames[month2Date.getMonth()]} {month2Date.getFullYear()}
                </h4>
                <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-stone-400 mb-2">
                  <span>Mo</span><span>Di</span><span>Mi</span><span>Do</span><span>Fr</span><span>Sa</span><span>So</span>
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {month2Days.map((day, idx) => (
                    <DayCell
                      key={`m2-${idx}`}
                      day={day}
                      onClick={() => day.isCurrentMonth && handleDateClick(day.isoDate)}
                      onMouseEnter={() => day.isCurrentMonth && setHoveredDate(day.isoDate)}
                      onMouseLeave={() => setHoveredDate(null)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Calendar Legend */}
            <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded border border-stone-300 bg-white shadow-2xs" />
                  <span>Frei</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded bg-amber-800 text-white" />
                  <span>Ihre Auswahl</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded bg-sky-100 border border-sky-400" />
                  <span>Belegt (Holidu / Portale)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3.5 h-3.5 rounded bg-stone-300" />
                  <span>Gesperrt</span>
                </div>
              </div>

              <div className="text-2xs text-stone-500 italic">
                * An- und Abreise an belegten Tagen vormittags/nachmittags möglich.
              </div>
            </div>
          </div>

          {/* Pricing & Booking Card (4 cols) */}
          <div className="lg:col-span-5 xl:col-span-4 bg-white p-6 sm:p-7 rounded-2xl border border-stone-200/90 shadow-sm space-y-6">
            <div className="flex items-baseline justify-between border-b border-stone-100 pb-4">
              <div>
                <span className="text-2xl font-bold font-display text-stone-900">{apartment.pricing.basePricePerNight} €</span>
                <span className="text-xs text-stone-500"> / Nacht (Nebensaison)</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-stone-700">{apartment.pricing.highSeasonPricePerNight} €</span>
                <span className="text-2xs text-stone-400 block">Hauptsaison</span>
              </div>
            </div>

            {/* Date Selection Box */}
            <div className="rounded-xl border border-stone-200 overflow-hidden divide-y divide-stone-200">
              <div className="grid grid-cols-2 divide-x divide-stone-200 bg-stone-50/50">
                <div className="p-3">
                  <div className="text-2xs font-bold uppercase tracking-wider text-stone-500">Anreise</div>
                  <div className="text-sm font-semibold text-stone-900 mt-0.5">
                    {checkInDate ? formatDateGerman(checkInDate) : 'Datum wählen'}
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-2xs font-bold uppercase tracking-wider text-stone-500">Abreise</div>
                  <div className="text-sm font-semibold text-stone-900 mt-0.5">
                    {checkOutDate ? formatDateGerman(checkOutDate) : 'Datum wählen'}
                  </div>
                </div>
              </div>

              {/* Adults selector */}
              <div className="p-3 bg-white flex items-center justify-between">
                <div>
                  <div className="text-2xs font-bold uppercase tracking-wider text-stone-500">Gästeanzahl</div>
                  <div className="text-sm font-medium text-stone-800">Erwachsene</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setAdultsCount(prev => Math.max(1, prev - 1))}
                    className="w-7 h-7 rounded border border-stone-200 flex items-center justify-center text-sm font-bold hover:bg-stone-100"
                  >
                    -
                  </button>
                  <span className="w-5 text-center text-sm font-semibold">{adultsCount}</span>
                  <button
                    onClick={() => setAdultsCount(prev => Math.min(apartment.maxGuests, prev + 1))}
                    className="w-7 h-7 rounded border border-stone-200 flex items-center justify-center text-sm font-bold hover:bg-stone-100"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Price Breakdown Calculation */}
            {priceCalc ? (
              <div className="space-y-3 pt-2 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>
                    Übernachtungskosten ({priceCalc.nights} {priceCalc.nights === 1 ? 'Nacht' : 'Nächte'})
                  </span>
                  <span className="font-medium text-stone-900">{priceCalc.baseTotal} €</span>
                </div>

                {priceCalc.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Langzeitrabatt (ab 7 Nächte)</span>
                    <span className="font-semibold">-{priceCalc.discountAmount} €</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Endreinigung (einmalig)</span>
                  <span className="font-medium text-stone-900">{priceCalc.cleaningFee} €</span>
                </div>

                <div className="flex justify-between">
                  <span>Kurbeitrag {apartment.city} ({adultsCount} Erw. × {priceCalc.nights} N.)</span>
                  <span className="font-medium text-stone-900">{priceCalc.touristTaxTotal.toFixed(2)} €</span>
                </div>

                <div className="pt-3 border-t border-stone-200 flex justify-between items-baseline text-sm">
                  <span className="font-bold text-stone-900">Gesamtreisepreis</span>
                  <span className="text-xl font-bold font-display text-stone-900">
                    {priceCalc.grandTotal.toFixed(2)} €
                  </span>
                </div>

                <div className="text-2xs text-stone-400 text-right">
                  Inkl. Kaution {priceCalc.deposit} € (wird nach Abreise erstattet)
                </div>

                {/* Booking Button */}
                <button
                  onClick={() => onOpenBookingModal(checkInDate!, checkOutDate!, priceCalc.grandTotal)}
                  className="w-full mt-4 py-3.5 px-4 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all hover:shadow active:scale-99"
                >
                  <span>Unverbindliche Buchungsanfrage</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 text-xs text-stone-500 text-center space-y-2">
                <Info className="w-5 h-5 mx-auto text-amber-700" />
                <p>
                  {checkInDate
                    ? 'Bitte wählen Sie nun im Kalender den gewünschten Abreisetag aus.'
                    : 'Klicken Sie auf ein Reisedatum im Kalender, um die Preisberechnung zu starten.'}
                </p>
              </div>
            )}

            {/* Direct Booking Highlights */}
            <div className="pt-4 border-t border-stone-100 space-y-2 text-2xs text-stone-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Kostenlose Stornierung bis 14 Tage vor Anreise</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Persönlicher Kontakt & digitale Schlüsselübergabe</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Keine versteckten Servicegebühren von Drittportalen</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Subcomponent for individual Calendar Day Cell
interface DayCellProps {
  day: {
    date: Date;
    isoDate: string;
    dayNumber: number;
    isCurrentMonth: boolean;
    isPast: boolean;
    isBlocked: boolean;
    blockInfo?: { reason: string; color: string; feedName: string };
    isCheckIn: boolean;
    isCheckOut: boolean;
    isInSelectedRange: boolean;
    isHoverCandidate: boolean;
  };
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function DayCell({ day, onClick, onMouseEnter, onMouseLeave }: DayCellProps) {
  if (!day.isCurrentMonth) {
    return <div className="h-10 text-stone-200 flex items-center justify-center text-xs font-light" />;
  }

  // Base styling
  let bgClass = 'bg-stone-50 hover:bg-stone-100 text-stone-800';
  let borderClass = 'border border-stone-200/60';
  let cursorClass = 'cursor-pointer';

  if (day.isPast) {
    bgClass = 'bg-stone-100 text-stone-300 line-through';
    cursorClass = 'cursor-not-allowed';
  } else if (day.isCheckIn || day.isCheckOut) {
    bgClass = 'bg-amber-800 text-white font-bold shadow-xs';
    borderClass = 'border-amber-900';
  } else if (day.isInSelectedRange || day.isHoverCandidate) {
    bgClass = 'bg-amber-100 text-amber-900 font-medium';
    borderClass = 'border-amber-200';
  } else if (day.isBlocked) {
    // Determine feed coloring
    const isAirbnb = day.blockInfo?.feedName?.toLowerCase().includes('airbnb');
    const isBooking = day.blockInfo?.feedName?.toLowerCase().includes('booking');
    
    if (isAirbnb) {
      bgClass = 'bg-rose-50 text-rose-800 hover:bg-rose-100 font-medium';
      borderClass = 'border-rose-200';
    } else if (isBooking) {
      bgClass = 'bg-sky-50 text-sky-800 hover:bg-sky-100 font-medium';
      borderClass = 'border-sky-200';
    } else {
      bgClass = 'bg-stone-200 text-stone-600 font-medium';
      borderClass = 'border-stone-300';
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      disabled={day.isPast}
      title={day.blockInfo ? `${day.blockInfo.feedName}: ${day.blockInfo.reason}` : undefined}
      className={`relative h-10 w-full rounded-md text-xs flex flex-col items-center justify-center transition-all ${bgClass} ${borderClass} ${cursorClass}`}
    >
      <span>{day.dayNumber}</span>
      {day.isBlocked && !day.isPast && !day.isCheckIn && !day.isCheckOut && (
        <span
          className="absolute bottom-1 w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: day.blockInfo?.color || '#ef4444' }}
        />
      )}
    </button>
  );
}
