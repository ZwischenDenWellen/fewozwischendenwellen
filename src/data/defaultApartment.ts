import { ApartmentInfo, ICalFeed, ManualBlock } from '../types';

export const DEFAULT_APARTMENT: ApartmentInfo = {
  name: "Renovierte 3-Zimmer Ferienwohnung im Zentrum der Strände",
  tagline: "76 m² im cleanen maritimen Stil saniert – Zentral an der OstseeSpitze (Oldenburg i. H.)",
  description: "Der Erholungsort Oldenburg in Holstein zählt zu den ältesten Städten in Schleswig-Holstein und liegt im Zentrum der Tourismusregion „OstseeSpitze“ mit bekannten Ostseebädern wie Heiligenhafen und Weißenhäuser Strand, direkt vor der Sonneninsel Fehmarn. Die 2025 frisch sanierte 76 m² Ferienwohnung bietet 2 separate Schlafzimmer mit 4 Betten, einen sonnigen Wohn-Essbereich, eine voll ausgestattete Küche sowie ein modernes Bad mit Dusche und Doppelwaschtisch.",
  fullStory: "Die zentrale Lage macht die Ferienwohnung zum idealen Ausgangsort für Strandbesuche oder die vielen touristischen Angebote in der Region: Machen Sie einen Tagesausflug nach Fehmarn, betrachten Sie den Sonnenuntergang in Heiligenhafen, besuchen Sie das Neustädter Brauhaus Klüvers auf ein Bier oder machen Sie einfach einen entspannten Spieleabend mit der Familie direkt in der Ferienwohnung. Durch die Lage auf der Halbinsel „Wagrien“ können Sie Ihre Strandbesuche immer den aktuellen Wind- und Tagesbedingungen anpassen. Auch bei „Schietwetter“ bietet die Region viele Aktivitäten im Trockenen (wie das Abenteuer Dschungelland oder die Ostsee Erlebniswelt).\n\nDie Gastgeber, eine junge Familie, sind in der Region aufgewachsen und stehen Ihnen jederzeit mit persönlichen Geheimtipps zur Seite. Die Ferienwohnung mit 76 m² liegt in einem ruhigen Wohngebiet im Obergeschoss eines Einfamilienhauses mit Feldrandlage. Kostenfreie Parkmöglichkeiten sind direkt an der Straße immer vorhanden.",
  address: "Im Zentrum der Strände",
  postalCode: "23758",
  city: "Oldenburg in Holstein",
  region: "Halbinsel Wagrien / OstseeSpitze, Schleswig-Holstein",
  country: "Deutschland",
  coordinates: {
    lat: 54.2933,
    lng: 10.8872
  },
  sizeSqm: 76,
  maxGuests: 4,
  bedrooms: 2,
  beds: 4, // 1 Doppelbett + 2 Einzelbetten (4 Betten)
  bathrooms: 1, // Bad mit Dusche, WC & zwei Waschbecken
  floor: "Obergeschoss (Einfamilienhaus in Feldrandlage)",
  pricing: {
    basePricePerNight: 89,          // Nebensaison
    highSeasonPricePerNight: 129,   // Hauptsaison (Sommer / Feiertage)
    cleaningFee: 65,                // Einmalige Endreinigung
    touristTaxPerAdultPerNight: 2.00,// Ostseecard / Kurabgabe
    deposit: 150,                   // Kaution
    minimumStayNights: 3,           // Mindestaufenthalt
    discountWeekPercent: 5          // 5% Rabatt ab 7 Nächten
  },
  host: {
    name: "Familie Harms",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    phone: "+49 (0) 171 4589230",
    email: "harms.mail@web.de",
    bio: "Wir sind eine junge Familie, die hier an der Ostsee aufgewachsen ist und die Region liebt. Wir haben die Ferienwohnung Anfang 2025 frisch renoviert und möchten Ihnen einen perfekten Ausgangspunkt für alle Ostseestrände von Fehmarn bis Grömitz bieten!",
    responseTime: "Antwortet meist innerhalb einer Stunde",
    languages: ["Deutsch", "Englisch"],
    isSuperhost: true
  },
  rules: {
    checkInTime: "ab 15:00 Uhr (Schlüsseltresor / digitaler Check-in)",
    checkOutTime: "bis 10:00 Uhr",
    smokingAllowed: false,
    petsAllowed: false,
    partiesAllowed: false,
    quietHours: "22:00 – 07:00 Uhr"
  },
  photos: [
    {
      id: "p1",
      url: "https://media.vrbo.com/lodging/116000000/115500000/115499500/115499475/9d178653.jpg?impolicy=resizecrop&rw=1200&ra=fit",
      title: "Heller Wohn- und Essbereich",
      caption: "Frisch saniert im cleanen, gemütlichen maritimen Stil mit Couch, Sessel und Esstisch",
      category: "Wohnbereich"
    },
    {
      id: "p2",
      url: "https://media.vrbo.com/lodging/116000000/115500000/115499500/115499475/79330a55.jpg?impolicy=resizecrop&rw=1200&ra=fit",
      title: "Wohnbereich mit Smart-TV",
      caption: "Bequeme Sitzecke mit modernem Flachbild-TV, WLAN und Blick ins Grüne",
      category: "Wohnbereich"
    },
    {
      id: "p3",
      url: "https://media.vrbo.com/lodging/116000000/115500000/115499500/115499475/9bbeeb49.jpg?impolicy=resizecrop&rw=1200&ra=fit",
      title: "1. Schlafzimmer mit Doppelbett",
      caption: "Ruhiges Hauptschlafzimmer mit Doppelbett, Nachttisch, Lampe und Kleiderschrank",
      category: "Schlafzimmer"
    },
    {
      id: "p4",
      url: "https://media.vrbo.com/lodging/116000000/115500000/115499500/115499475/2af367b9.jpg?impolicy=resizecrop&rw=1200&ra=fit",
      title: "2. Schlafzimmer mit Einzelbetten",
      caption: "Zweites Schlafzimmer mit gemütlichen Einzelbetten – ideal für Kinder oder Mitreisende",
      category: "Schlafzimmer"
    },
    {
      id: "p5",
      url: "https://media.vrbo.com/lodging/116000000/115500000/115499500/115499475/25cd3ab4.jpg?impolicy=resizecrop&rw=1200&ra=fit",
      title: "Modernes Badezimmer mit Doppelwaschtisch",
      caption: "Neu saniertes Bad mit moderner Duschkabine, WC und zwei Waschbecken",
      category: "Bad"
    },
    {
      id: "p6",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      title: "Strände der OstseeSpitze ganz nah",
      caption: "Nur wenige Fahrminuten zum Weissenhäuser Strand, Heiligenhafen und Fehmarn",
      category: "Umgebung"
    }
  ],
  amenities: [
    { id: "a1", name: "Highspeed WLAN (kostenlos)", category: "Wohnen & Technik", icon: "Wifi", highlight: true },
    { id: "a2", name: "Smart-TV & Kabel-/Satellitenfernsehen", category: "Wohnen & Technik", icon: "Tv", highlight: true },
    { id: "a3", name: "Küche mit Geschirrspüler, Herd & Backofen", category: "Küche & Essen", icon: "Utensils", highlight: true },
    { id: "a4", name: "Kaffee-/Teezubehör, Wasserkocher & Toaster", category: "Küche & Essen", icon: "Coffee" },
    { id: "a5", name: "Bad mit Dusche, WC & 2 Waschbecken", category: "Schlafen & Bad", icon: "Droplets", highlight: true },
    { id: "a6", name: "2 Schlafzimmer mit 4 Betten", category: "Schlafen & Bad", icon: "BedDouble", highlight: true },
    { id: "a7", name: "Ruhige Feldrandlage im Obergeschoss", category: "Außenbereich", icon: "Sun", highlight: true },
    { id: "a8", name: "Kostenfreie Parkplätze direkt an der Straße", category: "Außenbereich", icon: "Car", highlight: true },
    { id: "a9", name: "Zentrale Lage im Zentrum aller Ostseestrände", category: "Extras", icon: "Compass", highlight: true },
    { id: "a10", name: "Familienfreundlich (Spiele & Platz)", category: "Familie & Sicherheit", icon: "Baby" },
    { id: "a11", name: "Rauchmelder & Heizung", category: "Familie & Sicherheit", icon: "ShieldCheck" },
    { id: "a12", name: "Nichtraucherdomizil (2025 saniert)", category: "Extras", icon: "Sparkles", highlight: true }
  ]
};

