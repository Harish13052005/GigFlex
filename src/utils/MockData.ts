export interface SkillProfile {
  id: string;
  skillName: string;
  rating: number;
  hourlyRate: number;
  experienceYears: number;
  certificates: string[];
  availability: string[];
  languages: string[];
  portfolioLink: string;
  verified: boolean;
  equipmentOwned: string[];
  reviewsCount: number;
}

export interface RentalAsset {
  id: string;
  name: string;
  category: string;
  image: string;
  pricePerDay: number;
  deposit: number;
  calendarBookings: { [date: string]: 'available' | 'booked' | 'reserved' };
  pickupOption: 'pickup' | 'delivery' | 'both';
  insuranceOption: string;
  damagePolicy: string;
  verified: boolean;
  ownerName: string;
  ownerRating: number;
  description: string;
}

export interface JobGig {
  id: string;
  title: string;
  description: string;
  category: 'skill' | 'gig' | 'event' | 'emergency';
  location: string;
  budget: number;
  duration: string;
  date: string;
  urgency: 'low' | 'medium' | 'high' | 'emergency';
  requiredSkills: string[];
  status: 'open' | 'applied' | 'assigned' | 'completed' | 'in_dispute' | 'released';
  ownerName: string;
  assignedWorker?: string;
  distanceKm: number;
  coords: { x: number; y: number }; // percentage on our visual grid map
}

export interface Dispute {
  id: string;
  jobId: string;
  jobTitle: string;
  workerName: string;
  employerName: string;
  amount: number;
  status: 'pending' | 'resolved_worker' | 'resolved_employer';
  details: string;
  evidence: string[];
  chatHistory: { sender: string; message: string; time: string }[];
}

export interface Transaction {
  id: string;
  jobId?: string;
  type: 'earning' | 'payment' | 'deposit' | 'refund';
  amount: number;
  date: string;
  status: 'pending_escrow' | 'released' | 'refunded' | 'failed';
  details: string;
}

export interface HelperVolunteer {
  id: string;
  name: string;
  skill: string;
  distanceKm: number;
  rating: number;
  coords: { x: number; y: number };
  etaMinutes: number;
  vehicle: string;
  phone: string;
}

// Starter Data
export const initialSkills: SkillProfile[] = [
  {
    id: 's1',
    skillName: 'Professional Drone Videography',
    rating: 4.9,
    hourlyRate: 75,
    experienceYears: 4,
    certificates: ['FAA Part 107 Commercial Drone Pilot License'],
    availability: ['Weekend Only', 'Evenings'],
    languages: ['English', 'Spanish'],
    portfolioLink: 'https://vimeo.com/giggleflex-drone-reel',
    verified: true,
    equipmentOwned: ['DJI Inspire 3', 'DJI Mavic 3 Pro', 'Atomos Ninja Monitor'],
    reviewsCount: 38,
  },
  {
    id: 's2',
    skillName: 'Event Photography',
    rating: 4.8,
    hourlyRate: 50,
    experienceYears: 6,
    certificates: ['NYIP Professional Photography Certificate'],
    availability: ['Weekend Only', 'Available Today'],
    languages: ['English'],
    portfolioLink: 'https://behance.net/lens-master-gigs',
    verified: true,
    equipmentOwned: ['Sony A7R V', '24-70mm f/2.8 GM II Lens', 'Godox V1 Flash'],
    reviewsCount: 54,
  },
  {
    id: 's3',
    skillName: 'Private Airport Chauffeur',
    rating: 4.95,
    hourlyRate: 35,
    experienceYears: 8,
    certificates: ['Commercial Driver License (CDL)', 'Defensive Driving Badge'],
    availability: ['Available Today', 'Available Tomorrow', 'Weekend Only'],
    languages: ['English', 'German'],
    portfolioLink: 'https://gigflex.com/driver/transit-master',
    verified: true,
    equipmentOwned: ['Tesla Model Y (2023)', 'BMW 5 Series'],
    reviewsCount: 112,
  },
  {
    id: 's4',
    skillName: 'React & Node.js Website Maintenance',
    rating: 4.7,
    hourlyRate: 60,
    experienceYears: 3,
    certificates: ['AWS Certified Developer'],
    availability: ['Evenings', 'Morning'],
    languages: ['English', 'Hindi'],
    portfolioLink: 'https://github.com/react-gig-master',
    verified: false,
    equipmentOwned: ['MacBook Pro M3 Max', 'UltraWide Monitor'],
    reviewsCount: 19,
  }
];

