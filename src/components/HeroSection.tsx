import React from 'react';
import { ArrowRight, MapPin, Phone, Star } from 'lucide-react';
import { STUDIO_PROFILE } from '../data/studioData';

interface HeroSectionProps {
  onBookClick: () => void;
  onExplorePortfolio: () => void;
  onOpenBusinessProfileModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onBookClick,
  onExplorePortfolio,
  onOpenBusinessProfileModal,
}) => {
  return (
    <section id="top" className="pt-8 pb-16 md:pt-14 md:pb-24 border-b border-[#E6E0D6]">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* 2-Column Split Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Editorial Value Proposition */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div className="space-y-6">
              {/* Quiet unboxed metadata kicker */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#6E655E]">
                <span>Uni Design House · Andheri East, Mumbai</span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1 text-[#181615] font-semibold">
                  <Star className="w-3.5 h-3.5 fill-[#9A6B3E] text-[#9A6B3E]" />
                  {STUDIO_PROFILE.googleRating} ({STUDIO_PROFILE.googleReviewCount} Google Reviews)
                </span>
              </div>

              <h1 className="font-serif-display text-[clamp(2.4rem,4.2vw,4rem)] font-semibold leading-[1.08] tracking-tight text-[#181615] text-balance">
                Bespoke Wallpaper Decor &amp; Architectural Home Renovations in Mumbai.
              </h1>

              <p className="text-base md:text-[17px] leading-[1.68] text-[#4A433E] max-w-[62ch]">
                Roshan Group is a full-service interior design practice and custom wall decor atelier at Techno Park, Seepz. From hand-gilded botanical statement walls to turnkey kitchen, bathroom, and whole-home refurbishments, we engineer spaces built for Mumbai living.
              </p>

              {/* Action Row */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onBookClick}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-[#FAF8F5] bg-[#181615] rounded-lg hover:bg-[#9A6B3E] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Schedule Studio Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onExplorePortfolio}
                  className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-[#181615] bg-[#F2ECE4] hover:bg-[#E6DDD0] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Explore Portfolio Gallery</span>
                </button>
              </div>
            </div>

            {/* Direct Studio Contact & Address Proof */}
            <div className="mt-10 pt-6 border-t border-[#E6E0D6] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#57504A]">
              <div className="space-y-1">
                <p className="font-semibold text-[#181615] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#9A6B3E] shrink-0" />
                  <span>{STUDIO_PROFILE.addressShort}</span>
                </p>
                <p className="text-[#6E655E] pl-5">
                  {STUDIO_PROFILE.hoursSummary} · Direct Line:{' '}
                  <a
                    href={STUDIO_PROFILE.phoneHref}
                    className="font-mono-tabular text-[#181615] font-medium underline hover:text-[#9A6B3E]"
                  >
                    {STUDIO_PROFILE.phoneDisplay}
                  </a>
                </p>
              </div>

              <button
                type="button"
                onClick={onOpenBusinessProfileModal}
                className="text-left sm:text-right text-xs font-semibold text-[#9A6B3E] hover:text-[#181615] underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
              >
                View Verified Business Profile
              </button>
            </div>
          </div>

          {/* Right Column: High-Impact Visual Composition from Real Client Works */}
          <div className="lg:col-span-6 grid grid-cols-12 gap-4 items-stretch min-h-[420px] lg:min-h-[520px]">
            {/* Primary Showcase Card (Real Botanical & Brass Frame Living Room) */}
            <div className="col-span-8 relative rounded-2xl overflow-hidden border border-[#E6E0D6] bg-[#181615] flex flex-col justify-end">
              <img
                src="/assets/portfolio/roshan-botanical-gold-lounge.png"
                alt="Roshan Group signature black and gold botanical wall decor with contemporary charcoal sofa"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="relative z-10 p-5 bg-gradient-to-t from-black/85 via-black/45 to-transparent text-[#FAF8F5]">
                <p className="text-[11px] text-[#E5C185] font-medium">
                  Bespoke Wall Decor · Andheri East
                </p>
                <p className="font-serif-display text-xl font-semibold mt-0.5">
                  Aurelia 3D Brass &amp; Botanical Lounge
                </p>
              </div>
            </div>

            {/* Secondary Stacked Showcase Column (Real Cobalt Wall & Walnut Console) */}
            <div className="col-span-4 flex flex-col gap-4">
              <div className="relative flex-1 rounded-2xl overflow-hidden border border-[#E6E0D6] bg-[#1C2536] min-h-[190px] flex flex-col justify-end">
                <img
                  src="/assets/portfolio/roshan-cobalt-damask-wall.png"
                  alt="Roshan Group royal blue textured damask wallpaper installation"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-10 p-3.5 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-[#FAF8F5]">
                  <p className="text-[11px] text-[#E5C185]">Custom Wallpaper</p>
                  <p className="font-serif-display text-sm font-semibold leading-snug">
                    Sapphire Silk Wall Atelier
                  </p>
                </div>
              </div>

              <div className="relative flex-1 rounded-2xl overflow-hidden border border-[#E6E0D6] bg-[#241B15] min-h-[190px] flex flex-col justify-end">
                <img
                  src="/assets/portfolio/roshan-walnut-marble-console.png"
                  alt="Roshan Group walnut chevron paneling and backlit marble console"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-10 p-3.5 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-[#FAF8F5]">
                  <p className="text-[11px] text-[#E5C185]">Turnkey Millwork</p>
                  <p className="font-serif-display text-sm font-semibold leading-snug">
                    Walnut &amp; Onyx Media Suite
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Metric & Credential Strip Below Hero Split */}
        <div className="mt-12 pt-8 border-t border-[#E6E0D6] grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div>
            <p className="font-mono-tabular text-2xl md:text-3xl font-semibold text-[#181615]">
              4.8 ★ / 5.0
            </p>
            <p className="text-xs text-[#57504A] mt-1">
              Verified across 106 client reviews on Google Business Profile
            </p>
          </div>

          <div>
            <p className="font-mono-tabular text-2xl md:text-3xl font-semibold text-[#181615]">
              380+ Projects
            </p>
            <p className="text-xs text-[#57504A] mt-1">
              Delivered across Andheri, Powai, Juhu, Bandra &amp; Lower Parel
            </p>
          </div>

          <div>
            <p className="font-mono-tabular text-2xl md:text-3xl font-semibold text-[#181615]">
              48-Hr Install
            </p>
            <p className="text-xs text-[#57504A] mt-1">
              Dust-free custom wallpaper &amp; acoustic wall panel installation
            </p>
          </div>

          <div className="flex flex-col justify-between">
            <p className="font-mono-tabular text-2xl md:text-3xl font-semibold text-[#181615]">
              10-Yr Warranty
            </p>
            <p className="text-xs text-[#57504A] mt-1 flex items-center gap-2">
              <span>Monsoon moisture seal &amp; IS:710 marine millwork</span>
              <a
                href={STUDIO_PROFILE.phoneHref}
                className="inline-flex items-center gap-1 text-[#9A6B3E] font-semibold hover:underline whitespace-nowrap"
              >
                <Phone className="w-3 h-3" /> Call
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
