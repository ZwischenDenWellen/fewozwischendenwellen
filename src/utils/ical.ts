import { ICalEvent, ManualBlock } from '../types';

/**
 * Parses raw iCalendar (RFC 5545) text into structured ICalEvent objects.
 */
export function parseICalData(
  icsString: string,
  feedId: string,
  feedName: string,
  feedColor: string = '#3b82f6'
): ICalEvent[] {
  if (!icsString || typeof icsString !== 'string') {
    return [];
  }

  // 1. Unfold lines according to RFC 5545 (lines beginning with space or tab are continuation of previous line)
  const unfolded = icsString.replace(/\r\n[ \t]/g, '').replace(/\n[ \t]/g, '');
  const lines = unfolded.split(/\r\n|\r|\n/);

  const events: ICalEvent[] = [];
  let inEvent = false;
  let currentEvent: Partial<ICalEvent> & { rawStart?: string; rawEnd?: string } = {};

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    if (line === 'BEGIN:VEVENT') {
      inEvent = true;
      currentEvent = {
        feedId,
        feedName,
        color: feedColor,
        summary: 'Reserviert'
      };
      continue;
    }

    if (line === 'END:VEVENT') {
      if (inEvent && currentEvent.rawStart) {
        const startDate = parseICalDateString(currentEvent.rawStart);
        let endDate = currentEvent.rawEnd ? parseICalDateString(currentEvent.rawEnd) : startDate;

        if (startDate) {
          // If end date missing or invalid, default to next day
          if (!endDate) {
            endDate = addOneDayToIso(startDate);
          }

          events.push({
            uid: currentEvent.uid || `event-${Math.random().toString(36).substring(2, 9)}`,
            feedId,
            feedName,
            summary: currentEvent.summary || `${feedName} Belegung`,
            startDate,
            endDate,
            color: feedColor
          });
        }
      }
      inEvent = false;
      currentEvent = {};
      continue;
    }

    if (!inEvent) continue;

    // Property parsing: KEY;PARAM=VAL:VALUE or KEY:VALUE
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;

    const propHeader = line.substring(0, colonIdx);
    const propValue = line.substring(colonIdx + 1).trim();
    const propName = propHeader.split(';')[0].toUpperCase();

    switch (propName) {
      case 'UID':
        currentEvent.uid = propValue;
        break;
      case 'SUMMARY':
        currentEvent.summary = propValue.replace(/\\,/g, ',').replace(/\\;/g, ';').replace(/\\\\/g, '\\');
        break;
      case 'DTSTART':
        currentEvent.rawStart = propValue;
        break;
      case 'DTEND':
        currentEvent.rawEnd = propValue;
        break;
    }
  }

  return events;
}

/**
 * Converts iCal date/datetime string into ISO date string YYYY-MM-DD
 * Examples:
 * - 20260715 -> 2026-07-15
 * - 20260715T140000Z -> 2026-07-15
 * - 20260715T160000 -> 2026-07-15
 */
export function parseICalDateString(val: string): string | null {
  if (!val) return null;

  // Clean parameters or extra characters if any
  const clean = val.replace(/[^0-9T]/g, '');
  if (clean.length < 8) return null;

  const year = clean.substring(0, 4);
  const month = clean.substring(4, 6);
  const day = clean.substring(6, 8);

  const numYear = parseInt(year, 10);
  const numMonth = parseInt(month, 10);
  const numDay = parseInt(day, 10);

  if (isNaN(numYear) || isNaN(numMonth) || isNaN(numDay)) return null;
  if (numMonth < 1 || numMonth > 12 || numDay < 1 || numDay > 31) return null;

  return `${year}-${month}-${day}`;
}

export function addOneDayToIso(isoDate: string): string {
  const parts = isoDate.split('-').map(Number);
  const date = new Date(parts[0], parts[1] - 1, parts[2]);
  date.setDate(date.getDate() + 1);
  return date.toISOString().split('T')[0];
}

/**
 * Checks if a specific date (YYYY-MM-DD) falls between check-in (inclusive) and check-out (exclusive, nights).
 */
export function isDateInInterval(targetDate: string, startDate: string, endDate: string): boolean {
  return targetDate >= startDate && targetDate < endDate;
}

/**
 * Fetches an iCal feed with automatic CORS proxy fallback for client-side environments (GitHub Pages).
 */