export const initialAssets: RentalAsset[] = [
  {
    id: 'a1',
    name: 'Sony FE 70-200mm f/2.8 GM OSS II Lens',
    category: 'DSLR Lens',
    image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    pricePerDay: 45,
    deposit: 300,
    calendarBookings: {
      '2026-07-13': 'booked',
      '2026-07-14': 'available',
      '2026-07-18': 'reserved',
      '2026-07-19': 'reserved',
    },
    pickupOption: 'both',
    insuranceOption: 'Damage Protection Plan ($8/day extra, covers accidental drops)',
    damagePolicy: 'Minor scratches covered by deposit. Severe functional damage requires replacement compensation.',
    verified: true,
    ownerName: 'Sarah Jenkins',
    ownerRating: 4.9,
    description: 'Professional grade telephoto zoom lens. Extremely sharp and excellent in low light. Perfect for wedding and sports videography.'
  },
  {
    id: 'a2',
    name: 'DJI Mavic 3 Pro Cine Premium Combo',
    category: 'Drone',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    pricePerDay: 120,
    deposit: 600,
    calendarBookings: {
      '2026-07-13': 'available',
      '2026-07-15': 'booked',
    },
    pickupOption: 'pickup',
    insuranceOption: 'Full Drone Insurance ($25/day, covers flyaway and water damage)',
    damagePolicy: 'Requires $600 hold. User liable for full replacement value in case of negligence.',
    verified: true,
    ownerName: 'Alex Mercer',
    ownerRating: 4.8,
    description: 'Flagship triple-camera system drone. ProRes encoding. Includes smart controller and 3 batteries.'
  },
  {
    id: 'a3',
    name: 'Dewalt Cordless Brushless Combo Kit (5-Tool)',
    category: 'Power Tools',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    pricePerDay: 25,
    deposit: 100,
    calendarBookings: {
      '2026-07-14': 'available',
      '2026-07-15': 'available',
    },
    pickupOption: 'pickup',
    insuranceOption: 'None needed',
    damagePolicy: 'Covered for mechanical failure. Missing parts will be charged from the deposit.',
    verified: false,
    ownerName: 'Dave Miller',
    ownerRating: 4.5,
    description: 'Includes Hammer Drill, Impact Driver, Circular Saw, Reciprocating Saw, and LED worklight. Perfect for home renovations.'
  },
  {
    id: 'a4',
    name: 'Foldable Lightweight Wheelchair',
    category: 'Medical Equipment',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    pricePerDay: 15,
    deposit: 50,
    calendarBookings: {
      '2026-07-13': 'booked',
      '2026-07-14': 'booked',
      '2026-07-15': 'booked',
    },
    pickupOption: 'delivery',
    insuranceOption: 'Accident Waiver ($2/day)',
    damagePolicy: 'Covers wear and tear. Frame bending or wheel damage deducted from security deposit.',
    verified: true,
    ownerName: 'Care Assist Rentals',
    ownerRating: 4.95,
    description: 'Highly portable, breathable canvas, dual brakes, padded armrests. Extremely clean and sanitized after every use.'
  }
];

export const initialGigs: JobGig[] = [
  {
    id: 'g1',
    title: 'Need Professional Driver for VIP Client',
    description: 'Pick up corporate executive from airport, drop off at Ritz Carlton, and drive to multiple venues in Downtown for the day. High-end car required (Tesla or equivalent). Business attire mandatory.',
    category: 'gig',
    location: 'Airport & Downtown Core',
    budget: 250,
    duration: '8 Hours',
    date: '2026-07-13',
    urgency: 'high',
    requiredSkills: ['Driving', 'Customer Service'],
    status: 'open',
    ownerName: 'Apex Logistics Group',
    distanceKm: 4.2,
    coords: { x: 30, y: 45 }
  },
  {
    id: 'g2',
    title: 'Wedding Reception Photo Assist',
    description: 'Need a secondary photographer for an outdoor garden wedding. Focus will be on capture-candid shots of guests, table settings, and food presentation. Sony/Canon mirrorless body required.',
    category: 'gig',
    location: 'Evergreen Botanical Garden',
    budget: 180,
    duration: '4 Hours',
    date: '2026-07-18',
    urgency: 'medium',
    requiredSkills: ['Photography', 'Lighting'],
    status: 'open',
    ownerName: 'Vows & Veils Media',
    distanceKm: 8.5,
    coords: { x: 70, y: 25 }
  },
  {
    id: 'g3',
    title: 'Critical Bug Fix for E-Commerce Checkout',
    description: 'Shopify site experiencing Stripe checkout dropouts on custom React storefront. Need a developer immediately to audit webhook handler and patch the backend route.',
    category: 'skill',
    location: 'Remote / Hybrid (Office in Tech District)',
    budget: 350,
    duration: '3 Hours Max',
    date: '2026-07-13',
    urgency: 'high',
    requiredSkills: ['Coding', 'Website Maintenance'],
    status: 'open',
    ownerName: 'Nordic Apparel Co.',
    distanceKm: 1.8,
    coords: { x: 15, y: 20 }
  },
  {
    id: 'g4',
    title: 'Drone Shoot: Commercial Real Estate Portfolio',
    description: 'Capture aerial photos and raw 4K cinematic video clips of a newly constructed high-rise office park. Deliver raw logs and edited clips. FAA Part 107 required.',
    category: 'skill',
    location: 'Silicon Meadows Blvd',
    budget: 400,
    duration: '5 Hours',
    date: '2026-07-14',
    urgency: 'low',
    requiredSkills: ['Photography', 'Drone Operator'],
    status: 'open',
    ownerName: 'Pinnacle Development',
    distanceKm: 12.1,
    coords: { x: 85, y: 75 }
  }
];