// Default demonstration iCal feeds (FeWo-direkt / Vrbo, Airbnb)
export const DEFAULT_ICAL_FEEDS: ICalFeed[] = [
  {
    id: "feed-fewo",
    name: "FeWo-direkt (p5616861)",
    url: "https://www.fewo-direkt.de/icalendar/5616861.ics",
    color: "#003580", // FeWo-direkt blue
    enabled: true,
    lastSyncedAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    eventCount: 2,
    status: "ok"
  },
  {
    id: "feed-airbnb",
    name: "Airbnb Belegung",
    url: "https://www.airbnb.de/calendar/ical/sample-listing-id.ics?s=demo-token",
    color: "#FF385C", // Airbnb red
    enabled: true,
    lastSyncedAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    eventCount: 2,
    status: "ok"
  }
];

// Helper to generate dates relative to current date for realistic demonstration
const formatISODate = (d: Date): string => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const addDays = (d: Date, days: number): Date => {
  const res = new Date(d);
  res.setDate(res.getDate() + days);
  return res;
};

const today = new Date();

export const INITIAL_DEMO_EVENTS = [
  {
    uid: "fewo-res-5616861-1@fewo-direkt.de",
    feedId: "feed-fewo",
    feedName: "FeWo-direkt",
    summary: "FeWo-direkt Buchung",
    startDate: formatISODate(addDays(today, 2)),
    endDate: formatISODate(addDays(today, 6)),
    color: "#003580"
  },
  {
    uid: "airbnb-res-101@airbnb.com",
    feedId: "feed-airbnb",
    feedName: "Airbnb",
    summary: "Airbnb Belegung",
    startDate: formatISODate(addDays(today, 10)),
    endDate: formatISODate(addDays(today, 15)),
    color: "#FF385C"
  },
  {
    uid: "fewo-res-5616861-2@fewo-direkt.de",
    feedId: "feed-fewo",
    feedName: "FeWo-direkt",
    summary: "FeWo-direkt Buchung",
    startDate: formatISODate(addDays(today, 20)),
    endDate: formatISODate(addDays(today, 25)),
    color: "#003580"
  }
];

export const INITIAL_MANUAL_BLOCKS: ManualBlock[] = [
  {
    id: "block-1",
    startDate: formatISODate(addDays(today, 32)),
    endDate: formatISODate(addDays(today, 36)),
    reason: "Eigentümer-Eigenbedarf",
    createdAt: new Date().toISOString()
  }
];
