import { useState, useEffect, useCallback } from 'react';
import { ApartmentInfo, ICalFeed, ICalEvent, ManualBlock, BookingInquiry } from '../types';
import { DEFAULT_APARTMENT, DEFAULT_ICAL_FEEDS, INITIAL_DEMO_EVENTS, INITIAL_MANUAL_BLOCKS } from '../data/defaultApartment';
import { parseICalData, fetchICalFromUrl, generateICalContent, downloadICalFile } from '../utils/ical';

const STORAGE_KEYS = {
  APARTMENT: 'fewo_apartment_info_v1',
  FEEDS: 'fewo_ical_feeds_v1',
  EVENTS: 'fewo_synced_events_v1',
  BLOCKS: 'fewo_manual_blocks_v1',
  INQUIRIES: 'fewo_inquiries_v1'
};

export function useApartmentState() {
  // 1. Apartment data
  const [apartment, setApartment] = useState<ApartmentInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.APARTMENT);
      return saved ? JSON.parse(saved) : DEFAULT_APARTMENT;
    } catch {
      return DEFAULT_APARTMENT;
    }
  });

  // 2. iCal Feeds
  const [feeds, setFeeds] = useState<ICalFeed[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FEEDS);
      return saved ? JSON.parse(saved) : DEFAULT_ICAL_FEEDS;
    } catch {
      return DEFAULT_ICAL_FEEDS;
    }
  });

  // 3. Synced events from iCal
  const [events, setEvents] = useState<ICalEvent[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EVENTS);
      return saved ? JSON.parse(saved) : INITIAL_DEMO_EVENTS;
    } catch {
      return INITIAL_DEMO_EVENTS;
    }
  });

  // 4. Manual blocks
  const [manualBlocks, setManualBlocks] = useState<ManualBlock[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BLOCKS);
      return saved ? JSON.parse(saved) : INITIAL_MANUAL_BLOCKS;
    } catch {
      return INITIAL_MANUAL_BLOCKS;
    }
  });

  // 5. Inquiries
  const [inquiries, setInquiries] = useState<BookingInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isSyncingAll, setIsSyncingAll] = useState(false);
  const [syncStatusMessage, setSyncStatusMessage] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.APARTMENT, JSON.stringify(apartment));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [apartment]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FEEDS, JSON.stringify(feeds));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [feeds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.BLOCKS, JSON.stringify(manualBlocks));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [manualBlocks]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [inquiries]);

  // Sync a single feed
  const syncSingleFeed = useCallback(async (feedId: string) => {
    const feed = feeds.find(f => f.id === feedId);
    if (!feed) return;

    setFeeds(prev => prev.map(f => f.id === feedId ? { ...f, status: 'syncing', errorMessage: undefined } : f));

    try {
      // If it's a demo feed or real feed
      let icsRaw: string;
      if (feed.url.includes('sample-listing-id') || feed.url.includes('sample-token')) {
        // Simulated refresh with realistic events
        await new Promise(r => setTimeout(r, 600));
        icsRaw = generateICalContent([
          { startDate: '2026-10-15', endDate: '2026-10-19', summary: `${feed.name} Buchung` },
          { startDate: '2026-10-24', endDate: '2026-10-29', summary: `${feed.name} Buchung` },
          { startDate: '2026-11-05', endDate: '2026-11-10', summary: `${feed.name} Buchung` }
        ], apartment.name);
      } else {
        icsRaw = await fetchICalFromUrl(feed.url);
      }

      const parsedEvents = parseICalData(icsRaw, feed.id, feed.name, feed.color);

      // Replace events belonging to this feed
      setEvents(prev => [
        ...prev.filter(e => e.feedId !== feedId),
        ...parsedEvents
      ]);

      setFeeds(prev => prev.map(f => f.id === feedId ? {
        ...f,
        status: 'ok',
        eventCount: parsedEvents.length,
        lastSyncedAt: new Date().toISOString(),
        errorMessage: undefined
      } : f));

      setSyncStatusMessage(`Feed "${feed.name}" erfolgreich aktualisiert (${parsedEvents.length} Belegungen gefunden).`);
    } catch (err) {
      const msg = (err as Error).message || 'Fehler beim Abrufen';
      setFeeds(prev => prev.map(f => f.id === feedId ? {
        ...f,
        status: 'error',
        errorMessage: msg
      } : f));
      setSyncStatusMessage(`Fehler bei "${feed.name}": ${msg}`);
    }
  }, [feeds, apartment.name]);

  // Sync all enabled feeds
  const syncAllFeeds = useCallback(async () => {
    setIsSyncingAll(true);
    setSyncStatusMessage('Synchronisiere alle aktiven Kalender-Feeds...');
    try {
      for (const feed of feeds) {
        if (feed.enabled) {
          await syncSingleFeed(feed.id);
        }
      }
      setSyncStatusMessage('Alle iCal-Feeds wurden erfolgreich abgeglichen.');
    } finally {
      setIsSyncingAll(false);
      setTimeout(() => setSyncStatusMessage(null), 4000);
    }
  }, [feeds, syncSingleFeed]);

  // Add new feed
  const addFeed = useCallback((feed: Omit<ICalFeed, 'id' | 'eventCount' | 'status'>) => {
    const id = `feed-${Date.now()}`;
    const newFeed: ICalFeed = {
      ...feed,
      id,
      eventCount: 0,
      status: 'idle'
    };
    setFeeds(prev => [...prev, newFeed]);
    syncSingleFeed(id);
  }, [syncSingleFeed]);

  // Toggle or update feed
  const updateFeed = useCallback((updated: ICalFeed) => {
    setFeeds(prev => prev.map(f => f.id === updated.id ? updated : f));
  }, []);

  // Delete feed
  const deleteFeed = useCallback((feedId: string) => {
    setFeeds(prev => prev.filter(f => f.id !== feedId));
    setEvents(prev => prev.filter(e => e.feedId !== feedId));
  }, []);

  // Import directly from .ics File
  const importIcsFile = useCallback(async (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (text && text.includes('BEGIN:VCALENDAR')) {
        const feedId = `imported-${Date.now()}`;
        const feedName = file.name.replace(/\.ics$/i, '');
        const newEvents = parseICalData(text, feedId, feedName, '#059669'); // emerald color

        const newFeed: ICalFeed = {
          id: feedId,
          name: `${feedName} (Datei-Import)`,
          url: file.name,
          color: '#059669',
          enabled: true,
          lastSyncedAt: new Date().toISOString(),
          eventCount: newEvents.length,
          status: 'ok'
        };

        setFeeds(prev => [...prev, newFeed]);
        setEvents(prev => [...prev, ...newEvents]);
        setSyncStatusMessage(`.ics Datei "${file.name}" erfolgreich importiert (${newEvents.length} Belegungen hinzugefügt).`);
      } else {
        alert('Die ausgewählte Datei enthält keine gültigen iCalendar-Daten (BEGIN:VCALENDAR).');
      }
    };
    reader.readAsText(file);
  }, []);

  // Add manual block
  const addManualBlock = useCallback((block: Omit<ManualBlock, 'id' | 'createdAt'>) => {
    const newBlock: ManualBlock = {
      ...block,
      id: `block-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setManualBlocks(prev => [...prev, newBlock]);
  }, []);

  // Remove manual block
  const removeManualBlock = useCallback((blockId: string) => {
    setManualBlocks(prev => prev.filter(b => b.id !== blockId));
  }, []);

  // Update apartment data
  const updateApartment = useCallback((partial: Partial<ApartmentInfo>) => {
    setApartment(prev => ({
      ...prev,
      ...partial
    }));
  }, []);

  // Reset to default sample state
  const resetToDefaults = useCallback(() => {
    if (window.confirm('Möchten Sie alle Einstellungen, Kalender-Feeds und Sperrzeiten auf die Beispieldaten zurücksetzen?')) {
      setApartment(DEFAULT_APARTMENT);
      setFeeds(DEFAULT_ICAL_FEEDS);
      setEvents(INITIAL_DEMO_EVENTS);
      setManualBlocks(INITIAL_MANUAL_BLOCKS);
      setInquiries([]);
      localStorage.removeItem(STORAGE_KEYS.APARTMENT);
      localStorage.removeItem(STORAGE_KEYS.FEEDS);
      localStorage.removeItem(STORAGE_KEYS.EVENTS);
      localStorage.removeItem(STORAGE_KEYS.BLOCKS);
      localStorage.removeItem(STORAGE_KEYS.INQUIRIES);
      setSyncStatusMessage('Daten wurden auf den Ausgangszustand zurückgesetzt.');
    }
  }, []);

  // Generate iCal Export string of all current bookings & blocks
  const getExportICalContent = useCallback((): string => {
    const exportItems: Array<{ startDate: string; endDate: string; summary: string; uid?: string }> = [];

    // Include all active iCal events
    events.forEach(e => {
      exportItems.push({
        startDate: e.startDate,
        endDate: e.endDate,
        summary: `Belegt (${e.feedName})`,
        uid: e.uid
      });
    });

    // Include manual blocks
    manualBlocks.forEach(b => {
      exportItems.push({
        startDate: b.startDate,
        endDate: b.endDate,
        summary: b.reason || 'Eigentümersperre / Belegt',
        uid: b.id
      });
    });

    // Include confirmed/pending direct inquiries
    inquiries.filter(inq => inq.status !== 'cancelled').forEach(inq => {
      exportItems.push({
        startDate: inq.checkIn,
        endDate: inq.checkOut,
        summary: `Direktbuchung (${inq.guestName})`,
        uid: inq.id
      });
    });

    return generateICalContent(exportItems, apartment.name);
  }, [events, manualBlocks, inquiries, apartment.name]);

  // Trigger export download
  const downloadExportICal = useCallback(() => {
    const content = getExportICalContent();
    const cleanFileName = `${apartment.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-belegung.ics`;
    downloadICalFile(content, cleanFileName);
  }, [getExportICalContent, apartment.name]);

  // Submit direct booking inquiry
  const submitInquiry = useCallback((inquiry: Omit<BookingInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: BookingInquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    setInquiries(prev => [newInquiry, ...prev]);
    return newInquiry;
  }, []);

  return {
    apartment,
    updateApartment,
    feeds,
    events,
    manualBlocks,
    inquiries,
    isSyncingAll,
    syncStatusMessage,
    syncSingleFeed,
    syncAllFeeds,
    addFeed,
    updateFeed,
    deleteFeed,
    importIcsFile,
    addManualBlock,
    removeManualBlock,
    resetToDefaults,
    getExportICalContent,
    downloadExportICal,
    submitInquiry
  };
}
