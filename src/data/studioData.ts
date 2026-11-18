import type { PortfolioItem } from '../utils/bookingLogic';

export interface ServiceOffering {
  id: string;
  indexNumber: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  typicalTimeline: string;
  startingRateLabel: string;
  warrantyLabel: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  credentials: string;
  yearsExperience: number;
  specialty: string;
  bio: string;
  signatureProject: string;
  portraitUrl: string;
}

export interface ClientReview {
  id: string;
  clientName: string;
  locality: string;
  serviceProvided: string;
  rating: number;
  timeAgo: string;
  comment: string;
  outcomeHighlight: string;
}

export const STUDIO_PROFILE = {
  name: 'Roshan Group',
  category: 'Interior Designer & Custom Wallpaper Atelier',
  tagline:
    'Interior design firm providing custom wallpaper decor and home renovation services.',
  googleRating: 4.8,
  googleReviewCount: 106,
  phoneDisplay: '098202 62649',
  phoneInternational: '+91 98202 62649',
  phoneHref: 'tel:+919820262649',
  whatsappHref:
    'https://wa.me/919820262649?text=Hello%20Roshan%20Group%2C%20I%20would%20like%20to%20schedule%20an%20interior%20design%20consultation.',
  addressFull:
    'Uni Design House, 74 Techno Park, Cross Rd C, opp. Gate, Seepz, Andheri East, Mumbai, Maharashtra 400093',
  addressShort: 'Uni Design House, 74 Techno Park, Seepz, Andheri East, Mumbai 400093',
  directionsHref:
    'https://www.google.com/maps/search/?api=1&query=Roshan+Group+Uni+Design+House+74+Techno+Park+Seepz+Andheri+East+Mumbai+400093',
  hoursSummary: 'Mon – Sat · Opens 10:00 AM – 7:30 PM',
  businessScreenshotPath:
    '/public/assets/aistudio/Screenshot_20261106-225859_Google_28140129.png',
  mapPreviewPath: '/assets/portfolio/roshan-seepz-map.png',
};

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'aurelia-botanical-lounge',
    title: 'Aurelia Gold-Leaf & Botanical Statement Lounge',
    category: 'Bespoke Wallpaper',
    location: 'Seepz, Andheri East, Mumbai',
    areaSqFt: 920,
    durationWeeks: 3,
    completionYear: '2026',
    featuredSpan: 'wide',
    imageUrl: '/assets/portfolio/roshan-botanical-gold-lounge.png',
    summary:
      'Custom 3D geometric brass frames layered over hand-illustrated tropical botanical wall coverings and charcoal velvet seating.',
    clientBrief:
      'Transform a low-light formal living room into a gallery-grade reception space with a dramatic focal wall that resists Mumbai coastal humidity.',
    designExecution:
      'Our surface artisans engineered a multi-layered breathable non-woven vinyl mural with raised metallic brass framing and integrated directional ceiling spots.',
    materialsUsed: [
      'Breathable Non-Woven Acoustic Vinyl',
      'Brushed Brass Relief Framing',
      'Charcoal Belgian Linen Upholstery',
      'Anti-Fungal Moisture Barrier Primer',
    ],
    quantifiedOutcome:
      '+42% perceived depth via warm grazing illumination · 10-year zero-peel monsoon warranty',
  },
  {
    id: 'sapphire-damask-atelier',
    title: 'Royal Cobalt & Indigo Textured Wall Installation',
    category: 'Bespoke Wallpaper',
    location: 'Lokhandwala, Andheri West, Mumbai',
    areaSqFt: 640,
    durationWeeks: 2,
    completionYear: '2026',
    featuredSpan: 'standard',
    imageUrl: '/assets/portfolio/roshan-cobalt-damask-wall.png',
    summary:
      'Seamless floor-to-ceiling indigo botanical damask wall covering with precision switch-plate integration and washable matte seal.',
    clientBrief:
      'Replace dated painted plaster walls with rich, tactile sapphire wall coverings without dust-heavy civil demolition.',
    designExecution:
      'Laser-plumbed seam matching around electrical conduits with two-stage wall skim-coating and German solvent-free adhesive.',
    materialsUsed: [
      'Heavyweight Embossed Indigo Damask',
      'German Solvent-Free Adhesive',
      'Vitrified Matte Marble Skirting',
    ],
    quantifiedOutcome:
      'Installed in 48 hours with zero civil dust · Scrub-resistant Class A finish',
  },
  {
    id: 'walnut-chevron-marble-suite',
    title: 'Chevron Walnut & Backlit Travertine Media Wall',
    category: 'Full Renovation',
    location: 'Hiranandani Gardens, Powai, Mumbai',
    areaSqFt: 1480,
    durationWeeks: 8,
    completionYear: '2026',
    featuredSpan: 'tall',
    imageUrl: '/assets/portfolio/roshan-walnut-marble-console.png',
    summary:
      'Bookmatched walnut chevron veneer paneling paired with a cantilevered floating console and warm 2700K LED cove lighting.',
    clientBrief:
      'Complete living and dining refurbishment integrating concealed AV cabling, warm timber acoustics, and Italian marble flooring.',
    designExecution:
      'Custom-milled smoked walnut chevron panels fabricated at our Uni Design House workshop, paired with backlit onyx-toned stone.',
    materialsUsed: [
      'Smoked American Walnut Veneer',
      'Backlit Alabaster & Travertine',
      '2700K CRI-95 Linear Cove LEDs',
      'Imported Botticino Marble Flooring',
    ],
    quantifiedOutcome:
      '100% concealed wire management · Delivered 5 days ahead of festive handover schedule',
  },
  {
    id: 'powai-culinary-bath-sanctuary',
    title: 'Quartzite Island Kitchen & Monsoon-Sealed Spa Bath',
    category: 'Bathrooms & Kitchens',
    location: 'JVLR, Andheri East, Mumbai',
    areaSqFt: 780,
    durationWeeks: 6,
    completionYear: '2025',
    featuredSpan: 'standard',
    imageUrl: '/assets/portfolio/roshan-kitchen-bath-suite.svg',
    summary:
      'Handleless fluted walnut and Calacatta quartzite modular kitchen paired with a sunken rain-shower bathroom refurbishment.',
    clientBrief:
      'Re-engineer a cramped compartmentalized kitchen and leaking master bath into an open culinary island and hotel-grade wet room.',
    designExecution:
      'Full MEP re-piping, 3-coat crystalline waterproofing membrane, marine-grade boiling-water-proof (BWP) ply carcass, and Blum soft-close hardware.',
    materialsUsed: [
      'IS:710 Marine Grade BWP Plywood',
      'Calacatta Quartzite Countertops',
      'Blum Legrabox Hardware',
      '3-Layer Crystalline Waterproofing',
    ],
    quantifiedOutcome:
      '+35% usable culinary storage · 10-year waterproofing integrity certification',
  },
  {
    id: 'techno-park-executive-studio',
    title: 'Techno Park Acoustic Glass & Millwork Executive Suite',
    category: 'Architectural Design',
    location: 'MIDC & Seepz, Andheri East, Mumbai',
    areaSqFt: 2400,
    durationWeeks: 9,
    completionYear: '2025',
    featuredSpan: 'standard',
    imageUrl: '/assets/portfolio/roshan-architectural-studio.svg',
    summary:
      'Architectural spatial reconfiguration with bronze Crittall acoustic partitions, linear timber baffles, and bespoke boardroom joinery.',
    clientBrief:
      'Convert an industrial shell in Andheri East into an acoustic-rated executive headquarters and client showroom.',
    designExecution:
      'Engineered double-glazed bronze partitions achieving 42 dB STC acoustic isolation alongside custom walnut and brass reception millwork.',
    materialsUsed: [
      '42 dB Acoustic Double Glazing',
      'Anodized Bronze Mullion Frames',
      'Linear Oak Ceiling Baffles',
    ],
    quantifiedOutcome:
      '42 dB acoustic isolation between boardroom and studio floor · Seated capacity +24%',
  },
  {
    id: 'juhu-sea-facing-duplex',
    title: 'Juhu Travertine Arch & Turnkey Duplex Refurbishment',
    category: 'Full Renovation',
    location: 'Juhu Tara Road, Mumbai',
    areaSqFt: 2850,
    durationWeeks: 14,
    completionYear: '2025',
    featuredSpan: 'standard',
    imageUrl: '/assets/portfolio/roshan-juhu-duplex.svg',
    summary:
      'End-to-end civil refurbishment featuring monolithic travertine niches, lime-plaster walls, and custom brass architectural hardware.',
    clientBrief:
      'Unify two adjacent apartments into a cohesive coastal-resilient family duplex with warm architectural arches and bespoke furniture.',
    designExecution:
      'Structural beam consolidation approved by licensed engineers, corrosion-resistant marine brass joinery, and breathable mineral wall finishes.',
    materialsUsed: [
      'Honed Roman Travertine',
      'Breathable Lime Wash & Textured Vinyl',
      'Marine-Grade PVD Brushed Brass',
    ],
    quantifiedOutcome:
      'Turnkey delivery across 2,850 sq. ft. with single-window project management',
  },
];

