import React from 'react';
import { STUDIO_PROFILE } from '../data/studioData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#181615] text-[#FAF8F5] py-14 border-t border-white/10">
      <div className="max-w-[1280px] mx-auto px-6 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 justify-between">
          <div className="md:col-span-5 space-y-3">
            <p className="font-serif-display text-2xl font-semibold text-[#FAF8F5]">
              {STUDIO_PROFILE.name}
            </p>
            <p className="text-xs text-[#C5B8A5] max-w-sm leading-relaxed">
              {STUDIO_PROFILE.tagline}
            </p>
            <p className="text-xs text-[#A39686] pt-1">
              {STUDIO_PROFILE.addressFull}
            </p>
          </div>

          <div className="md:col-span-3 space-y-2.5 text-xs">
            <p className="font-semibold text-[#E5C185]">Studio Navigation</p>
            <ul className="space-y-2 text-[#C5B8A5]">
              <li>
                <a href="#portfolio" className="hover:text-white transition-colors">
                  Portfolio Gallery
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Services &amp; Scope Estimator
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Roshan Sharma &amp; Team
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Google Reviews (4.8 ★)
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-white transition-colors">
                  Book Studio Appointment
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-2.5 text-xs">
            <p className="font-semibold text-[#E5C185]">
              Direct Contact &amp; Hours
            </p>
            <p className="text-[#C5B8A5]">{STUDIO_PROFILE.hoursSummary}</p>
            <p className="text-[#FAF8F5] font-mono-tabular">
              Phone: {STUDIO_PROFILE.phoneDisplay}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href={STUDIO_PROFILE.phoneHref}
                className="text-[#E5C185] hover:underline font-medium"
              >
                Call Studio
              </a>
              <span aria-hidden="true" className="text-white/25">
                ·
              </span>
              <a
                href={STUDIO_PROFILE.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E5C185] hover:underline font-medium"
              >
                WhatsApp Concierge
              </a>
              <span aria-hidden="true" className="text-white/25">
                ·
              </span>
              <a
                href={STUDIO_PROFILE.directionsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E5C185] hover:underline font-medium"
              >
                Seepz Directions
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C8279]">
          <p>
            © {new Date().getFullYear()} Roshan Group · Uni Design House, 74 Techno Park, Seepz, Andheri East, Mumbai 400093. All rights reserved.
          </p>
          <p>Bespoke Wallpaper Decor · Architectural Designs · Full Refurbishment</p>
        </div>
      </div>
    </footer>
  );
};
