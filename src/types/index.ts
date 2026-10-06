export interface Amenity {
  id: string;
  name: string;
  category: 'Wohnen & Technik' | 'Küche & Essen' | 'Schlafen & Bad' | 'Außenbereich' | 'Familie & Sicherheit' | 'Extras';
  icon: string;
  highlight?: boolean;
}

export interface PhotoItem {
  id: string;
  url: string;
  title: string;
  caption: string;
  category: 'Wohnbereich' | 'Schlafzimmer' | 'Küche' | 'Bad' | 'Balkon/Aussicht' | 'Umgebung';
}

export interface PricingConfig {
  basePricePerNight: number;       // Nebensaison
  highSeasonPricePerNight: number; // Hauptsaison (z.B. Juni - August)
  cleaningFee: number;            // Einmalige Endreinigung
  touristTaxPerAdultPerNight: number; // Kurtaxe
  deposit: number;                // Kaution
  minimumStayNights: number;      // Mindestaufenthalt in Nächten
  discountWeekPercent?: number;   // Rabatt ab 7 Nächten
}

export interface ApartmentInfo {
  name: string;
  tagline: string;
  description: string;
  fullStory: string;
  address: string;
  postalCode: string;
  city: string;
  region: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  sizeSqm: number;
  maxGuests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  floor: string;
  pricing: PricingConfig;
  host: {
    name: string;
    avatar: string;
    phone: string;
    email: string;
    bio: string;
    responseTime: string;
    languages: string[];
    isSuperhost: boolean;
  };
  rules: {
    checkInTime: string;
    checkOutTime: string;
    smokingAllowed: boolean;
    petsAllowed: boolean;
    partiesAllowed: boolean;
    quietHours: string;
  };
  photos: PhotoItem[];
  amenities: Amenity[];
}

export interface ICalFeed {
  id: string;
  name: string;
  url: string;
  color: string;
  enabled: boolean;
  lastSyncedAt?: string;
  eventCount: number;
  status: 'idle' | 'syncing' | 'ok' | 'error';
  errorMessage?: string;
}

export interface ICalEvent {
  uid: string;
  feedId: string;
  feedName: string;
  summary: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD (exclusive standard in iCal)
  color?: string;
}

export interface ManualBlock {
  id: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  reason: string;
  createdAt: string;
}

export interface BookingInquiry {
  id: string;
  createdAt: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guestsAdults: number;
  guestsChildren: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  message?: string;
  totalEstimatedPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface PriceCalculation {
  nights: number;
  standardNights: number;
  highSeasonNights: number;
  baseTotal: number;
  cleaningFee: number;
  touristTaxTotal: number;
  discountAmount: number;
  deposit: number;
  grandTotal: number;
  averagePerNight: number;
}
