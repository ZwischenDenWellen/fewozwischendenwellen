import { ApartmentInfo, PriceCalculation } from '../types';

/**
 * Checks whether a date falls into high season (e.g., June, July, August, or Christmas/New Year).
 */
export function isHighSeason(isoDate: string): boolean {
  if (!isoDate) return false;
  const parts = isoDate.split('-');
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  // Summer high season: June (6), July (7), August (8)
  if (month >= 6 && month <= 8) return true;

  // Christmas / New Year: 20. Dec - 06. Jan
  if (month === 12 && day >= 20) return true;
  if (month === 1 && day <= 6) return true;

  // Easter week estimate (mid April)
  if (month === 4 && day >= 10 && day <= 25) return true;

  return false;
}

/**
 * Calculates complete pricing breakdown for a stay.
 */
export function calculateStayPricing(
  checkIn: string,
  checkOut: string,
  guestsAdults: number,
  apartment: ApartmentInfo
): PriceCalculation | null {
  if (!checkIn || !checkOut || checkIn >= checkOut) {
    return null;
  }

  const startDate = new Date(checkIn);
  const endDate = new Date(checkOut);
  const diffTime = endDate.getTime() - startDate.getTime();
  const nights = Math.round(diffTime / (1000 * 3600 * 24));

  if (nights <= 0) return null;

  let standardNights = 0;
  let highSeasonNights = 0;

  // Iterate over each night
  const current = new Date(startDate);
  for (let i = 0; i < nights; i++) {
    const curIso = current.toISOString().split('T')[0];
    if (isHighSeason(curIso)) {
      highSeasonNights++;
    } else {
      standardNights++;
    }
    current.setDate(current.getDate() + 1);
  }

  const standardTotal = standardNights * apartment.pricing.basePricePerNight;
  const highSeasonTotal = highSeasonNights * apartment.pricing.highSeasonPricePerNight;
  const baseTotal = standardTotal + highSeasonTotal;

  // Discount for long stays (e.g. >= 7 nights)
  let discountAmount = 0;
  if (nights >= 7 && apartment.pricing.discountWeekPercent) {
    discountAmount = Math.round(baseTotal * (apartment.pricing.discountWeekPercent / 100));
  }

  // Tourist tax (Kurabgabe) per adult per night
  const touristTaxTotal = Math.round(nights * guestsAdults * apartment.pricing.touristTaxPerAdultPerNight * 100) / 100;

  const cleaningFee = apartment.pricing.cleaningFee;
  const deposit = apartment.pricing.deposit;

  const grandTotal = baseTotal - discountAmount + cleaningFee + touristTaxTotal;
  const averagePerNight = Math.round((baseTotal - discountAmount) / nights);

  return {
    nights,
    standardNights,
    highSeasonNights,
    baseTotal,
    cleaningFee,
    touristTaxTotal,
    discountAmount,
    deposit,
    grandTotal,
    averagePerNight
  };
}

/**
 * Builds a ready-to-send pre-formatted mailto link for direct booking inquiries.
 */
export function buildMailtoInquiry(params: {
  hostEmail: string;
  apartmentName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guestsAdults: number;
  guestsChildren: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  message?: string;
  estimatedPrice: number;
}): string {
  const subject = encodeURIComponent(`Buchungsanfrage: ${params.apartmentName} (${params.checkIn} bis ${params.checkOut})`);
  
  const bodyText = `Guten Tag Familie Harms,

ich interessiere mich für Ihre Ferienwohnung "${params.apartmentName}" in Oldenburg in Holstein und möchte gerne für folgenden Zeitraum anfragen:

- Zeitraum: ${params.checkIn} bis ${params.checkOut} (${params.nights} Nächte)
- Gäste: ${params.guestsAdults} Erwachsene${params.guestsChildren > 0 ? `, ${params.guestsChildren} Kinder` : ''}
- Errechneter Richtpreis: ca. ${params.estimatedPrice.toFixed(2)} €

Meine Kontaktdaten:
- Name: ${params.guestName}
- E-Mail: ${params.guestEmail}
- Telefon: ${params.guestPhone || '–'}

Nachricht / Wünsche:
${params.message || 'Wir freuen uns auf Ihre Rückmeldung zur Verfügbarkeit.'}

Herzliche Grüße,
${params.guestName}
`;

  return `mailto:${encodeURIComponent(params.hostEmail)}?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
}