export async function fetchICalFromUrl(url: string): Promise<string> {
  const cleanUrl = url.trim();
  if (!cleanUrl) {
    throw new Error('Keine URL angegeben.');
  }

  // 1. First attempt: Direct fetch
  try {
    const res = await fetch(cleanUrl, {
      headers: {
        'Accept': 'text/calendar, text/plain, */*'
      }
    });
    if (res.ok) {
      const text = await res.text();
      if (text.includes('BEGIN:VCALENDAR')) {
        return text;
      }
    }
  } catch {
    // Direct fetch might be blocked by CORS (standard in browser-only environments like GitHub Pages)
  }

  // 2. Second attempt: Public CORS proxy (allorigins.win)
  try {
    const proxyUrl1 = `https://api.allorigins.win/raw?url=${encodeURIComponent(cleanUrl)}`;
    const res1 = await fetch(proxyUrl1);
    if (res1.ok) {
      const text = await res1.text();
      if (text.includes('BEGIN:VCALENDAR')) {
        return text;
      }
    }
  } catch {
    // Fall through to next proxy
  }

  // 3. Third attempt: corsproxy.io
  try {
    const proxyUrl2 = `https://corsproxy.io/?url=${encodeURIComponent(cleanUrl)}`;
    const res2 = await fetch(proxyUrl2);
    if (res2.ok) {
      const text = await res2.text();
      if (text.includes('BEGIN:VCALENDAR')) {
        return text;
      }
    }
  } catch (err) {
    throw new Error(`Konnte iCal-Feed nicht abrufen (${(err as Error).message || 'CORS-Einschränkung'}). Sie können die .ics-Datei auch direkt per Datei-Upload importieren.`);
  }

  throw new Error('Der abgerufene Inhalt enthält kein gültiges iCal-Format (BEGIN:VCALENDAR).');
}

/**
 * Generates RFC 5545 iCalendar content (.ics) for external synchronization (e.g. into Airbnb, Booking.com, Google Cal).
 */
export function generateICalContent(
  events: Array<{ startDate: string; endDate: string; summary: string; uid?: string }>,
  apartmentName: string = 'Ferienwohnung Meerblick'
): string {
  const now = new Date();
  const dtstamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  let ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:-//${apartmentName.replace(/[^a-zA-Z0-9 ]/g, '')}//Belegungskalender v1.0//DE`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${apartmentName} Belegung`,
    'X-WR-TIMEZONE:Europe/Berlin'
  ];

  events.forEach((ev, idx) => {
    // Format YYYY-MM-DD to YYYYMMDD
    const startFormatted = ev.startDate.replace(/-/g, '');
    const endFormatted = ev.endDate.replace(/-/g, '');
    const uid = ev.uid || `event-${idx}-${startFormatted}@fewo-meerblick.local`;

    ics.push('BEGIN:VEVENT');
    ics.push(`UID:${uid}`);
    ics.push(`DTSTAMP:${dtstamp}`);
    ics.push(`DTSTART;VALUE=DATE:${startFormatted}`);
    ics.push(`DTEND;VALUE=DATE:${endFormatted}`);
    ics.push(`SUMMARY:${ev.summary || 'Belegt / Reserviert'}`);
    ics.push(`DESCRIPTION:Belegungszeitraum der ${apartmentName}`);
    ics.push('STATUS:CONFIRMED');
    ics.push('TRANSP:OPAQUE');
    ics.push('END:VEVENT');
  });

  ics.push('END:VCALENDAR');

  return ics.join('\r\n');
}

/**
 * Triggers a file download in the browser for the generated .ics file.
 */
export function downloadICalFile(icsContent: string, filename: string = 'ferienwohnung-kalender.ics'): void {
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Checks if a requested booking interval [checkIn, checkOut] conflicts with any blocked date.
 */
export function checkBookingConflict(
  checkIn: string,
  checkOut: string,
  allEvents: ICalEvent[],
  manualBlocks: ManualBlock[]
): { hasConflict: boolean; conflictingReason?: string } {
  if (!checkIn || !checkOut || checkIn >= checkOut) {
    return { hasConflict: false };
  }

  // A booking occupies nights from checkIn to the night before checkOut.
  // An event occupies nights from ev.startDate to ev.endDate - 1.
  for (const ev of allEvents) {
    if (checkIn < ev.endDate && checkOut > ev.startDate) {
      return {
        hasConflict: true,
        conflictingReason: `Kollidiert mit: ${ev.summary} (${formatDateGerman(ev.startDate)} – ${formatDateGerman(ev.endDate)})`
      };
    }
  }

  for (const block of manualBlocks) {
    if (checkIn < block.endDate && checkOut > block.startDate) {
      return {
        hasConflict: true,
        conflictingReason: `Kollidiert mit Sperre: ${block.reason} (${formatDateGerman(block.startDate)} – ${formatDateGerman(block.endDate)})`
      };
    }
  }

  return { hasConflict: false };
}

export function formatDateGerman(isoDate: string): string {
  if (!isoDate) return '';
  const [year, month, day] = isoDate.split('-');
  return `${day}.${month}.${year}`;
}