export const SERVICES_LIST: ServiceOffering[] = [
  {
    id: 'bespoke-wallpaper',
    indexNumber: '01',
    title: 'Bespoke Wallpaper & Architectural Wall Decor',
    subtitle: 'Custom Murals · Metallic Leafing · Acoustic & Textured Wall Coverings',
    description:
      'As Mumbai’s specialist wallpaper and surface decor studio, we design, print, and install moisture-resistant custom murals, 3D brass-framed botanical panels, silk damasks, and acoustic wall coverings tailored to exact wall elevations.',
    deliverables: [
      'On-site laser measurement & dampness moisture audit',
      'Custom scale digital mockups & physical texture swatch book inspection',
      '2-stage skim-coat surface priming & anti-fungal monsoon sealer',
      'Precision zero-seam installation by in-house master installers',
    ],
    typicalTimeline: '3 – 10 Days',
    startingRateLabel: '₹280 – ₹620 / sq. ft.',
    warrantyLabel: '5-Year Seam & Adhesion Warranty',
  },
  {
    id: 'full-refurbishment',
    indexNumber: '02',
    title: 'Turnkey Home Refurbishment & Renovation',
    subtitle: 'Civil Alterations · False Ceilings · Flooring · Complete Interior Fit-Outs',
    description:
      'Single-window residential and commercial refurbishment across Mumbai. From dismantling dated finishes and upgrading electrical/plumbing grids to handcrafted veneer paneling, Italian marble laying, and cove illumination.',
    deliverables: [
      'Dedicated site supervisor & weekly milestone schedule',
      'Complete civil, electrical (Polycab/Finolex), and acoustic false ceiling works',
      'Custom TV consoles, wardrobe systems, and architectural wall paneling',
      'Deep post-handover sanitization & documented snag-list sign-off',
    ],
    typicalTimeline: '6 – 14 Weeks',
    startingRateLabel: '₹2,200 – ₹3,800 / sq. ft.',
    warrantyLabel: '10-Year Structural & Millwork Warranty',
  },
  {
    id: 'architectural-design',
    indexNumber: '03',
    title: 'Architectural Designs & 3D Space Planning',
    subtitle: '2D CAD Working Drawings · Photorealistic 3D Views · Structural Zoning',
    description:
      'Precision architectural layouts that maximize carpet-area efficiency in Mumbai apartments, villas, and commercial offices. Every square foot is planned for natural cross-ventilation, Vastu-compatible flow, and concealed storage.',
    deliverables: [
      '3 alternative furniture & spatial zoning layouts',
      'Photorealistic 3D perspective renders for every room elevation',
      'Full GFC (Good for Construction) CAD drawings: MEP, ceiling, and joinery',
      'Itemized Bill of Quantities (BOQ) with zero hidden cost escalations',
    ],
    typicalTimeline: '2 – 4 Weeks',
    startingRateLabel: '₹1,600 – ₹2,900 / sq. ft.',
    warrantyLabel: 'Fixed-Fee BOQ Price Lock Guarantee',
  },
  {
    id: 'bathrooms-kitchens',
    indexNumber: '04',
    title: 'Luxury Bathrooms & Modular Kitchens',
    subtitle: 'IS:710 Marine Ply Kitchens · Quartzite Islands · Wet-Room Waterproofing',
    description:
      'High-performance culinary spaces and spa-grade bathrooms engineered for heavy Indian cooking and Mumbai monsoon humidity. Built exclusively with boiling-water-proof marine plywood, German soft-close hardware, and crystalline waterproofing.',
    deliverables: [
      'Ergonomic work-triangle planning & built-in appliance integration',
      'IS:710 BWP marine ply carcasses with acrylic, PU lacquer, or fluted veneer shutters',
      '3-coat crystalline bathroom waterproofing & concealed cistern plumbing',
      'Anti-skid large-format sintered stone & backlit vanity mirrors',
    ],
    typicalTimeline: '4 – 6 Weeks',
    startingRateLabel: '₹1,400 – ₹2,500 / sq. ft.',
    warrantyLabel: '10-Year Waterproofing & Hardware Warranty',
  },
  {
    id: 'bespoke-furniture',
    indexNumber: '05',
    title: 'Bespoke Design & Custom Millwork',
    subtitle: 'Handcrafted Consoles · Bookmatched Veneers · Brass & Stone Joinery',
    description:
      'Produced directly through our Uni Design House workshop in Techno Park, Andheri East. We craft custom media walls, floor-to-ceiling wardrobes, upholstered headboards, and sculptural brass-inlay dining tables.',
    deliverables: [
      'Factory-pressed veneers & kiln-dried Burma teak / American walnut joinery',
      'Custom PVD-coated brass profiles, fluted glass, and onyx backlighting',
      'Stain-repellent Italian fabric & full-grain leather upholstery',
      'Modular factory pre-fabrication for rapid, low-noise site assembly',
    ],
    typicalTimeline: '3 – 5 Weeks',
    startingRateLabel: '₹1,100 – ₹2,100 / sq. ft.',
    warrantyLabel: '7-Year Finish & Joinery Warranty',
  },
];

