import React, { useEffect, useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { SERVICES_LIST, STUDIO_PROFILE } from '../data/studioData';
import {
  buildWhatsAppBookingUrl,
  calculateEstimatedInvestment,
  generateBookingReference,
  validateBookingForm,
  type BookingFormInput,
  type BookingValidationErrors,
  type ConfirmedBooking,
} from '../utils/bookingLogic';

interface BookingSectionProps {
  prefillServiceId?: string;
  prefillAreaSqFt?: string;
  prefillNotes?: string;
  bookings: ConfirmedBooking[];
  onAddBooking: (booking: ConfirmedBooking) => void;
  onUpdateBookingStatus: (
    bookingId: string,
    status: ConfirmedBooking['status']
  ) => void;
}

const TIME_SLOTS = [
  '10:00 AM – 11:30 AM (Morning Slot)',
  '11:30 AM – 01:00 PM (Pre-Lunch Slot)',
  '02:30 PM – 04:00 PM (Afternoon Slot)',
  '04:30 PM – 06:00 PM (Evening Slot)',
  '06:00 PM – 07:30 PM (After-Office Slot)',
];

const BUDGET_RANGES = [
  '₹1.5L – ₹4L (Bespoke Wallpaper / Single Room)',
  '₹4L – ₹10L (Partial Refurbishment / Kitchen & Bath)',
  '₹10L – ₹25L (Full 2BHK / 3BHK Renovation)',
  '₹25L+ (Luxury Duplex / Commercial Turnkey)',
];

export const BookingSection: React.FC<BookingSectionProps> = ({
  prefillServiceId,
  prefillAreaSqFt,
  prefillNotes,
  bookings,
  onAddBooking,
  onUpdateBookingStatus,
}) => {
  const [formState, setFormState] = useState<BookingFormInput>({
    clientName: '',
    phone: '',
    email: '',
    serviceId: prefillServiceId || 'bespoke-wallpaper',
    propertyLocation: '',
    propertyAreaSqFt: prefillAreaSqFt || '950',
    preferredDate: '2026-11-24',
    preferredTimeSlot: TIME_SLOTS[0],
    budgetRange: BUDGET_RANGES[1],
    projectNotes: prefillNotes || '',
  });

  const [errors, setErrors] = useState<BookingValidationErrors>({});
  const [lastSubmitted, setLastSubmitted] = useState<{
    booking: ConfirmedBooking;
    whatsappUrl: string;
  } | null>(null);

  useEffect(() => {
    if (prefillServiceId || prefillAreaSqFt || prefillNotes) {
      setFormState((prev) => ({
        ...prev,
        serviceId: prefillServiceId || prev.serviceId,
        propertyAreaSqFt: prefillAreaSqFt || prev.propertyAreaSqFt,
        projectNotes: prefillNotes || prev.projectNotes,
      }));
    }
  }, [prefillServiceId, prefillAreaSqFt, prefillNotes]);

  const handleFieldChange = (
    field: keyof BookingFormInput,
    value: string
  ) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof BookingValidationErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof BookingValidationErrors];
        return next;
      });
    }
  };

  const activeServiceObj =
    SERVICES_LIST.find((s) => s.id === formState.serviceId) || SERVICES_LIST[0];

  const liveEstimate = calculateEstimatedInvestment(
    formState.serviceId,
    formState.propertyAreaSqFt
  );

  const liveWhatsAppUrl = buildWhatsAppBookingUrl(
    formState,
    activeServiceObj.title,
    undefined,
    liveEstimate.formattedRange
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateBookingForm(formState);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLastSubmitted(null);
      return;
    }

    setErrors({});
    const estimate = calculateEstimatedInvestment(
      formState.serviceId,
      formState.propertyAreaSqFt
    );
    const referenceCode = generateBookingReference(
      formState.clientName,
      formState.preferredDate,
      bookings.length + 1
    );

    const newBooking: ConfirmedBooking = {
      ...formState,
      id: `bk-${Date.now()}`,
      referenceCode,
      createdAt: 'Redirected to WhatsApp · Studio & On-Site Consultation',
      estimatedInvestmentInr: estimate.formattedRange,
      status: 'Confirmed',
    };

    const whatsappRedirectUrl = buildWhatsAppBookingUrl(
      formState,
      activeServiceObj.title,
      referenceCode,
      estimate.formattedRange
    );

    onAddBooking(newBooking);
    setLastSubmitted({
      booking: newBooking,
      whatsappUrl: whatsappRedirectUrl,
    });

    // Trigger anchor-based WhatsApp redirection without window.open
    const anchor = document.createElement('a');
    anchor.href = whatsappRedirectUrl;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    setFormState((prev) => ({
      ...prev,
      clientName: '',
      phone: '',
      email: '',
      propertyLocation: '',
      projectNotes: '',
    }));
  };

  return (
    <section
      id="booking"
      aria-labelledby="booking-heading"
      className="scroll-mt-20 py-16 md:py-24 bg-[#FAF8F5] border-b border-[#E6E0D6]"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left 7 Columns: WhatsApp Appointment Booking Form */}
          <div className="lg:col-span-7 bg-white border border-[#E6E0D6] rounded-2xl p-6 md:p-10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-2">
                <p className="text-xs font-medium text-[#9A6B3E]">
                  Instant WhatsApp Appointment Desk · {STUDIO_PROFILE.phoneDisplay}
                </p>
                <h2
                  id="booking-heading"
                  className="font-serif-display text-3xl md:text-4xl font-semibold text-[#181615] tracking-tight"
                >
                  Book Your Appointment via WhatsApp
                </h2>
                <p className="text-sm text-[#57504A] leading-relaxed">
                  Complete your project details below to automatically format and redirect your appointment request directly to Roshan Group’s official WhatsApp desk ({STUDIO_PROFILE.phoneDisplay}) at Uni Design House, Seepz.
                </p>
              </div>

              <a
                href={liveWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#181615] bg-[#EFEAE2] hover:bg-[#E2D9CC] rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#9A6B3E]" />
                <span>Direct WhatsApp Chat</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {lastSubmitted && (
              <div
                role="status"
                aria-live="polite"
                className="p-5 rounded-xl bg-[#F2ECE4] border border-[#9A6B3E] space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-[#181615] flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#9A6B3E] shrink-0" />
                    <span>
                      Appointment Redirected to WhatsApp · Ref{' '}
                      {lastSubmitted.booking.referenceCode}
                    </span>
                  </p>
                  <span className="font-mono-tabular text-xs font-semibold text-[#9A6B3E]">
                    Est. {lastSubmitted.booking.estimatedInvestmentInr}
                  </span>
                </div>
                <p className="text-xs text-[#4A433E]">
                  Your pre-filled consultation request for{' '}
                  <strong>{lastSubmitted.booking.propertyLocation}</strong> on{' '}
                  <strong>{lastSubmitted.booking.preferredDate}</strong> (
                  {lastSubmitted.booking.preferredTimeSlot}) has been prepared for{' '}
                  <strong>{STUDIO_PROFILE.phoneDisplay}</strong>.
                </p>
                <div className="pt-1 flex flex-wrap items-center gap-3">
                  <a
                    href={lastSubmitted.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#FAF8F5] bg-[#181615] rounded-lg hover:bg-[#9A6B3E] transition-colors whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Open Appointment in WhatsApp Now</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="booking-client-name"
                    className="block text-xs font-semibold text-[#181615]"
                  >
                    Full Name *
                  </label>
                  <input
                    id="booking-client-name"
                    type="text"
                    value={formState.clientName}
                    onChange={(e) =>
                      handleFieldChange('clientName', e.target.value)
                    }
                    placeholder="e.g., Vikram Malhotra"
                    aria-invalid={Boolean(errors.clientName)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#DED7CC] rounded-lg text-[#181615] focus:outline-none focus:border-[#9A6B3E]"
                  />
                  {errors.clientName && (
                    <p role="alert" className="text-xs text-[#B91C1C]">
                      {errors.clientName}
                    </p>
                  )}
                </div>

                {/* Phone / WhatsApp */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="booking-phone"
                    className="block text-xs font-semibold text-[#181615]"
                  >
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    id="booking-phone"
                    type="tel"
                    value={formState.phone}
                    onChange={(e) => handleFieldChange('phone', e.target.value)}
                    placeholder="e.g., 98202 62649"
                    aria-invalid={Boolean(errors.phone)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#DED7CC] rounded-lg text-[#181615] font-mono-tabular focus:outline-none focus:border-[#9A6B3E]"
                  />
                  {errors.phone && (
                    <p role="alert" className="text-xs text-[#B91C1C]">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Email Address */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="booking-email"
                    className="block text-xs font-semibold text-[#181615]"
                  >
                    Email Address *
                  </label>
                  <input
                    id="booking-email"
                    type="email"
                    value={formState.email}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    placeholder="vikram@example.com"
                    aria-invalid={Boolean(errors.email)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#DED7CC] rounded-lg text-[#181615] focus:outline-none focus:border-[#9A6B3E]"
                  />
                  {errors.email && (
                    <p role="alert" className="text-xs text-[#B91C1C]">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Service Required */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="booking-service"
                    className="block text-xs font-semibold text-[#181615]"
                  >
                    Service Discipline *
                  </label>
                  <select
                    id="booking-service"
                    value={formState.serviceId}
                    onChange={(e) =>
                      handleFieldChange('serviceId', e.target.value)
                    }
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#DED7CC] rounded-lg text-[#181615] focus:outline-none focus:border-[#9A6B3E]"
                  >
                    {SERVICES_LIST.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.indexNumber}. {service.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Property Location in Mumbai */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="booking-location"
                    className="block text-xs font-semibold text-[#181615]"
                  >
                    Property Neighbourhood / Location *
                  </label>
                  <input
                    id="booking-location"
                    type="text"
                    value={formState.propertyLocation}
                    onChange={(e) =>
                      handleFieldChange('propertyLocation', e.target.value)
                    }
                    placeholder="e.g., Seepz, Andheri East / Powai / Juhu"
                    aria-invalid={Boolean(errors.propertyLocation)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#DED7CC] rounded-lg text-[#181615] focus:outline-none focus:border-[#9A6B3E]"
                  />
                  {errors.propertyLocation && (
                    <p role="alert" className="text-xs text-[#B91C1C]">
                      {errors.propertyLocation}
                    </p>
                  )}
                </div>

                {/* Property Carpet Area */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="booking-area"
                    className="block text-xs font-semibold text-[#181615]"
                  >
                    Approximate Carpet Area (sq. ft.) *
                  </label>
                  <input
                    id="booking-area"
                    type="number"
                    min={50}
                    max={50000}
                    value={formState.propertyAreaSqFt}
                    onChange={(e) =>
                      handleFieldChange('propertyAreaSqFt', e.target.value)
                    }
                    aria-invalid={Boolean(errors.propertyAreaSqFt)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#DED7CC] rounded-lg text-[#181615] font-mono-tabular focus:outline-none focus:border-[#9A6B3E]"
                  />
                  {errors.propertyAreaSqFt && (
                    <p role="alert" className="text-xs text-[#B91C1C]">
                      {errors.propertyAreaSqFt}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Preferred Date */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="booking-date"
                    className="block text-xs font-semibold text-[#181615]"
                  >
                    Preferred Consultation Date *
                  </label>
                  <input
                    id="booking-date"
                    type="date"
                    value={formState.preferredDate}
                    onChange={(e) =>
                      handleFieldChange('preferredDate', e.target.value)
                    }
                    aria-invalid={Boolean(errors.preferredDate)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#DED7CC] rounded-lg text-[#181615] font-mono-tabular focus:outline-none focus:border-[#9A6B3E]"
                  />
                  {errors.preferredDate && (
                    <p role="alert" className="text-xs text-[#B91C1C]">
                      {errors.preferredDate}
                    </p>
                  )}
                </div>

                {/* Preferred Time Slot */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="booking-time-slot"
                    className="block text-xs font-semibold text-[#181615]"
                  >
                    Preferred Time Window (Mon–Sat) *
                  </label>
                  <select
                    id="booking-time-slot"
                    value={formState.preferredTimeSlot}
                    onChange={(e) =>
                      handleFieldChange('preferredTimeSlot', e.target.value)
                    }
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#DED7CC] rounded-lg text-[#181615] focus:outline-none focus:border-[#9A6B3E]"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Budget Range */}
              <div className="space-y-1.5">
                <label
                  htmlFor="booking-budget"
                  className="block text-xs font-semibold text-[#181615]"
                >
                  Planned Budget Bracket
                </label>
                <select
                  id="booking-budget"
                  value={formState.budgetRange}
                  onChange={(e) =>
                    handleFieldChange('budgetRange', e.target.value)
                  }
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#DED7CC] rounded-lg text-[#181615] focus:outline-none focus:border-[#9A6B3E]"
                >
                  {BUDGET_RANGES.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Project Notes */}
              <div className="space-y-1.5">
                <label
                  htmlFor="booking-notes"
                  className="block text-xs font-semibold text-[#181615]"
                >
                  Project Scope &amp; Design Preferences
                </label>
                <textarea
                  id="booking-notes"
                  rows={3}
                  value={formState.projectNotes}
                  onChange={(e) =>
                    handleFieldChange('projectNotes', e.target.value)
                  }
                  placeholder="Share details on custom wallpaper walls, living room consoles, kitchen/bathroom renovation, or target handover dates..."
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#DED7CC] rounded-lg text-[#181615] focus:outline-none focus:border-[#9A6B3E]"
                />
              </div>

              {/* Live Estimate Footnote & Submit Button */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs text-[#57504A]">
                  <span>Preliminary Studio Estimate: </span>
                  <strong className="font-mono-tabular text-[#181615]">
                    {liveEstimate.formattedRange}
                  </strong>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-[#FAF8F5] bg-[#181615] rounded-lg hover:bg-[#9A6B3E] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Confirm &amp; Redirect to WhatsApp</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right 5 Columns: Live Scheduled Consultations & Studio Desk Info */}
          <div className="lg:col-span-5 space-y-6">
            {/* Scheduled Appointments Panel */}
            <div className="bg-white border border-[#E6E0D6] rounded-2xl p-6 md:p-8 space-y-5">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-medium text-[#9A6B3E]">
                    Studio Appointment Calendar
                  </p>
                  <h3 className="font-serif-display text-2xl font-semibold text-[#181615]">
                    Scheduled Consultations ({bookings.length})
                  </h3>
                </div>
              </div>

              <div className="space-y-4">
                {bookings.map((item) => {
                  const serviceObj = SERVICES_LIST.find(
                    (s) => s.id === item.serviceId
                  );
                  const cardWhatsAppUrl = buildWhatsAppBookingUrl(
                    item,
                    serviceObj ? serviceObj.title : item.serviceId,
                    item.referenceCode,
                    item.estimatedInvestmentInr
                  );
                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E6E0D6] space-y-2.5"
                    >
                      <div className="flex items-center justify-between gap-2 text-xs">
                        <span className="font-mono-tabular font-semibold text-[#9A6B3E]">
                          {item.referenceCode}
                        </span>
                        <span className="font-medium text-[#181615]">
                          Status: {item.status}
                        </span>
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-[#181615]">
                          {item.clientName} · {item.propertyLocation}
                        </p>
                        <p className="text-xs text-[#57504A]">
                          {serviceObj ? serviceObj.title : item.serviceId} ·{' '}
                          <span className="font-mono-tabular">
                            {item.propertyAreaSqFt} sq. ft. (Est.{' '}
                            {item.estimatedInvestmentInr})
                          </span>
                        </p>
                      </div>

                      <div className="text-xs text-[#6E655E] flex flex-wrap items-center gap-3 font-mono-tabular">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#9A6B3E]" />
                          {item.preferredDate}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#9A6B3E]" />
                          {item.preferredTimeSlot.split(' (')[0]}
                        </span>
                      </div>

                      {item.projectNotes && (
                        <p className="text-xs text-[#4A433E] italic">
                          “{item.projectNotes}”
                        </p>
                      )}

                      <div className="pt-2 border-t border-[#E6E0D6] flex items-center justify-between gap-3 text-xs">
                        <a
                          href={cardWhatsAppUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-semibold text-[#9A6B3E] hover:text-[#181615] underline underline-offset-4"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Send on WhatsApp</span>
                        </a>

                        {item.status !== 'Cancelled' ? (
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateBookingStatus(item.id, 'Cancelled')
                            }
                            className="text-[#6E655E] hover:text-[#B91C1C] underline underline-offset-4 cursor-pointer"
                          >
                            Cancel Slot
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateBookingStatus(item.id, 'Confirmed')
                            }
                            className="text-[#9A6B3E] hover:text-[#181615] font-semibold underline underline-offset-4 cursor-pointer"
                          >
                            Restore Slot
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Direct Studio Concierge Box */}
            <div className="bg-[#181615] text-[#FAF8F5] rounded-2xl p-6 md:p-8 space-y-4">
              <p className="text-xs text-[#E5C185] font-medium">
                Immediate Project Assistance
              </p>
              <h3 className="font-serif-display text-2xl font-semibold">
                Prefer Direct Phone or WhatsApp?
              </h3>
              <p className="text-xs text-[#D6CEC2] leading-relaxed">
                Share photos or floorplans of your walls or apartment directly on WhatsApp for a same-day swatch recommendation from Uni Design House.
              </p>

              <div className="space-y-2 text-xs text-[#FAF8F5] pt-1">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#E5C185] shrink-0 mt-0.5" />
                  <span>{STUDIO_PROFILE.addressFull}</span>
                </p>
                <p className="flex items-center gap-2 font-mono-tabular">
                  <Phone className="w-4 h-4 text-[#E5C185] shrink-0" />
                  <span>{STUDIO_PROFILE.phoneDisplay} (Opens 10:00 AM)</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
