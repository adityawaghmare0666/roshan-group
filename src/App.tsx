/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { ReviewsAndProfileSection } from './components/ReviewsAndProfileSection';
import { BookingSection } from './components/BookingSection';
import { Footer } from './components/Footer';
import { INITIAL_BOOKINGS } from './data/studioData';
import type { ConfirmedBooking, PortfolioItem } from './utils/bookingLogic';

const STORAGE_KEY = 'roshan_group_studio_bookings_v1';

export default function App() {
  const [bookings, setBookings] = useState<ConfirmedBooking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Ignore storage read errors
    }
    return INITIAL_BOOKINGS;
  });

  const [prefillServiceId, setPrefillServiceId] =
    useState<string>('bespoke-wallpaper');
  const [prefillAreaSqFt, setPrefillAreaSqFt] = useState<string>('950');
  const [prefillNotes, setPrefillNotes] = useState<string>('');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    } catch {
      // Ignore storage write errors
    }
  }, [bookings]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectProjectForBooking = (project: PortfolioItem) => {
    const categoryToServiceMap: Record<PortfolioItem['category'], string> = {
      'Bespoke Wallpaper': 'bespoke-wallpaper',
      'Full Renovation': 'full-refurbishment',
      'Bathrooms & Kitchens': 'bathrooms-kitchens',
      'Architectural Design': 'architectural-design',
    };
    setPrefillServiceId(
      categoryToServiceMap[project.category] || 'bespoke-wallpaper'
    );
    setPrefillAreaSqFt(String(project.areaSqFt));
    setPrefillNotes(
      `Inspired by portfolio project "${project.title}" (${project.location}). Interested in similar materials: ${project.materialsUsed.slice(0, 2).join(', ')}.`
    );
    scrollToSection('booking');
  };

  const handleSelectServiceForBooking = (
    serviceId: string,
    areaSqFt: number
  ) => {
    setPrefillServiceId(serviceId);
    setPrefillAreaSqFt(String(areaSqFt));
    setPrefillNotes(
      `Requesting consultation and itemized BOQ for ${areaSqFt} sq. ft. scope.`
    );
    scrollToSection('booking');
  };

  const handleConsultWithSpecialist = (specialistName: string) => {
    setPrefillNotes(
      `Requesting studio consultation with ${specialistName} at Uni Design House, Seepz.`
    );
    scrollToSection('booking');
  };

  const handleAddBooking = (newBooking: ConfirmedBooking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleUpdateBookingStatus = (
    bookingId: string,
    status: ConfirmedBooking['status']
  ) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#181615]">
      <Navbar onNavigateBook={() => scrollToSection('booking')} />

      <main className="flex-1">
        <HeroSection
          onBookClick={() => scrollToSection('booking')}
          onExplorePortfolio={() => scrollToSection('portfolio')}
          onOpenBusinessProfileModal={() => setIsProfileModalOpen(true)}
        />

        <PortfolioSection
          onSelectProjectForBooking={handleSelectProjectForBooking}
        />

        <ServicesSection
          onSelectServiceForBooking={handleSelectServiceForBooking}
        />

        <AboutSection
          onConsultWithSpecialist={handleConsultWithSpecialist}
        />

        <ReviewsAndProfileSection
          isProfileModalOpen={isProfileModalOpen}
          onOpenProfileModal={() => setIsProfileModalOpen(true)}
          onCloseProfileModal={() => setIsProfileModalOpen(false)}
        />

        <BookingSection
          prefillServiceId={prefillServiceId}
          prefillAreaSqFt={prefillAreaSqFt}
          prefillNotes={prefillNotes}
          bookings={bookings}
          onAddBooking={handleAddBooking}
          onUpdateBookingStatus={handleUpdateBookingStatus}
        />
      </main>

      <Footer />
    </div>
  );
}