export const FOUNDER_BIO = {
  name: 'Roshan Sharma',
  title: 'Founder & Principal Interior Designer',
  studioBase: 'Uni Design House, 74 Techno Park, Seepz, Andheri East, Mumbai',
  experienceYears: '14+ Years',
  completedProjects: '380+ Spaces Delivered',
  portraitUrl: '/assets/team/roshan-sharma-portrait.svg',
  headline:
    'Crafting tactile walls and architectural interiors built for the way Mumbai lives.',
  biographyParagraphs: [
    'Over the past fourteen years, Roshan Sharma has built Roshan Group into one of Andheri East’s most trusted interior design and custom surface studios. Operating out of Uni Design House in Techno Park, Seepz, Roshan began his career studying architectural millwork and textile wall coverings—recognizing early on that Mumbai homeowners were underserved by generic catalog interiors that peeled or warped within two monsoon seasons.',
    'By combining an in-house bespoke wallpaper atelier with full-scope architectural refurbishment, Roshan Group bridges the gap between decorative surface artistry and rigorous civil engineering. Whether commissioning a hand-gilded botanical mural for a compact living room or executing a turnkey 2,800 sq. ft. duplex renovation in Juhu or Powai, Roshan personally reviews every material board, moisture test, and lighting elevation before site execution begins.',
    'His passion lies in tactile honesty: pairing warm American walnut veneers, bookmatched Italian travertine, and breathable acoustic wall fabrics with disciplined spatial geometry that makes compact urban floorplans feel expansive, serene, and enduring.',
  ],
  philosophyPillars: [
    {
      index: '01',
      title: 'Tactile Surface Architecture',
      detail:
        'Walls should never be flat afterthoughts. We treat every vertical plane as an architectural canvas—layering custom botanical murals, fluted timber, and grazing light to create depth without sacrificing floor area.',
    },
    {
      index: '02',
      title: 'Monsoon-Resilient Engineering',
      detail:
        'Design in coastal Mumbai demands technical rigor. Every wallpaper installation begins with dampness metering and anti-fungal priming; every kitchen and bath uses certified IS:710 marine plywood and crystalline waterproofing.',
    },
    {
      index: '03',
      title: 'Transparent Single-Window Craft',
      detail:
        'Clients work directly with our principal designer and in-house technical leads at Uni Design House—eliminating middleman markups, uncoordinated subcontractors, and timeline drift.',
    },
  ],
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'roshan-sharma',
    name: 'Roshan Sharma',
    role: 'Founder & Principal Interior Designer',
    credentials: 'B.Des Interior Architecture · 14+ Yrs Mumbai Studio Practice',
    yearsExperience: 14,
    specialty: 'Bespoke Wall Decor, Material Curation & Turnkey Direction',
    bio: 'Leads creative direction, custom wallpaper curation, and final quality sign-offs across all residential and commercial commissions at Uni Design House.',
    signatureProject: 'Aurelia Gold-Leaf & Botanical Lounge, Andheri East',
    portraitUrl: '/assets/team/roshan-sharma-portrait.svg',
  },
  {
    id: 'ananya-deshmukh',
    name: 'Ar. Ananya Deshmukh',
    role: 'Senior Architectural Lead',
    credentials: 'B.Arch (Sir J.J. College of Architecture) · COA Registered',
    yearsExperience: 9,
    specialty: 'Spatial Reconfiguration, 3D Elevations & Structural Civil Works',
    bio: 'Specializes in high-density Mumbai apartment layouts, structural beam integration, and photorealistic 3D lighting simulations before civil execution.',
    signatureProject: 'Juhu Travertine Arch Duplex Refurbishment',
    portraitUrl: '/assets/team/ananya-deshmukh.svg',
  },
  {
    id: 'kabir-mehta',
    name: 'Kabir Mehta',
    role: 'Master Wallpaper & Surface Artisan',
    credentials: '11+ Yrs Specialist in Custom Murals & Metallic Leafing',
    yearsExperience: 11,
    specialty: 'Zero-Seam Wallpaper Installation, Acoustic Fabrics & Gold Leaf',
    bio: 'Directs Roshan Group’s surface installation crew, overseeing substrate moisture testing, custom mural calibration, and precision brass relief framing.',
    signatureProject: 'Sapphire Damask & Botanical Atelier Series',
    portraitUrl: '/assets/team/kabir-mehta.svg',
  },
  {
    id: 'priya-nair',
    name: 'Priya Nair',
    role: 'Head of Kitchens, Baths & MEP',
    credentials: 'M.Tech Construction Management · Kitchen & Wet-Room Specialist',
    yearsExperience: 8,
    specialty: 'Modular Culinary Islands, Blum Hardware & Bathroom Waterproofing',
    bio: 'Manages plumbing, electrical load balancing, and factory-precision modular kitchen and luxury bathroom installations with strict milestone tracking.',
    signatureProject: 'Powai Lakeview Culinary & Spa Bath Sanctuary',
    portraitUrl: '/assets/team/priya-nair.svg',
  },
];

