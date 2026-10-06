import React, { useState } from 'react';
import { X, Send, Mail, CheckCircle2, User, Phone, MessageSquare } from 'lucide-react';
import { ApartmentInfo, BookingInquiry } from '../types';
import { formatDateGerman } from '../utils/ical';
import { buildMailtoInquiry } from '../utils/pricing';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  checkIn: string;
  checkOut: string;
  totalEstimatedPrice: number;
  apartment: ApartmentInfo;
  onSubmitInquiry: (inquiry: Omit<BookingInquiry, 'id' | 'createdAt' | 'status'>) => void;
}

export function BookingModal({
  isOpen,
  onClose,
  checkIn,
  checkOut,
  totalEstimatedPrice,
  apartment,
  onSubmitInquiry
}: BookingModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  // Calculate nights
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const nights = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 3600 * 24)));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    // Save in local state
    onSubmitInquiry({
      checkIn,
      checkOut,
      nights,
      guestsAdults: adults,
      guestsChildren: childrenCount,
      guestName: name,
      guestEmail: email,
      guestPhone: phone,
      message,
      totalEstimatedPrice
    });

    // Also trigger mailto so user's email client prepares message to host
    const mailtoUrl = buildMailtoInquiry({
      hostEmail: apartment.host.email,
      apartmentName: apartment.name,
      checkIn: formatDateGerman(checkIn),
      checkOut: formatDateGerman(checkOut),
      nights,
      guestsAdults: adults,
      guestsChildren: childrenCount,
      guestName: name,
      guestEmail: email,
      guestPhone: phone,
      message,
      estimatedPrice: totalEstimatedPrice
    });

    // Try to open mailto in window
    window.location.href = mailtoUrl;

    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-stone-200 overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-stone-50 border-b border-stone-200 flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-xl text-stone-900">
              Unverbindliche Buchungsanfrage
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              Direkt an {apartment.host.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-stone-200 text-stone-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-display text-2xl font-bold text-stone-900">
              Vielen Dank für Ihre Anfrage!
            </h4>
            <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
              Ihre Anfrage für den Zeitraum <strong>{formatDateGerman(checkIn)} bis {formatDateGerman(checkOut)}</strong> wurde erfasst und Ihr E-Mail-Programm wurde mit allen Daten vorbereitet.
            </p>
            <p className="text-xs text-stone-500">
              Die Gastgeber ({apartment.host.name}) melden sich innerhalb kürzester Zeit mit der Reservierungsbestätigung.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 rounded-lg bg-stone-900 text-white font-semibold text-sm hover:bg-stone-800 transition-colors"
            >
              Schließen
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Summary strip */}
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-stone-900 block">
                  {formatDateGerman(checkIn)} – {formatDateGerman(checkOut)}
                </span>
                <span className="text-stone-600">{nights} {nights === 1 ? 'Nacht' : 'Nächte'}</span>
              </div>
              <div className="text-right">
                <span className="text-2xs text-stone-500 uppercase tracking-wider block">Richtpreis</span>
                <span className="text-base font-bold font-display text-amber-900">{totalEstimatedPrice.toFixed(2)} €</span>
              </div>
            </div>

            {/* Guest counts */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-2xs font-semibold text-stone-600 uppercase block mb-1">Erwachsene</label>
                <select
                  value={adults}
                  onChange={e => setAdults(Number(e.target.value))}
                  className="w-full text-sm border border-stone-300 rounded-lg p-2.5 bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-800/20"
                >
                  {[1, 2, 3, 4].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Erwachsener' : 'Erwachsene'}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-2xs font-semibold text-stone-600 uppercase block mb-1">Kinder (0-17 J.)</label>
                <select
                  value={childrenCount}
                  onChange={e => setChildrenCount(Number(e.target.value))}
                  className="w-full text-sm border border-stone-300 rounded-lg p-2.5 bg-white text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-800/20"
                >
                  {[0, 1, 2, 3].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'Kind' : 'Kinder'}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="text-2xs font-semibold text-stone-600 uppercase block mb-1">Vollständiger Name *</label>
              <div className="relative">
                <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="z.B. Sabine Mustermann"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full text-sm border border-stone-300 rounded-lg py-2.5 pl-9 pr-3 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-800/20"
                />
              </div>
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-2xs font-semibold text-stone-600 uppercase block mb-1">E-Mail-Adresse *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="name@beispiel.de"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full text-sm border border-stone-300 rounded-lg py-2.5 pl-9 pr-3 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-800/20"
                  />
                </div>
              </div>

              <div>
                <label className="text-2xs font-semibold text-stone-600 uppercase block mb-1">Telefonnummer</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    placeholder="+49 170 1234567"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full text-sm border border-stone-300 rounded-lg py-2.5 pl-9 pr-3 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-800/20"
                  />
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="text-2xs font-semibold text-stone-600 uppercase block mb-1">Nachricht / Besondere Wünsche (optional)</label>
              <div className="relative">
                <MessageSquare className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <textarea
                  rows={3}
                  placeholder="z.B. Anreisezeit ca. 16 Uhr, Babybett gewünscht..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="w-full text-sm border border-stone-300 rounded-lg py-2 pl-9 pr-3 text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-800/20"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all hover:shadow active:scale-99"
              >
                <Send className="w-4 h-4" />
                <span>Anfrage jetzt absenden</span>
              </button>
              <div className="text-center text-2xs text-stone-400 mt-2">
                Ihre Daten werden vertraulich behandelt und ausschließlich zur Abwicklung dieser Buchungsanfrage verwendet.
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
