import { ApartmentInfo, ICalFeed, ManualBlock } from '../types';

export const DEFAULT_APARTMENT: ApartmentInfo = {
  name: "Ferienwohnung Meerblick & Dünenzauber",
  tagline: "Lichtdurchflutete 3-Zimmer-Designwohnung nur 150m vom Ostseestrand",
  description: "Erleben Sie erholsame Tage in unserer liebevoll modernisierten 68 m² Ferienwohnung. Mit großem Südbalkon, sonnigem Wohnbereich, zwei separaten Schlafzimmern und vollwertiger Markenküche bietet die Wohnung den idealen Rückzugsort für bis zu 4 Gäste. Nur 2 Gehminuten zum feinsandigen Strand.",
  fullStory: "Unsere Ferienwohnung wurde im Frühjahr 2024 umfassend renoviert und mit viel Liebe zum Detail im nordisch-skandinavischen Stil eingerichtet. Große Fensterfronten lassen viel Licht herein, und vom sonnigen Südbalkon genießen Sie bei frischer Meeresbrise Ihren Morgenkaffee oder den Sundowner. Für Homeoffice-Reisende steht stabiles Glasfaser-WLAN mit 250 Mbit/s zur Verfügung. Zur Wohnung gehört ein privater PKW-Stellplatz direkt vor dem Haus sowie ein abschließbarer Fahrradschuppen mit Lademöglichkeit für E-Bikes.",
  address: "Strandstraße 24, Whg. 12",
  postalCode: "18374",
  city: "Zingst",
  region: "Fischland-Darß-Zingst, Mecklenburg-Vorpommern",
  country: "Deutschland",
  coordinates: {
    lat: 54.4348,
    lng: 12.6845
  },
  sizeSqm: 68,
  maxGuests: 4,
  bedrooms: 2,
  beds: 3, // 1 Boxspringbett (180x200) + 2 Einzelbetten (90x200)
  bathrooms: 1,
  floor: "2. Obergeschoss (mit Fahrstuhl)",
  pricing: {
    basePricePerNight: 95,          // Nebensaison
    highSeasonPricePerNight: 145,   // Hauptsaison (Juni - Sep & Weihnachten/Silvester)
    cleaningFee: 75,                // Einmalige Endreinigung
    touristTaxPerAdultPerNight: 2.80,// Zingster Kurabgabe
    deposit: 150,                   // Kaution
    minimumStayNights: 3,
    discountWeekPercent: 5          // 5% ab 7 Nächten
  },
  host: {
    name: "Alexander & Sabine Meyer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    phone: "+49 (0) 171 4589230",
    email: "ferienwohnung.zingst.strand@gmail.com",
    bio: "Wir sind seit über 15 Jahren begeisterte Ostsee-Liebhaber und möchten, dass Sie sich in unserer Wohnung wie zu Hause fühlen. Bei Fragen zur Wohnung oder für Ausflugstipps stehen wir Ihnen jederzeit gerne zur Seite!",
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
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
      title: "Heller Wohn- und Essbereich",
      caption: "Offener, lichtdurchfluteter Wohnraum mit gemütlicher Sitzecke und Smart-TV",
      category: "Wohnbereich"
    },
    {
      id: "p2",
      url: "https://images.unsplash.com/photo-1540518614846-7ede433c4ef4?auto=format&fit=crop&w=1000&q=80",
      title: "Hauptschlafzimmer mit Boxspringbett",
      caption: "Hochwertiges Boxspringbett (180x200 cm), rückenfreundliche Matratzen und Verdunklungsvorhänge",
      category: "Schlafzimmer"
    },
    {
      id: "p3",
      url: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80",
      title: "Voll ausgestattete Küche",
      caption: "Geschirrspüler, Nespresso-Maschine, Induktionsherd, Backofen und Mikrowelle",
      category: "Küche"
    },
    {
      id: "p4",
      url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80",
      title: "Modernes Wellness-Badezimmer",
      caption: "Ebenerdige Regendusche, Handtuchwärmer, Föhn und beleuchteter Spiegel",
      category: "Bad"
    },
    {
      id: "p5",
      url: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
      title: "Sonniger Südbalkon",
      caption: "Gemütliche Loungemöbel und Sonnenschirm für entspannte Nachmittage",
      category: "Balkon/Aussicht"
    },
    {
      id: "p6",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
      title: "Nur 150m zum Ostseestrand",
      caption: "Feinsandiger Sandstrand mit Strandkörben und Seebrücke in unmittelbarer Nähe",
      category: "Umgebung"
    }
  ],
  amenities: [
    { id: "a1", name: "Highspeed WLAN (250 Mbit/s)", category: "Wohnen & Technik", icon: "Wifi", highlight: true },
    { id: "a2", name: "Smart-TV (55 Zoll, Netflix fähig)", category: "Wohnen & Technik", icon: "Tv", highlight: true },
    { id: "a3", name: "Südbalkon mit Loungemöbeln", category: "Außenbereich", icon: "Sun", highlight: true },
    { id: "a4", name: "Kostenloser PKW-Stellplatz", category: "Außenbereich", icon: "Car", highlight: true },
    { id: "a5", name: "Geschirrspüler & Backofen", category: "Küche & Essen", icon: "Utensils", highlight: true },
    { id: "a6", name: "Nespresso & Filterkaffeemaschine", category: "Küche & Essen", icon: "Coffee" },
    { id: "a7", name: "Ebenerdige Regendusche", category: "Schlafen & Bad", icon: "Droplets", highlight: true },
    { id: "a8", name: "Waschmaschine & Trockner im Haus", category: "Extras", icon: "Shirt" },
    { id: "a9", name: "E-Bike Ladestation im Schuppen", category: "Außenbereich", icon: "Zap" },
    { id: "a10", name: "Hochstuhl & Babyreisebett", category: "Familie & Sicherheit", icon: "Baby" },
    { id: "a11", name: "Rauchmelder & Erste-Hilfe-Set", category: "Familie & Sicherheit", icon: "ShieldCheck" },
    { id: "a12", name: "Aufzug / Fahrstuhl barrierearm", category: "Extras", icon: "Building" }
  ]
};

