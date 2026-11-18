import React, { useState } from 'react';
import { Award, Compass, ShieldCheck, X } from 'lucide-react';
import { FOUNDER_BIO, TEAM_MEMBERS, type TeamMember } from '../data/studioData';

interface AboutSectionProps {
  onConsultWithSpecialist: (memberName: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onConsultWithSpecialist,
}) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-20 py-16 md:py-24 border-b border-[#E6E0D6] bg-[#FAF8F5]"
    >
      <div className="max-w-[1280px] mx-auto px-6 space-y-20">
        {/* Part 1: Principal Designer Biography & Professional Headshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left 5 Columns: Professional Headshot Portrait & Studio Credentials */}
          <div className="lg:col-span-5 flex flex-col bg-[#181615] text-[#FAF8F5] rounded-2xl overflow-hidden border border-[#E6E0D6]">
            <div className="relative aspect-[4/4.3] w-full bg-[#181615] overflow-hidden">
              <img
                src={FOUNDER_BIO.portraitUrl}
                alt="Portrait of Roshan Sharma, Founder and Principal Interior Designer at Roshan Group"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="p-6 md:p-7 space-y-4 border-t border-white/10">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#E5C185]">
                <span>{FOUNDER_BIO.experienceYears} Studio Practice</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono-tabular">
                  {FOUNDER_BIO.completedProjects}
                </span>
              </div>

              <div>
                <h3 className="font-serif-display text-2xl font-semibold text-[#FAF8F5]">
                  {FOUNDER_BIO.name}
                </h3>
                <p className="text-xs text-[#C5B8A5] mt-0.5">
                  {FOUNDER_BIO.title} · Roshan Group
                </p>
              </div>

              <blockquote className="text-xs italic text-[#E6DDD0] leading-relaxed pt-2 border-t border-white/10">
                “Every wall and joinery detail we craft at Uni Design House is engineered to endure Mumbai’s coastal climate while bringing gallery-grade warmth to everyday family living.”
              </blockquote>

              <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-[#A39686]">Studio Headquarters</p>
                  <p className="font-medium text-[#FAF8F5] mt-0.5">
                    74 Techno Park, Seepz
                  </p>
                </div>
                <div>
                  <p className="text-[#A39686]">Client Satisfaction</p>
                  <p className="font-mono-tabular font-medium text-[#E5C185] mt-0.5">
                    4.8 ★ (106 Reviews)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right 7 Columns: Biography, Passion & Design Philosophy */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div className="space-y-5">
              <p className="text-xs font-medium text-[#9A6B3E]">
                About Us · Principal Designer Biography &amp; Studio Ethos
              </p>

              <h2
                id="about-heading"
                className="font-serif-display text-3xl md:text-4xl font-semibold text-[#181615] leading-[1.15] tracking-tight text-balance"
              >
                {FOUNDER_BIO.headline}
              </h2>

              <div className="space-y-4 text-sm md:text-[15px] text-[#4A433E] leading-[1.72]">
                {FOUNDER_BIO.biographyParagraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* 3 Core Design Philosophy Pillars */}
            <div className="space-y-4 pt-6 border-t border-[#E6E0D6]">
              <h3 className="font-serif-display text-2xl font-semibold text-[#181615]">
                Our Three Design Philosophy Pillars
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {FOUNDER_BIO.philosophyPillars.map((pillar) => (
                  <div
                    key={pillar.index}
                    className="p-5 rounded-xl bg-white border border-[#E6E0D6] space-y-2"
                  >
                    <p className="font-mono-tabular text-xs font-semibold text-[#9A6B3E]">
                      {pillar.index}. Philosophy
                    </p>
                    <h4 className="font-serif-display text-lg font-semibold text-[#181615]">
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-[#57504A] leading-relaxed">
                      {pillar.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Credibility Callout Row */}
            <div className="pt-4 border-t border-[#E6E0D6] flex flex-wrap items-center justify-between gap-4 text-xs text-[#57504A]">
              <div className="flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center gap-1.5 font-medium text-[#181615]">
                  <Award className="w-4 h-4 text-[#9A6B3E]" />
                  In-House Surface &amp; Millwork Workshop
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5 font-medium text-[#181615]">
                  <ShieldCheck className="w-4 h-4 text-[#9A6B3E]" />
                  COA Registered Architectural Team
                </span>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1.5 font-medium text-[#181615]">
                  <Compass className="w-4 h-4 text-[#9A6B3E]" />
                  Vastu &amp; Ergonomic Space Planning
                </span>
              </div>

              <button
                type="button"
                onClick={() => onConsultWithSpecialist(FOUNDER_BIO.name)}
                className="px-4 py-2 text-xs font-semibold text-[#FAF8F5] bg-[#181615] rounded-lg hover:bg-[#9A6B3E] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                Book a Session with Roshan
              </button>
            </div>
          </div>
        </div>

        {/* Part 2: Meet the Multidisciplinary Studio Team */}
        <div className="space-y-8 pt-12 border-t border-[#E6E0D6]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-medium text-[#9A6B3E]">
                Leadership &amp; Craft Specialists · Uni Design House, Seepz
              </p>
              <h3 className="font-serif-display text-2xl md:text-3xl font-semibold text-[#181615]">
                Meet the Architects &amp; Master Artisans Behind Every Project
              </h3>
            </div>
            <p className="text-xs text-[#6E655E]">
              Click any team member to inspect their credentials and signature Mumbai works
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <article
                key={member.id}
                className="bg-white border border-[#E6E0D6] rounded-2xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="h-60 bg-[#1B1816] overflow-hidden">
                    <img
                      src={member.portraitUrl}
                      alt={`${member.name} — ${member.role} at Roshan Group`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <div className="p-5 space-y-2">
                    <p className="text-xs text-[#6E655E] font-mono-tabular">
                      {member.yearsExperience} Years Experience
                    </p>
                    <h4 className="font-serif-display text-xl font-semibold text-[#181615]">
                      {member.name}
                    </h4>
                    <p className="text-xs font-semibold text-[#9A6B3E]">
                      {member.role}
                    </p>
                    <p className="text-xs text-[#57504A] leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-3 border-t border-[#F0EAE1] flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedMember(member)}
                    className="text-xs font-semibold text-[#181615] hover:text-[#9A6B3E] underline underline-offset-4 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    View Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => onConsultWithSpecialist(member.name)}
                    className="text-xs font-medium text-[#57504A] hover:text-[#181615] whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Consult →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* Team Member Profile Modal */}
      {selectedMember && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="team-modal-name"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs"
        >
          <div className="bg-[#FAF8F5] border border-[#E6E0D6] rounded-2xl max-w-xl w-full p-6 md:p-8 space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={selectedMember.portraitUrl}
                  alt={selectedMember.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-xl object-cover bg-[#181615]"
                />
                <div>
                  <h4
                    id="team-modal-name"
                    className="font-serif-display text-2xl font-semibold text-[#181615]"
                  >
                    {selectedMember.name}
                  </h4>
                  <p className="text-xs font-semibold text-[#9A6B3E]">
                    {selectedMember.role}
                  </p>
                  <p className="text-xs text-[#6E655E] mt-0.5">
                    {selectedMember.credentials}
                  </p>
                </div>
              </div>

              <button
                type="button"
                aria-label="Close specialist profile"
                onClick={() => setSelectedMember(null)}
                className="p-2 rounded-lg bg-[#EFEAE2] text-[#181615] hover:bg-[#181615] hover:text-[#FAF8F5] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-sm text-[#4A433E]">
              <p className="leading-relaxed">{selectedMember.bio}</p>
              <div className="p-4 rounded-xl bg-white border border-[#E6E0D6] space-y-1.5 text-xs">
                <p>
                  <strong className="text-[#181615]">Core Specialty:</strong>{' '}
                  {selectedMember.specialty}
                </p>
                <p>
                  <strong className="text-[#181615]">Signature Commission:</strong>{' '}
                  {selectedMember.signatureProject}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E6E0D6] flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                className="px-4 py-2 text-xs font-semibold text-[#57504A] hover:text-[#181615] cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const name = selectedMember.name;
                  setSelectedMember(null);
                  onConsultWithSpecialist(name);
                }}
                className="px-5 py-2.5 text-xs font-semibold text-[#FAF8F5] bg-[#181615] rounded-lg hover:bg-[#9A6B3E] transition-colors cursor-pointer"
              >
                Schedule Consultation with {selectedMember.name.split(' ')[0]}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
