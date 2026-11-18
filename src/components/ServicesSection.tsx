import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { SERVICES_LIST, type ServiceOffering } from '../data/studioData';
import { calculateEstimatedInvestment } from '../utils/bookingLogic';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceId: string, areaSqFt: number) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForBooking,
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    SERVICES_LIST[0].id
  );
  const [estimatorArea, setEstimatorArea] = useState<number>(950);

  const activeService: ServiceOffering =
    SERVICES_LIST.find((s) => s.id === selectedServiceId) || SERVICES_LIST[0];
  const estimate = calculateEstimatedInvestment(
    selectedServiceId,
    estimatorArea
  );

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="scroll-mt-20 py-16 md:py-24 border-b border-[#E6E0D6] bg-[#F5F1EA]"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Section Heading */}
        <div className="max-w-2xl space-y-3 mb-12">
          <p className="text-xs font-medium text-[#9A6B3E]">
            Core Capabilities · Single-Window Turnkey Execution
          </p>
          <h2
            id="services-heading"
            className="font-serif-display text-3xl md:text-4xl font-semibold text-[#181615] tracking-tight text-balance"
          >
            Architectural Design, Refurbishment &amp; Bespoke Wall Decor Services
          </h2>
          <p className="text-sm md:text-base text-[#57504A] leading-relaxed">
            Every discipline listed on our Google Business Profile is executed by in-house specialists from our Uni Design House workshop in Andheri East—backed by an itemized Bill of Quantities.
          </p>
        </div>

        {/* Main Grid: Numbered Editorial Service List + Interactive Scope Estimator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Columns: Editorial Numbered Service List */}
          <div className="lg:col-span-7 space-y-4">
            {SERVICES_LIST.map((service) => {
              const isSelected = service.id === selectedServiceId;
              return (
                <div
                  key={service.id}
                  className={`p-6 rounded-2xl border transition-colors ${
                    isSelected
                      ? 'bg-white border-[#181615]'
                      : 'bg-[#FAF8F5] border-[#E6E0D6] hover:border-[#C5B8A5]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                    <h3 className="font-serif-display text-2xl font-semibold text-[#181615]">
                      {service.indexNumber}. {service.title}
                    </h3>
                    <span className="font-mono-tabular text-xs font-medium text-[#9A6B3E] whitespace-nowrap">
                      {service.startingRateLabel}
                    </span>
                  </div>

                  <p className="text-xs font-medium text-[#6E655E] mb-3">
                    {service.subtitle}
                  </p>

                  <p className="text-sm text-[#4A433E] leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Deliverables */}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#4A433E] mb-5">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#9A6B3E] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-[#E6E0D6] flex flex-wrap items-center justify-between gap-4 text-xs">
                    <div className="text-[#6E655E]">
                      <span>Timeline: </span>
                      <strong className="font-mono-tabular text-[#181615]">
                        {service.typicalTimeline}
                      </strong>
                      <span aria-hidden="true"> · </span>
                      <span>{service.warrantyLabel}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedServiceId(service.id)}
                        className="text-xs font-semibold text-[#57504A] hover:text-[#181615] underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Calculate Estimate
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onSelectServiceForBooking(service.id, estimatorArea)
                        }
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#FAF8F5] bg-[#181615] rounded-lg hover:bg-[#9A6B3E] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>Book Service</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right 5 Columns: Interactive Turnkey Cost & Timeline Estimator */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 bg-white border border-[#E6E0D6] rounded-2xl p-6 md:p-8 space-y-6">
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-[#9A6B3E]">
                Interactive Scope &amp; Budget Planner
              </p>
              <h3 className="font-serif-display text-2xl font-semibold text-[#181615]">
                Instant Mumbai Investment Estimator
              </h3>
              <p className="text-xs text-[#57504A] leading-relaxed">
                Select a service discipline and your approximate carpet area to preview transparent studio pricing before your site consultation.
              </p>
            </div>

            {/* Service Selector */}
            <div className="space-y-2">
              <label
                htmlFor="estimator-service-select"
                className="block text-xs font-semibold text-[#181615]"
              >
                Selected Service Discipline
              </label>
              <select
                id="estimator-service-select"
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAF8F5] border border-[#DED7CC] rounded-lg text-[#181615] focus:outline-none focus:border-[#9A6B3E]"
              >
                {SERVICES_LIST.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.indexNumber}. {s.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Area Slider & Numeric Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label
                  htmlFor="estimator-area-range"
                  className="font-semibold text-[#181615]"
                >
                  Property Carpet Area (sq. ft.)
                </label>
                <span className="font-mono-tabular font-semibold text-sm text-[#9A6B3E]">
                  {estimatorArea.toLocaleString()} sq. ft.
                </span>
              </div>
              <input
                id="estimator-area-range"
                type="range"
                min={200}
                max={3500}
                step={50}
                value={estimatorArea}
                onChange={(e) => setEstimatorArea(Number(e.target.value))}
                className="w-full accent-[#181615] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#6E655E] font-mono-tabular">
                <span>200 sq. ft. (Single Room)</span>
                <span>1,200 sq. ft. (3 BHK)</span>
                <span>3,500 sq. ft.</span>
              </div>
            </div>

            {/* Output Summary Box */}
            <div className="p-5 rounded-xl bg-[#FAF8F5] border border-[#E6E0D6] space-y-3">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-xs text-[#57504A]">
                  Estimated Turnkey Investment
                </span>
                <span
                  data-testid="estimator-output-range"
                  className="font-mono-tabular text-2xl font-semibold text-[#181615]"
                >
                  {estimate.formattedRange}
                </span>
              </div>

              <div className="pt-3 border-t border-[#E6E0D6] flex items-center justify-between text-xs text-[#57504A]">
                <span>Estimated Completion Window</span>
                <span className="font-mono-tabular font-semibold text-[#181615]">
                  {activeService.typicalTimeline}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-[#57504A]">
                <span>Warranty Coverage</span>
                <span className="font-medium text-[#181615]">
                  {activeService.warrantyLabel}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                onSelectServiceForBooking(selectedServiceId, estimatorArea)
              }
              className="w-full py-3.5 px-5 text-xs font-semibold text-[#FAF8F5] bg-[#181615] rounded-lg hover:bg-[#9A6B3E] transition-colors cursor-pointer"
            >
              Lock Estimate &amp; Book On-Site Measurement
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
