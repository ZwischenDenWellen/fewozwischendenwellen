import { ApartmentInfo, ICalFeed, ManualBlock } from '../types';
import { INITIAL_HOLIDU_EVENTS } from './holiduEvents';

export const HOLIDU_ICAL_URL = "https://api.host.holidu.com/ical/e1tcvw2oaxy-z5ob-vevl.ics";

export const DEFAULT_APARTMENT: ApartmentInfo = {
  name: "3-Zimmer Ferienwohnung im Zentrum der Strände",
  tagline: "76 m² im cleanen maritimen Stil saniert – Zentral an der OstseeSpitze (Oldenburg i. H.)",
  description: "Der Erholungsort Oldenburg in Holstein zählt zu den ältesten Städten in Schleswig-Holstein und liegt im Zentrum der Tourismusregion „OstseeSpitze“ mit bekannten Ostseebädern wie Heiligenhafen und Weißenhäuser Strand, direkt vor der Sonneninsel Fehmarn. Die 2025 frisch sanierte 76 m² Ferienwohnung bietet 2 separate Schlafzimmer mit 4 Betten, einen sonnigen Wohn-Essbereich, eine voll ausgestattete Küche sowie ein modernes Bad mit Dusche und Doppelwaschtisch.",
  fullStory: "Die zentrale Lage macht die Ferienwohnung zum idealen Ausgangsort für Strandbesuche oder die vielen touristischen Angebote in der Region: Machen Sie einen Tagesausflug nach Fehmarn, betrachten Sie den Sonnenuntergang in Heiligenhafen, besuchen Sie das Neustädter Brauhaus Klüvers auf ein Bier oder machen Sie einfach einen entspannten Spieleabend mit der Familie direkt in der Ferienwohnung. Durch die Lage auf der Halbinsel „Wagrien“ können Sie Ihre Strandbesuche immer den aktuellen Wind- und Tagesbedingungen anpassen. Auch bei „Schietwetter“ bietet die Region viele Aktivitäten im Trockenen (wie das Abenteuer Dschungelland oder die Ostsee Erlebniswelt).\n\nDie Gastgeber, eine junge Familie, sind in der Region aufgewachsen und stehen Ihnen jederzeit mit persönlichen Geheimtipps zur Seite. Die Ferienwohnung mit 76 m² liegt in einem ruhigen Wohngebiet im Obergeschoss eines Einfamilienhauses mit Feldrandlage. Kostenfreie Parkmöglichkeiten sind direkt an der Straße immer vorhanden.",
  address: "Lindenallee 62",
  postalCode: "23758",
  city: "Oldenburg in Holstein",
  region: "Ostholstein, Schleswig-Holstein",
  country: "Deutschland",
  coordinates: {
    lat: 54.284903456464406,
    lng: 10.89143073820051
  },
  sizeSqm: 76,
  maxGuests: 4,
  bedrooms: 2,
  beds: 4, // 1 Doppelbett + 2 Einzelbetten (4 Betten)
  bathrooms: 1, // Bad mit Dusche, WC & zwei Waschbecken
  floor: "Obergeschoss (Einfamilienhaus in Feldrandlage)",
  pricing: {
    basePricePerNight: 100,          // Nebensaison
    highSeasonPricePerNight: 100,   // Hauptsaison (Sommer / Feiertage)
    cleaningFee: 60,                // Einmalige Endreinigung
    touristTaxPerAdultPerNight: 0.00,// Ostseecard / Kurabgabe
    deposit: 0,                   // Kaution
    minimumStayNights: 3,           // Mindestaufenthalt
    discountWeekPercent: 5          // 5% Rabatt ab 7 Nächten
  },
  host: {
    name: "Familie Harms",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    phone: "+49 (0) 1629784825",
    email: "harms.mail@web.de",
    bio: "Wir sind eine junge Familie, die hier an der Ostsee aufgewachsen ist und die Region liebt. Wir haben die Ferienwohnung Anfang 2025 frisch renoviert und möchten Ihnen einen perfekten Ausgangspunkt für alle Ostseestrände von Fehmarn bis Grömitz bieten!",
    responseTime: "Antwortet meist innerhalb einer Stunde",
    languages: ["Deutsch", "Englisch"],
    isSuperhost: true
  },
  rules: {
    checkInTime: "ab 16:00 Uhr (Türcode/ digitaler Check-in)",
    checkOutTime: "bis 11:00 Uhr",
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
    { id: "a2", name: "Smart-TV & Satellitenfernsehen", category: "Wohnen & Technik", icon: "Tv", highlight: true },
    { id: "a3", name: "Küche mit Geschirrspüler, Herd & Backofen", category: "Küche & Essen", icon: "Utensils", highlight: true },
    { id: "a4", name: "Kaffee-/Teezubehör, Wasserkocher & Toaster", category: "Küche & Essen", icon: "Coffee" },
    { id: "a5", name: "Bad mit Dusche, WC & 2 Waschbecken", category: "Schlafen & Bad", icon: "Droplets", highlight: true },
    { id: "a6", name: "2 Schlafzimmer mit 4 Betten", category: "Schlafen & Bad", icon: "BedDouble", highlight: true },
    { id: "a7", name: "Ruhige Feldrandlage im Obergeschoss", category: "Außenbereich", icon: "Sun", highlight: true },
    { id: "a8", name: "Kostenfreie Parkplätze direkt an der Straße", category: "Außenbereich", icon: "Car", highlight: true },
    { id: "a9", name: "Zentrale Lage im Zentrum aller Ostseestrände", category: "Extras", icon: "Compass", highlight: true },
    { id: "a10", name: "Familienfreundlich (Spiele & Platz)", category: "Familie & Sicherheit", icon: "Baby" },
    { id: "a11", name: "Rauchmelder & Heizung", category: "Familie & Sicherheit", icon: "ShieldCheck" },
    { id: "a12", name: "Nichtraucherwohnung (2025 saniert)", category: "Extras", icon: "Sparkles", highlight: true }
  ]
};

// Central Holidu iCal feed (Channel Manager syncing FeWo-direkt, Airbnb, Booking.com)
export const DEFAULT_ICAL_FEEDS: ICalFeed[] = [
  {
    id: "feed-holidu",
    name: "Holidu Kalendersync",
    url: HOLIDU_ICAL_URL,
    color: "#0284c7", // Holidu sky blue
    enabled: true,
    lastSyncedAt: new Date().toISOString(),
    eventCount: INITIAL_HOLIDU_EVENTS.length,
    status: "ok"
  }
];

export const INITIAL_DEMO_EVENTS = INITIAL_HOLIDU_EVENTS;

export const INITIAL_MANUAL_BLOCKS: ManualBlock[] = [];
