import React, { useState } from 'react';
import { ArrowUpRight, Search, X } from 'lucide-react';
import { PORTFOLIO_ITEMS } from '../data/studioData';
import {
  filterPortfolioItems,
  type PortfolioItem,
  type ProjectCategory,
} from '../utils/bookingLogic';

interface PortfolioSectionProps {
  onSelectProjectForBooking: (project: PortfolioItem) => void;
}

const CATEGORIES: ProjectCategory[] = [
  'All Projects',
  'Bespoke Wallpaper',
  'Full Renovation',
  'Bathrooms & Kitchens',
  'Architectural Design',
];

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  onSelectProjectForBooking,
}) => {
  const [selectedCategory, setSelectedCategory] =
    useState<ProjectCategory>('All Projects');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeProject, setActiveProject] = useState<PortfolioItem | null>(
    null
  );

  const filteredProjects = filterPortfolioItems(
    PORTFOLIO_ITEMS,
    selectedCategory,
    searchQuery
  );

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="scroll-mt-20 py-16 md:py-24 border-b border-[#E6E0D6]"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-medium text-[#9A6B3E]">
              Selected Works · Residential &amp; Commercial Commissions
            </p>
            <h2
              id="portfolio-heading"
              className="font-serif-display text-3xl md:text-4xl font-semibold text-[#181615] tracking-tight text-balance"
            >
              Curated Interior &amp; Bespoke Surface Portfolio
            </h2>
            <p className="text-sm md:text-base text-[#57504A] leading-relaxed">
              Explore completed installations across Andheri East, Powai, Lokhandwala, and Juhu—ranging from custom 3D botanical wall coverings to turnkey luxury apartment refurbishments.
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full lg:w-72">
            <label htmlFor="portfolio-search" className="sr-only">
              Search portfolio by material or Mumbai locality
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-[#6E655E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="portfolio-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by material or locality..."
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-[#DED7CC] rounded-lg text-[#181615] placeholder:text-[#8C8279] focus:outline-none focus:border-[#9A6B3E]"
              />
            </div>
          </div>
        </div>

        {/* Interactive Filter Tabs (Functional Buttons) */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div
            role="group"
            aria-label="Filter projects by category"
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#EFEAE2] rounded-xl"
          >
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  aria-pressed={isActive}
                  className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#181615] text-[#FAF8F5] shadow-xs'
                      : 'text-[#57504A] hover:text-[#181615]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-[#6E655E] font-mono-tabular">
            Showing {filteredProjects.length} of {PORTFOLIO_ITEMS.length} commissioned works
          </p>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center bg-white border border-[#E6E0D6] rounded-2xl space-y-3">
            <p className="font-serif-display text-xl font-semibold text-[#181615]">
              No matching portfolio projects found
            </p>
            <p className="text-sm text-[#57504A]">
              Try clearing your search filter or switching to All Projects.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All Projects');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-semibold text-[#FAF8F5] bg-[#181615] rounded-lg hover:bg-[#9A6B3E] transition-colors cursor-pointer"
            >
              Reset Portfolio Filters
            </button>
          </div>
        ) : (
          /* Asymmetric Bento Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => {
              const isFeaturedWide =
                selectedCategory === 'All Projects' &&
                !searchQuery &&
                index === 0;
              return (
                <article
                  key={project.id}
                  className={`group bg-white border border-[#E6E0D6] rounded-2xl overflow-hidden flex flex-col justify-between transform-gpu transition-[transform,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-xs hover:scale-[1.015] hover:-translate-y-1 hover:shadow-[0_18px_36px_-10px_rgba(24,22,21,0.14)] hover:border-[#C5B8A5] motion-reduce:transition-none motion-reduce:hover:transform-none ${
                    isFeaturedWide ? 'md:col-span-2' : 'col-span-1'
                  }`}
                >
                  <div>
                    {/* Media Container */}
                    <div
                      className={`relative overflow-hidden bg-[#1D1916] ${
                        isFeaturedWide ? 'h-72 md:h-80' : 'h-64'
                      }`}
                    >
                      <img
                        src={project.imageUrl}
                        alt={`${project.title} — ${project.location}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transform-gpu transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 motion-reduce:transition-none"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent transition-opacity duration-200 group-hover:opacity-90" />
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#FAF8F5]/95">
                        <span>
                          {project.category} · {project.location}
                        </span>
                        <span className="font-mono-tabular">
                          {project.areaSqFt.toLocaleString()} sq. ft.
                        </span>
                      </div>
                    </div>

                    {/* Text Body */}
                    <div className="p-6 space-y-2.5">
                      {/* Clean unboxed metadata with typographic separators */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-[#6E655E]">
                        <span>Completed {project.completionYear}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-tabular">
                          {project.durationWeeks} Weeks Execution
                        </span>
                      </div>

                      <h3 className="font-serif-display text-2xl font-semibold text-[#181615] leading-snug transition-colors duration-200 group-hover:text-[#9A6B3E]">
                        {project.title}
                      </h3>

                      <p className="text-sm text-[#4A433E] leading-relaxed">
                        {project.summary}
                      </p>

                      <p className="pt-1 text-xs font-medium text-[#9A6B3E]">
                        Outcome: {project.quantifiedOutcome}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer Action */}
                  <div className="px-6 pb-5 pt-3 border-t border-[#F0EAE1] flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setActiveProject(project)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#181615] hover:text-[#9A6B3E] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>Inspect Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectProjectForBooking(project)}
                      className="text-xs font-medium text-[#57504A] hover:text-[#181615] underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Request Similar Design
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox Case Study Modal */}
      {activeProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/75 backdrop-blur-xs"
        >
          <div className="bg-[#FAF8F5] border border-[#E6E0D6] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs text-[#6E655E]">
                  {activeProject.category} · {activeProject.location} ·{' '}
                  <span className="font-mono-tabular">
                    {activeProject.areaSqFt} sq. ft.
                  </span>
                </p>
                <h3
                  id="modal-project-title"
                  className="font-serif-display text-2xl md:text-3xl font-semibold text-[#181615]"
                >
                  {activeProject.title}
                </h3>
              </div>

              <button
                type="button"
                aria-label="Close project case study"
                onClick={() => setActiveProject(null)}
                className="p-2 rounded-lg bg-[#EFEAE2] text-[#181615] hover:bg-[#181615] hover:text-[#FAF8F5] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="rounded-xl overflow-hidden border border-[#E6E0D6] bg-[#181615] h-64 md:h-80">
              <img
                src={activeProject.imageUrl}
                alt={activeProject.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-2">
                <h4 className="font-semibold text-[#181615]">Client Brief</h4>
                <p className="text-[#4A433E] leading-relaxed">
                  {activeProject.clientBrief}
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-[#181615]">
                  Architectural &amp; Surface Execution
                </h4>
                <p className="text-[#4A433E] leading-relaxed">
                  {activeProject.designExecution}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E6E0D6] space-y-2">
              <h4 className="text-xs font-semibold text-[#181615]">
                Specified Materials &amp; Finishes
              </h4>
              <p className="text-xs text-[#57504A]">
                {activeProject.materialsUsed.join(' · ')}
              </p>
              <p className="text-xs font-semibold text-[#9A6B3E] pt-1">
                Verified Outcome: {activeProject.quantifiedOutcome}
              </p>
            </div>

            <div className="pt-4 border-t border-[#E6E0D6] flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="px-4 py-2.5 text-xs font-semibold text-[#57504A] hover:text-[#181615] cursor-pointer"
              >
                Close Preview
              </button>
              <button
                type="button"
                onClick={() => {
                  const chosen = activeProject;
                  setActiveProject(null);
                  onSelectProjectForBooking(chosen);
                }}
                className="px-5 py-2.5 text-xs font-semibold text-[#FAF8F5] bg-[#181615] rounded-lg hover:bg-[#9A6B3E] transition-colors cursor-pointer"
              >
                Book Consultation for Similar Space
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
