export type ProjectCategory =
  | 'All Projects'
  | 'Bespoke Wallpaper'
  | 'Full Renovation'
  | 'Bathrooms & Kitchens'
  | 'Architectural Design';

export interface PortfolioItem {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'All Projects'>;
  location: string;
  areaSqFt: number;
  durationWeeks: number;
  completionYear: string;
  featuredSpan?: 'wide' | 'tall' | 'standard';
  imageUrl: string;
  summary: string;
  clientBrief: string;
  designExecution: string;
  materialsUsed: string[];
  quantifiedOutcome: string;
}

export interface BookingFormInput {
  clientName: string;
  phone: string;
  email: string;
  serviceId: string;
  propertyLocation: string;
  propertyAreaSqFt: string;
  preferredDate: string;
  preferredTimeSlot: string;
  budgetRange: string;
  projectNotes: string;
}

export interface BookingValidationErrors {
  clientName?: string;
  phone?: string;
  email?: string;
  serviceId?: string;
  propertyLocation?: string;
  propertyAreaSqFt?: string;
  preferredDate?: string;
  preferredTimeSlot?: string;
}

export interface ConfirmedBooking extends BookingFormInput {
  id: string;
  referenceCode: string;
  createdAt: string;
  estimatedInvestmentInr: string;
  status: 'Confirmed' | 'Rescheduled' | 'Cancelled';
}

export function filterPortfolioItems(
  items: PortfolioItem[],
  category: ProjectCategory,
  searchQuery: string = ''
): PortfolioItem[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  return items.filter((item) => {
    const matchesCategory =
      category === 'All Projects' || item.category === category;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    return (
      item.title.toLowerCase().includes(normalizedQuery) ||
      item.location.toLowerCase().includes(normalizedQuery) ||
      item.summary.toLowerCase().includes(normalizedQuery) ||
      item.materialsUsed.some((m) => m.toLowerCase().includes(normalizedQuery))
    );
  });
}

export function validateBookingForm(
  input: BookingFormInput
): BookingValidationErrors {
  const errors: BookingValidationErrors = {};

  const trimmedName = input.clientName.trim();
  if (!trimmedName) {
    errors.clientName = 'Please enter your full name.';
  } else if (trimmedName.length < 2) {
    errors.clientName = 'Name must be at least 2 characters.';
  }

  const digitsOnly = input.phone.replace(/\D/g, '');
  if (!digitsOnly) {
    errors.phone = 'Please enter a contact phone or WhatsApp number.';
  } else if (digitsOnly.length < 10 || digitsOnly.length > 13) {
    errors.phone = 'Enter a valid 10-digit Indian mobile number.';
  }

  const trimmedEmail = input.email.trim();
  if (!trimmedEmail) {
    errors.email = 'Please enter your email address for booking confirmation.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!input.serviceId.trim()) {
    errors.serviceId = 'Please select a primary design service.';
  }

  if (!input.propertyLocation.trim()) {
    errors.propertyLocation = 'Please specify your neighbourhood or site location.';
  }

  const areaNum = Number(input.propertyAreaSqFt);
  if (!input.propertyAreaSqFt.trim()) {
    errors.propertyAreaSqFt = 'Please enter approximate carpet area in sq. ft.';
  } else if (Number.isNaN(areaNum) || areaNum < 50 || areaNum > 50000) {
    errors.propertyAreaSqFt = 'Enter a valid carpet area between 50 and 50,000 sq. ft.';
  }

  if (!input.preferredDate.trim()) {
    errors.preferredDate = 'Please select a preferred consultation date.';
  }

  if (!input.preferredTimeSlot.trim()) {
    errors.preferredTimeSlot = 'Please choose a preferred consultation time slot.';
  }

  return errors;
}

export function calculateEstimatedInvestment(
  serviceId: string,
  areaSqFtInput: string | number
): { minLakhs: number; maxLakhs: number; formattedRange: string } {
  const area = Math.max(100, Number(areaSqFtInput) || 650);

  // Rates in INR per sq. ft. based on Mumbai interior design standards
  const ratePerSqFtMap: Record<string, [number, number]> = {
    'bespoke-wallpaper': [280, 620],
    'full-refurbishment': [2200, 3800],
    'architectural-design': [1600, 2900],
    'bathrooms-kitchens': [1400, 2500],
    'bespoke-furniture': [1100, 2100],
  };

  const [minRate, maxRate] = ratePerSqFtMap[serviceId] || [1500, 2600];
  const minTotal = area * minRate;
  const maxTotal = area * maxRate;

  const minLakhs = Math.max(0.45, Math.round((minTotal / 100000) * 10) / 10);
  const maxLakhs = Math.max(0.85, Math.round((maxTotal / 100000) * 10) / 10);

  return {
    minLakhs,
    maxLakhs,
    formattedRange: `₹${minLakhs.toFixed(1)}L – ₹${maxLakhs.toFixed(1)}L`,
  };
}

export function generateBookingReference(
  clientName: string,
  preferredDate: string,
  sequenceIndex: number = 1
): string {
  const initials =
    clientName
      .trim()
      .split(/\s+/)
      .map((part) => part[0]?.toUpperCase() || '')
      .join('')
      .slice(0, 2) || 'RG';
  const dateCompact = preferredDate.replace(/\D/g, '').slice(-4) || '1117';
  const seq = String(sequenceIndex).padStart(2, '0');
  return `RG-${dateCompact}-${initials}${seq}`;
}

export function buildWhatsAppBookingUrl(
  input: BookingFormInput,
  serviceTitle: string,
  referenceCode?: string,
  estimatedRange?: string
): string {
  const lines = [
    'Hello Roshan Group (Uni Design House, Seepz),',
    referenceCode
      ? `I would like to confirm my interior design appointment (Ref: ${referenceCode}).`
      : 'I would like to book an interior design consultation.',
    '',
    `• Name: ${input.clientName.trim() || 'Prospective Client'}`,
    `• Phone: ${input.phone.trim() || 'Not specified'}`,
    `• Email: ${input.email.trim() || 'Not specified'}`,
    `• Service: ${serviceTitle}`,
    `• Location: ${input.propertyLocation.trim() || 'Mumbai'}`,
    `• Carpet Area: ${input.propertyAreaSqFt.trim() || '950'} sq. ft.`,
    `• Preferred Date: ${input.preferredDate || 'Flexible'}`,
    `• Time Slot: ${input.preferredTimeSlot || 'Morning Slot'}`,
    `• Budget Bracket: ${input.budgetRange}`,
  ];

  if (estimatedRange) {
    lines.push(`• Studio Estimate: ${estimatedRange}`);
  }
  if (input.projectNotes.trim()) {
    lines.push(`• Project Notes: ${input.projectNotes.trim()}`);
  }

  const encodedText = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/919820262649?text=${encodedText}`;
}