// Default demonstration iCal feeds (e.g. Airbnb, Booking.com)
export const DEFAULT_ICAL_FEEDS: ICalFeed[] = [
  {
    id: "feed-airbnb",
    name: "Airbnb Belegung",
    url: "https://www.airbnb.de/calendar/ical/sample-listing-id.ics?s=demo-token",
    color: "#FF385C", // Airbnb red
    enabled: true,
    lastSyncedAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    eventCount: 3,
    status: "ok"
  },
  {
    id: "feed-booking",
    name: "Booking.com Belegung",
    url: "https://admin.booking.com/hotel/hoteladmin/ical.html?t=sample-token",
    color: "#003580", // Booking navy
    enabled: true,
    lastSyncedAt: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
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
    uid: "airbnb-res-101@airbnb.com",
    feedId: "feed-airbnb",
    feedName: "Airbnb",
    summary: "Airbnb Belegung (Familie Weber)",
    startDate: formatISODate(addDays(today, 2)),
    endDate: formatISODate(addDays(today, 6)),
    color: "#FF385C"
  },
  {
    uid: "booking-res-202@booking.com",
    feedId: "feed-booking",
    feedName: "Booking.com",
    summary: "Booking.com Belegung (Dr. Franke)",
    startDate: formatISODate(addDays(today, 9)),
    endDate: formatISODate(addDays(today, 14)),
    color: "#003580"
  },
  {
    uid: "airbnb-res-303@airbnb.com",
    feedId: "feed-airbnb",
    feedName: "Airbnb",
    summary: "Airbnb Belegung (M. Sommer)",
    startDate: formatISODate(addDays(today, 18)),
    endDate: formatISODate(addDays(today, 23)),
    color: "#FF385C"
  },
  {
    uid: "booking-res-404@booking.com",
    feedId: "feed-booking",
    feedName: "Booking.com",
    summary: "Booking.com Belegung (T. Hoffmann)",
    startDate: formatISODate(addDays(today, 27)),
    endDate: formatISODate(addDays(today, 32)),
    color: "#003580"
  }
];

export const INITIAL_MANUAL_BLOCKS: ManualBlock[] = [
  {
    id: "block-1",
    startDate: formatISODate(addDays(today, 38)),
    endDate: formatISODate(addDays(today, 42)),
    reason: "Eigentümer-Eigenbedarf (Familienurlaub)",
    createdAt: new Date().toISOString()
  }
];
