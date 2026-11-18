import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterPortfolioItems,
  validateBookingForm,
  calculateEstimatedInvestment,
  generateBookingReference,
  buildWhatsAppBookingUrl,
  type PortfolioItem,
  type BookingFormInput,
} from './bookingLogic';

const samplePortfolio: PortfolioItem[] = [
  {
    id: 'p1',
    title: 'Aurelia Botanical Gold Lounge',
    category: 'Bespoke Wallpaper',
    location: 'Andheri East, Mumbai',
    areaSqFt: 850,
    durationWeeks: 3,
    completionYear: '2026',
    imageUrl: '/assets/portfolio/roshan-botanical-gold-lounge.png',
    summary: 'Custom gold-leaf geometric and botanical mural installation.',
    clientBrief: 'Create a dramatic statement wall.',
    designExecution: 'Hand-applied metallic leaf frames over charcoal acoustic vinyl.',
    materialsUsed: ['Metallic Gold Leaf', 'Acoustic Charcoal Vinyl'],
    quantifiedOutcome: 'Completed in 18 days with 10-year peel warranty',
  },
  {
    id: 'p2',
    title: 'Chevron Walnut & Onyx Suite',
    category: 'Full Renovation',
    location: 'Powai, Mumbai',
    areaSqFt: 1650,
    durationWeeks: 10,
    completionYear: '2026',
    imageUrl: '/assets/portfolio/roshan-walnut-marble-console.png',
    summary: 'Full living room refurbishment with bookmatched walnut paneling.',
    clientBrief: 'Warm contemporary living room.',
    designExecution: 'Custom walnut chevron veneer and backlit alabaster.',
    materialsUsed: ['American Walnut Veneer', 'Italian Travertine'],
    quantifiedOutcome: '+28% concealed storage capacity',
  },
];

test('filterPortfolioItems filters by category and search query accurately', () => {
  const all = filterPortfolioItems(samplePortfolio, 'All Projects');
  assert.equal(all.length, 2);

  const wallpaperOnly = filterPortfolioItems(samplePortfolio, 'Bespoke Wallpaper');
  assert.equal(wallpaperOnly.length, 1);
  assert.equal(wallpaperOnly[0].id, 'p1');

  const searchByMaterial = filterPortfolioItems(samplePortfolio, 'All Projects', 'travertine');
  assert.equal(searchByMaterial.length, 1);
  assert.equal(searchByMaterial[0].id, 'p2');
});

test('validateBookingForm catches missing and invalid fields without silent fallbacks', () => {
  const emptyForm: BookingFormInput = {
    clientName: '',
    phone: '123',
    email: 'invalid-email',
    serviceId: '',
    propertyLocation: '',
    propertyAreaSqFt: '10',
    preferredDate: '',
    preferredTimeSlot: '',
    budgetRange: '₹5L – ₹15L',
    projectNotes: '',
  };

  const errors = validateBookingForm(emptyForm);
  assert.ok(errors.clientName);
  assert.ok(errors.phone);
  assert.ok(errors.email);
  assert.ok(errors.serviceId);
  assert.ok(errors.propertyLocation);
  assert.ok(errors.propertyAreaSqFt);
  assert.ok(errors.preferredDate);
  assert.ok(errors.preferredTimeSlot);

  const validForm: BookingFormInput = {
    clientName: 'Vikram Malhotra',
    phone: '098202 62649',
    email: 'vikram.malhotra@example.com',
    serviceId: 'bespoke-wallpaper',
    propertyLocation: 'Seepz, Andheri East, Mumbai',
    propertyAreaSqFt: '1200',
    preferredDate: '2026-11-24',
    preferredTimeSlot: '11:00 AM – 12:30 PM',
    budgetRange: '₹5L – ₹15L',
    projectNotes: 'Looking for custom botanical wallpaper and walnut TV unit.',
  };

  const validErrors = validateBookingForm(validForm);
  assert.equal(Object.keys(validErrors).length, 0);
});

test('calculateEstimatedInvestment computes deterministic INR Lakh ranges', () => {
  const wallpaperEstimate = calculateEstimatedInvestment('bespoke-wallpaper', 1000);
  assert.equal(wallpaperEstimate.minLakhs, 2.8);
  assert.equal(wallpaperEstimate.maxLakhs, 6.2);
  assert.equal(wallpaperEstimate.formattedRange, '₹2.8L – ₹6.2L');
});

test('generateBookingReference produces deterministic studio booking code', () => {
  const code = generateBookingReference('Aditya Waghmare', '2026-11-28', 3);
  assert.equal(code, 'RG-1128-AW03');
});

test('buildWhatsAppBookingUrl generates valid wa.me redirect URL with encoded appointment details', () => {
  const url = buildWhatsAppBookingUrl(
    {
      clientName: 'Aditya Waghmare',
      phone: '9820262649',
      email: 'aditya@example.com',
      serviceId: 'bespoke-wallpaper',
      propertyLocation: 'Andheri East, Mumbai',
      propertyAreaSqFt: '950',
      preferredDate: '2026-11-24',
      preferredTimeSlot: '10:00 AM – 11:30 AM (Morning Slot)',
      budgetRange: '₹4L – ₹10L',
      projectNotes: 'Botanical gold wall',
    },
    'Bespoke Wallpaper & Architectural Wall Decor',
    'RG-1124-AW02',
    '₹2.7L – ₹5.9L'
  );
  assert.ok(url.startsWith('https://wa.me/919820262649?text='));
  const decoded = decodeURIComponent(url.split('?text=')[1]);
  assert.ok(decoded.includes('RG-1124-AW02'));
  assert.ok(decoded.includes('Aditya Waghmare'));
  assert.ok(decoded.includes('Andheri East, Mumbai'));
});