export const CLIENT_REVIEWS: ClientReview[] = [
  {
    id: 'rev-1',
    clientName: 'Siddharth & Neha Kulkarni',
    locality: 'Marol, Andheri East',
    serviceProvided: 'Bespoke Wallpaper & Living Room Refurbishment',
    rating: 5,
    timeAgo: '2 weeks ago',
    comment:
      'We visited Roshan Group at Uni Design House in Seepz after seeing their 4.8 rating on Google. Roshan personally helped us choose a black-and-gold botanical mural and walnut TV console. Their team primed the damp wall first and finished installation in 3 days with invisible seams.',
    outcomeHighlight: 'Zero-seam custom mural + walnut console delivered in 72 hours',
  },
  {
    id: 'rev-2',
    clientName: 'Dr. Mehul Sanghvi',
    locality: 'Hiranandani Gardens, Powai',
    serviceProvided: 'Full 3BHK Refurbishment & Kitchen',
    rating: 5,
    timeAgo: '1 month ago',
    comment:
      'Handed over our 1,480 sq. ft. apartment for full refurbishment including bathrooms, modular kitchen, and custom chevron wood paneling. Roshan and Ar. Ananya gave us an itemized BOQ on day one and delivered 5 days before Diwali without a single rupee of hidden escalation.',
    outcomeHighlight: '1,480 sq. ft. turnkey renovation completed 5 days ahead of schedule',
  },
  {
    id: 'rev-3',
    clientName: 'Rhea Kapoor-ania',
    locality: 'Lokhandwala, Andheri West',
    serviceProvided: 'Custom Cobalt Textured Wallpaper & Lighting',
    rating: 5,
    timeAgo: '2 months ago',
    comment:
      'Kabir and the Roshan Group wallpaper team are true craftsmen. The royal blue textured wallpaper in our master bedroom completely transformed the room without any painting mess or smell.',
    outcomeHighlight: 'Complete bedroom wall transformation with Class-A washable finish',
  },
];

export const INITIAL_BOOKINGS = [
  {
    id: 'bk-seed-1',
    referenceCode: 'RG-1121-SK01',
    clientName: 'Sanjay Khurana',
    phone: '098202 62649',
    email: 'sanjay.khurana@mumbaihomes.in',
    serviceId: 'bespoke-wallpaper',
    propertyLocation: 'MIDC, Andheri East, Mumbai',
    propertyAreaSqFt: '950',
    preferredDate: '2026-11-21',
    preferredTimeSlot: '11:00 AM – 12:30 PM',
    budgetRange: '₹3L – ₹8L',
    projectNotes: 'Consultation for custom gold-leaf botanical wall & fluted TV unit.',
    createdAt: 'Scheduled Studio Visit · Uni Design House',
    estimatedInvestmentInr: '₹2.7L – ₹5.9L',
    status: 'Confirmed' as const,
  },
];