export const initialVolunteers: HelperVolunteer[] = [
  {
    id: 'v1',
    name: 'Marcus Chen',
    skill: 'Battery Jump & Towing',
    distanceKm: 1.2,
    rating: 4.9,
    coords: { x: 42, y: 38 },
    etaMinutes: 6,
    vehicle: 'Ford F-150 Pickup (with Jumper Cables)',
    phone: '+1 (555) 831-2940'
  },
  {
    id: 'v2',
    name: 'Elena Rostova',
    skill: 'Flat Tyre Replacement',
    distanceKm: 2.7,
    rating: 4.8,
    coords: { x: 55, y: 62 },
    etaMinutes: 12,
    vehicle: 'Honda CR-V (with Heavy Jack & Drill)',
    phone: '+1 (555) 293-8401'
  },
  {
    id: 'v3',
    name: 'Devon Patel',
    skill: 'Emergency Locksmithing',
    distanceKm: 3.5,
    rating: 4.95,
    coords: { x: 22, y: 15 },
    etaMinutes: 15,
    vehicle: 'Mobile Lock & Key Van',
    phone: '+1 (555) 749-3829'
  },
  {
    id: 'v4',
    name: 'Sarah Connor',
    skill: 'Medical First Aid transport',
    distanceKm: 5.1,
    rating: 4.7,
    coords: { x: 78, y: 48 },
    etaMinutes: 20,
    vehicle: 'Toyota Prius (Basic Life Support kit)',
    phone: '+1 (555) 102-3948'
  }
];

export const initialDisputes: Dispute[] = [
  {
    id: 'dsp1',
    jobId: 'g99',
    jobTitle: 'Clean Office Complex after Renovation',
    workerName: 'John Doe',
    employerName: 'Smith Builders Ltd.',
    amount: 300,
    status: 'pending',
    details: 'The worker did not clean the baseboards and left painting debris in the main hallway. The worker claims they were only contracted for carpets and vacuuming.',
    evidence: [
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300 (Dirty baseboards photo)',
      'https://images.unsplash.com/photo-1603796846097-bee99e4a60c9?w=300 (Contract PDF snapshot)'
    ],
    chatHistory: [
      { sender: 'Employer', message: 'There is dust everywhere on the windowsills and baseboards. We cannot release $300.', time: '09:12 AM' },
      { sender: 'Worker', message: 'I worked 6 hours. The description said "vacuuming and floor wash". Baseboards were never mentioned. I need my payout.', time: '09:25 AM' },
      { sender: 'Employer', message: 'Cleaning includes dust removal. I will let the platform resolve this.', time: '09:40 AM' }
    ]
  }
];

export const initialTransactions: Transaction[] = [
  {
    id: 'tx101',
    jobId: 'g2',
    type: 'payment',
    amount: 180,
    date: '2026-07-12',
    status: 'pending_escrow',
    details: 'Escrow funded for Wedding Reception Photo Assist (Vows & Veils Media)'
  },
  {
    id: 'tx102',
    jobId: 'g88',
    type: 'earning',
    amount: 150,
    date: '2026-07-11',
    status: 'released',
    details: 'Payout released for Website Bug Patch (Nordic Apparel)'
  },
  {
    id: 'tx103',
    type: 'deposit',
    amount: 300,
    date: '2026-07-10',
    status: 'released',
    details: 'Security deposit hold refunded for DSLR Lens rental'
  }
];
