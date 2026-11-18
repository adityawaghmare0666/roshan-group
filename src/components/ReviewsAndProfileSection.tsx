import React from 'react';
import { ExternalLink, MapPin, Phone, Star, X } from 'lucide-react';
import { CLIENT_REVIEWS, STUDIO_PROFILE } from '../data/studioData';

interface ReviewsAndProfileSectionProps {
  isProfileModalOpen: boolean;
  onOpenProfileModal: () => void;
  onCloseProfileModal: () => void;
}

export const ReviewsAndProfileSection: React.FC<
  ReviewsAndProfileSectionProps
> = ({ isProfileModalOpen, onOpenProfileModal, onCloseProfileModal }) => {
  const starDistribution = [
    { stars: 5, percent: 88, count: 93 },
    { stars: 4, percent: 9, count: 10 },
    { stars: 3, percent: 3, count: 3 },
    { stars: 2, percent: 0, count: 0 },
    { stars: 1, percent: 0, count: 0 },
  ];

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="scroll-mt-20 py-16 md:py-24 border-b border-[#E6E0D6] bg-[#F5F1EA]"
    >
      <div className="max-w-[1280px] mx-auto px-6 space-y-12">
        {/* Top Row: Google Review Summary & Verified Profile Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 5 Columns: Google Review Summary Breakdown */}
          <div className="lg:col-span-5 bg-white border border-[#E6E0D6] rounded-2xl p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-medium text-[#9A6B3E]">
                Verified Client Proof · Google Business Profile
              </p>
              <h2
                id="reviews-heading"
                className="font-serif-display text-3xl font-semibold text-[#181615]"
              >
                Google Review Summary
              </h2>
            </div>

            <div className="flex items-center gap-6 py-2">
              <div>
                <p className="font-mono-tabular text-5xl font-bold text-[#181615]">
                  {STUDIO_PROFILE.googleRating}
                </p>
                <div
                  className="flex items-center gap-1 mt-2"
                  aria-label="4.8 out of 5 stars"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star
                      key={n}
                      className="w-4 h-4 fill-[#E5A000] text-[#E5A000]"
                    />
                  ))}
                </div>
                <p className="text-xs text-[#6E655E] mt-1 font-mono-tabular">
                  {STUDIO_PROFILE.googleReviewCount} Verified Reviews
                </p>
              </div>

              {/* Rating Bars */}
              <div className="flex-1 space-y-2">
                {starDistribution.map((row) => (
                  <div
                    key={row.stars}
                    className="flex items-center gap-2.5 text-xs font-mono-tabular"
                  >
                    <span className="w-3 text-[#57504A]">{row.stars}</span>
                    <div className="flex-1 h-2 bg-[#EFEAE2] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#E5A000] rounded-full"
                        style={{ width: `${row.percent}%` }}
                      />
                    </div>
                    <span className="w-7 text-right text-[#6E655E]">
                      {row.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E6E0D6] flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-[#57504A]">
                Seepz, Andheri East · Mumbai 400093
              </span>
              <button
                type="button"
                onClick={onOpenProfileModal}
                className="font-semibold text-[#181615] hover:text-[#9A6B3E] underline underline-offset-4 cursor-pointer"
              >
                Inspect Business Profile Snapshot
              </button>
            </div>
          </div>

          {/* Right 7 Columns: Studio Location & Direct Access Card */}
          <div className="lg:col-span-7 bg-white border border-[#E6E0D6] rounded-2xl p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-7 space-y-3">
                <p className="text-xs font-medium text-[#9A6B3E]">
                  Visit Our Mumbai Design Studio &amp; Material Library
                </p>
                <h3 className="font-serif-display text-2xl md:text-3xl font-semibold text-[#181615]">
                  Uni Design House, Techno Park, Andheri East
                </h3>
                <p className="text-sm text-[#4A433E] leading-relaxed">
                  {STUDIO_PROFILE.addressFull}
                </p>
                <div className="pt-1 space-y-1 text-xs text-[#57504A]">
                  <p>
                    <strong className="text-[#181615]">Studio Hours:</strong>{' '}
                    {STUDIO_PROFILE.hoursSummary}
                  </p>
                  <p>
                    <strong className="text-[#181615]">Direct Phone / WhatsApp:</strong>{' '}
                    <span className="font-mono-tabular">
                      {STUDIO_PROFILE.phoneDisplay}
                    </span>
                  </p>
                </div>
              </div>

              {/* Real Extracted Map Preview from Uploaded Screenshot */}
              <div className="md:col-span-5">
                <div className="rounded-xl overflow-hidden border border-[#E6E0D6] bg-[#181615]">
                  <img
                    src={STUDIO_PROFILE.mapPreviewPath}
                    alt="Map location of Roshan Group at Uni Design House, Seepz, Andheri East, Mumbai"
                    referrerPolicy="no-referrer"
                    className="w-full h-44 object-cover"
                  />
                  <div className="p-3 bg-[#181615] text-[#FAF8F5] flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#E5C185]" />
                      Opp. Gate, Seepz
                    </span>
                    <a
                      href={STUDIO_PROFILE.directionsHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#E5C185] hover:underline font-medium"
                    >
                      <span>Directions</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E6E0D6] flex flex-wrap items-center gap-3">
              <a
                href={STUDIO_PROFILE.phoneHref}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#FAF8F5] bg-[#181615] rounded-lg hover:bg-[#9A6B3E] transition-colors whitespace-nowrap shrink-0"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call {STUDIO_PROFILE.phoneDisplay}</span>
              </a>

              <a
                href={STUDIO_PROFILE.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#181615] bg-[#EFEAE2] hover:bg-[#E2D9CC] rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <span>Chat on WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={STUDIO_PROFILE.directionsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#57504A] hover:text-[#181615] underline underline-offset-4 whitespace-nowrap shrink-0"
              >
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Row: 3 Attributable Client Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CLIENT_REVIEWS.map((review) => (
            <article
              key={review.id}
              className="bg-white border border-[#E6E0D6] rounded-2xl p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#6E655E]">
                  <span className="font-semibold text-[#181615]">
                    {review.rating}.0 ★ Verified Client
                  </span>
                  <span>{review.timeAgo}</span>
                </div>

                <p className="text-sm text-[#4A433E] leading-relaxed">
                  “{review.comment}”
                </p>
              </div>

              <div className="pt-4 border-t border-[#F0EAE1] space-y-1">
                <p className="text-xs font-semibold text-[#9A6B3E]">
                  Outcome: {review.outcomeHighlight}
                </p>
                <p className="text-sm font-semibold text-[#181615]">
                  {review.clientName}
                </p>
                <p className="text-xs text-[#6E655E]">
                  {review.locality} · {review.serviceProvided}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal displaying the user's attached Google Business Profile Screenshot */}
      {isProfileModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="business-profile-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
        >
          <div className="bg-[#FAF8F5] border border-[#E6E0D6] rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3
                  id="business-profile-modal-title"
                  className="font-serif-display text-2xl font-semibold text-[#181615]"
                >
                  Roshan Group · Verified Google Business Profile
                </h3>
                <p className="text-xs text-[#6E655E]">
                  4.8 ★ (106 Reviews) · Uni Design House, Seepz, Andheri East
                </p>
              </div>

              <button
                type="button"
                aria-label="Close Business Profile snapshot"
                onClick={onCloseProfileModal}
                className="p-2 rounded-lg bg-[#EFEAE2] text-[#181615] hover:bg-[#181615] hover:text-[#FAF8F5] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="rounded-xl overflow-hidden border border-[#E6E0D6] bg-[#181615]">
              <img
                src={STUDIO_PROFILE.businessScreenshotPath}
                alt="Roshan Group Google Business Profile Screenshot"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain max-h-[65vh]"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={onCloseProfileModal}
                className="px-4 py-2 text-xs font-semibold text-[#FAF8F5] bg-[#181615] rounded-lg hover:bg-[#9A6B3E] cursor-pointer"
              >
                Close Snapshot
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
