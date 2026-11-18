import React from 'react';

interface NavbarProps {
  onNavigateBook: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateBook }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E6E0D6]">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          className="font-serif-display text-2xl font-semibold tracking-tight text-[#181615] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9A6B3E]"
        >
          Roshan Group
        </a>

        {/* Zone 2: 4–5 concise single-line text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-[#57504A]"
        >
          <a
            href="#portfolio"
            className="hover:text-[#181615] underline-offset-8 hover:underline transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Portfolio
          </a>
          <a
            href="#services"
            className="hover:text-[#181615] underline-offset-8 hover:underline transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Services
          </a>
          <a
            href="#about"
            className="hover:text-[#181615] underline-offset-8 hover:underline transition-colors whitespace-nowrap shrink-0 py-1"
          >
            About Us
          </a>
          <a
            href="#reviews"
            className="hover:text-[#181615] underline-offset-8 hover:underline transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Reviews
          </a>
          <a
            href="#booking"
            className="hover:text-[#181615] underline-offset-8 hover:underline transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onNavigateBook}
            className="px-5 py-2.5 text-xs font-semibold tracking-wide text-[#FAF8F5] bg-[#181615] rounded-lg hover:bg-[#9A6B3E] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9A6B3E]"
          >
            Book Consultation
          </button>
        </div>
      </div>
    </header>
  );
};
