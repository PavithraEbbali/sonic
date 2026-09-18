/**
 * lib/content.ts — SINGLE SOURCE OF TRUTH
 * ---------------------------------------------------------------------------
 * Every price, speed, fee, promotional qualifier and legal disclosure rendered
 * anywhere on this site is read from this file. Plan cards, the hero price
 * anchor, the fine-print comparison grid, the FAQ and the footer disclosures
 * all derive from the exports below.
 *
 * To change pricing site-wide, edit ONLY this file. No .tsx file contains a
 * hard-coded dollar amount, speed, fee or plan name.
 */

/* ========================================================================== *
 * CORE DATA MODEL
 * ========================================================================== */

export type ServiceLine = 'fiber' | 'cable' | 'bundle' | 'tv' | 'mobile' | 'phone';

export interface PlanItem {
  id: string;
  name: string;
  serviceLine: ServiceLine;
  /** Downstream speed in Mbps. 10000 = 10 Gig. Omit for non-internet plans. */
  speedDown?: number;
  /** Upstream speed in Mbps. Equal to speedDown on symmetrical fiber. */
  speedUp?: number;
  /** Whole-dollar portion of the monthly rate. Omit => card renders "Call for pricing". */
  price?: number;
  /** Cents portion, as a string so trailing zeros survive (e.g. "99"). */
  cents?: string;
  /** Promotional terms shown beneath the price lockup. */
  promoQualifier?: string;
  /** Optional hardware / router cost disclosure. */
  equipmentFee?: string;
  /** Data allowance disclosure. */
  dataPolicy?: string;
  /** Agreement length disclosure. */
  contractTerm?: string;
  features: string[];
  isPopular?: boolean;
  /** Short supporting line rendered under the plan name. */
  tagline?: string;
  /** Per-plan install cost, surfaced in the fine-print grid. */
  installation?: string;
}

/* ========================================================================== *
 * SITE + BRAND
 * ========================================================================== */

export const SITE = {
  brandName: 'Sonic',
  retailerLabel: 'Authorized Retailer',
  /**
   * PLACEHOLDER — swap for the retailer's own tracked sales line before launch.
   * Uses the 555-01xx range, which is reserved and never routes to a live party.
   * This must never be a carrier support number.
   */
  phoneDisplay: '(888) 555-0123',
  phoneHref: 'tel:+18885550123',
  disclosure: 'Independent Authorized Retailer of Sonic.',
  tagline: 'Fiber internet, priced honestly.',
} as const;

export const CTA = {
  /** Plan cards and body sections use this wording. Never a raw phone number. */
  order: 'Call to order',
  /** Used whenever a plan has no published rate. */
  pricing: 'Call for pricing',
} as const;

/* ========================================================================== *
 * SERVICE LINES — canonical merchandising order
 * ------------------------------------------------------------------------- *
 * Order is fixed: fiber -> cable -> bundle -> tv -> mobile -> phone.
 * A line with zero plans is skipped entirely by the renderer, so Sonic's
 * non-native lines (cable, TV, mobile) never produce an empty section.
 * ========================================================================== */

export const SERVICE_LINE_ORDER: ServiceLine[] = [
  'fiber',
  'cable',
  'bundle',
  'tv',
  'mobile',
  'phone',
];

export interface ImageAsset {
  src: string;
  alt: string;
  /** CSS object-position, when the default centre crop loses the subject. */
  position?: string;
}

export interface ServiceLineMeta {
  id: ServiceLine;
  eyebrow: string;
  title: string;
  description: string;
  /**
   * Optional supporting photograph. `imagePlacement` decides how it is used:
   *   'card'       — the photograph becomes a banner across the card's top
   *   'background' — full-bleed behind the section, with a tint for legibility
   * Lines with a full grid of cards leave both undefined.
   */
  image?: ImageAsset;
  imagePlacement?: 'card' | 'background';
}

export const SERVICE_LINE_META: Record<ServiceLine, ServiceLineMeta> = {
  fiber: {
    id: 'fiber',
    eyebrow: 'Fiber Internet',
    title: 'Sonic Fiber',
    description:
      'Fiber-to-the-home on a network Sonic builds and operates itself, with matching download and upload speeds up to 10 Gigabits.',
  },
  cable: {
    id: 'cable',
    eyebrow: 'Cable',
    title: 'Cable Internet',
    description: '',
  },
  bundle: {
    id: 'bundle',
    eyebrow: 'Internet + Home Phone',
    title: 'Sonic Fusion',
    description:
      'Fusion pairs symmetrical fiber with a full home phone line on one bill — unlimited nationwide calling included.',
    image: {
      src: '/images/fusion-kitchen.jpg',
      alt: 'A woman talking on a cordless home phone in her kitchen, a laptop open on the counter behind her.',
      position: '40% 44%',
    },
    imagePlacement: 'card',
  },
  tv: { id: 'tv', eyebrow: 'TV', title: 'TV', description: '' },
  mobile: { id: 'mobile', eyebrow: 'Mobile', title: 'Mobile', description: '' },
  phone: {
    id: 'phone',
    eyebrow: 'Home Phone',
    title: 'Sonic Home Phone',
    description:
      'A digital voice line with unlimited nationwide calling, spam call blocking and number transfer. Available as an add-on to Sonic Fusion fiber service.',
    image: {
      src: '/images/home-phone-console.jpg',
      alt: 'A corded landline telephone on a wooden hallway table beside a set of keys and a stack of mail.',
      position: '52% 52%',
    },
    imagePlacement: 'background',
  },
};

/* ========================================================================== *
 * PLANS
 * ------------------------------------------------------------------------- *
 * Audited against sonic.com. Sonic does not natively sell cable internet,
 * television service or mobile service, so no plans exist on those lines and
 * those sections are omitted from the page automatically.
 * ========================================================================== */

export const PLANS: PlanItem[] = [
  {
    id: 'fiber-10-gig',
    name: 'Sonic Fiber 10 Gig',
    serviceLine: 'fiber',
    tagline: 'The fastest tier Sonic builds.',
    speedDown: 10000,
    speedUp: 10000,
    price: 49,
    cents: '99',
    promoQualifier: 'per mo. for 12 mos., then $59.99/mo.',
    equipmentFee: 'Optional Sonic WiFi router from $5/mo.',
    dataPolicy: 'Unlimited, uncapped',
    contractTerm: 'None required',
    installation: 'Free',
    isPopular: true,
    features: [
      'Symmetrical 10 Gig download and upload',
      'Unlimited data — no caps, no throttling',
      'Free professional installation',
      'No contract and no early termination fee',
      'WiFi Health Check included at install',
      'Free VPN and email accounts included',
    ],
  },
  {
    id: 'fiber-pre-order',
    name: 'Sonic Fiber Pre-Order',
    serviceLine: 'fiber',
    tagline: 'For neighborhoods where the build is underway.',
    speedDown: 10000,
    speedUp: 10000,
    promoQualifier: 'Pay nothing until your installation is complete.',
    equipmentFee: 'Optional Sonic WiFi router from $5/mo.',
    dataPolicy: 'Unlimited, uncapped',
    contractTerm: 'None required',
    installation: 'Free',
    features: [
      'Locks in the best available rate for your address',
      'Priority installation once the build finishes',
      'Construction progress updates for your street',
      'No charge until service is live',
    ],
  },
  {
    id: 'fusion-fiber-1-gig',
    name: 'Sonic Fusion Fiber 1 Gig',
    serviceLine: 'bundle',
    tagline: 'Symmetrical fiber with a home phone line included.',
    speedDown: 1000,
    speedUp: 1000,
    price: 49,
    cents: '99',
    promoQualifier: 'per mo. for 12 mos., then $59.99/mo.',
    equipmentFee: 'Optional Sonic WiFi router from $5/mo.',
    dataPolicy: 'Unlimited, uncapped',
    contractTerm: 'None required',
    installation: 'Free',
    isPopular: true,
    features: [
      'Symmetrical 1 Gig fiber — 940 Mbps typical each way',
      'One home phone line with unlimited nationwide calling',
      'Spam call blocking powered by Nomorobo',
      'Keep your existing phone number',
      'Mobile Communicator app and fax-to-email line',
      'Unlimited data, no contract, free installation',
    ],
  },
  {
    id: 'home-phone-line',
    name: 'Sonic Home Phone',
    serviceLine: 'phone',
    tagline: 'Add a digital voice line to Sonic Fusion fiber.',
    price: 10,
    cents: '00',
    promoQualifier: 'per mo. added to Sonic Fusion fiber service.',
    equipmentFee: 'Analog telephone adapter provided — use the phones you own.',
    contractTerm: 'None required',
    features: [
      'Unlimited nationwide calling, plus 70 countries',
      'Spam call blocking powered by Nomorobo',
      'Keep your existing telephone number',
      'Caller ID, call waiting, call forwarding, three-way calling',
      'Voicemail delivered to your email inbox',
      '9-8-8 dialing for the Suicide & Crisis Lifeline',
    ],
  },
];

/* ========================================================================== *
 * EQUIPMENT — optional WiFi hardware
 * ========================================================================== */

export interface EquipmentItem {
  id: string;
  name: string;
  monthly: string;
  detail: string;
}

export const EQUIPMENT: EquipmentItem[] = [
  {
    id: 'wifi-7',
    name: 'Sonic WiFi 7',
    monthly: '$5/mo.',
    detail: 'Up to 1.8 Gbps wireless, covers up to 2,000 sq. ft.',
  },
  {
    id: 'wifi-pro-7',
    name: 'Sonic WiFi Pro 7',
    monthly: '$10/mo.',
    detail: 'Up to 3.9 Gbps wireless with two 10 GbE ports.',
  },
  {
    id: 'wifi-max-7',
    name: 'Sonic WiFi Max 7',
    monthly: '$20/mo.',
    detail: 'Up to 4.3 Gbps wireless with four auto-sensing ports.',
  },
];

/** Charges that apply across every plan. Rendered in the fine-print grid. */
export const UNIVERSAL_TERMS: { label: string; value: string }[] = [
  { label: 'Professional installation', value: '$0' },
  { label: 'One-time fees at purchase', value: '$0' },
  { label: 'Early termination fee', value: '$0' },
  { label: 'Charges for additional data', value: '$0/GB' },
  { label: 'Router rental', value: 'Optional, from $5/mo.' },
  { label: 'Government taxes and fees', value: 'Vary by location' },
];

/* ========================================================================== *
 * MEDIA — photography used outside the plan sections
 * ------------------------------------------------------------------------- *
 * Declared here so no .tsx file holds an image path or its alt text.
 * Every asset is 1408x768; crops are tuned per placement via `position`.
 * ========================================================================== */

export const MEDIA: Record<'hero' | 'install' | 'household', ImageAsset> = {
  hero: {
    src: '/images/hero-living-room.jpg',
    alt: 'A couple sitting together on a sofa at home in the evening, one using a laptop and the other a tablet.',
    position: '68% 50%',
  },
  install: {
    src: '/images/install-technician.jpg',
    alt: 'A technician kneeling beside a house, routing a fiber cable into a small wall-mounted enclosure.',
    position: '60% 50%',
  },
  household: {
    src: '/images/household-devices.jpg',
    alt: 'A father and his daughter in a living room in the evening, each using their own device.',
    position: '50% 45%',
  },
};

/* ========================================================================== *
 * TRUST CHIPS + WHY US
 * ========================================================================== */

export const TRUST_CHIPS: string[] = [
  'Lightning Fast Fiber',
  'Unlimited Data',
  'No Contract Required',
];

export interface FeatureItem {
  id: string;
  title: string;
  body: string;
}

export const WHY_US: FeatureItem[] = [
  {
    id: 'pure-fiber',
    title: 'End-to-end fiber infrastructure',
    body:
      'Sonic engineers and operates its own fiber-to-the-home infrastructure rather than leasing copper from another carrier. A dedicated glass path runs from the street to the optical network terminal at your property, which is why upload capacity matches download capacity on every tier.',
  },
  {
    id: 'award-winning',
    title: 'Independently recognized service',
    body:
      'Sonic holds the #1 ranking for overall customer satisfaction in America and has been named the fastest all-around internet provider six times. Support is staffed by specialists who answer the phone directly.',
  },
  {
    id: 'unlimited-data',
    title: 'Unlimited data on every plan',
    body:
      'No allowances, no overage billing and no throttling thresholds. Every plan listed here includes uncapped data at $0 per additional gigabyte.',
  },
  {
    id: 'honest-pricing',
    title: 'Transparent, predictable pricing',
    body:
      'Free professional installation, no annual agreement and no early termination fee. Both the promotional rate and the standard rate that follows it are disclosed on every plan listed here.',
  },
];

export const HOW_IT_WORKS: { step: string; title: string; body: string }[] = [
  {
    step: '01',
    title: 'Check your address',
    body:
      'Enter your ZIP code to begin. Fiber serviceability is determined street by street, so your exact address confirms which plans are available to order.',
  },
  {
    step: '02',
    title: 'Select your plan',
    body:
      'Select your speed tier, decide whether to include a home phone line, and add a Sonic WiFi router only if your property requires one.',
  },
  {
    step: '03',
    title: 'Professional installation',
    body:
      'A technician runs fiber to your property, commissions the optical network terminal and completes a WiFi Health Check before the appointment closes.',
  },
];

/* ========================================================================== *
 * FAQ
 * ========================================================================== */

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    id: 'install',
    question: 'What happens during installation?',
    answer:
      'A technician brings fiber from the street to your home, mounts a small device on an exterior wall and connects it to an optical network terminal inside, which acts as your modem. Installation is free, and the technician completes a WiFi Health Check before leaving so every room is covered.',
  },
  {
    id: 'speeds',
    question: 'Are the upload and download speeds really the same?',
    answer:
      'Yes. Sonic fiber is symmetrical, so a 1 Gig plan delivers roughly 940 Mbps in both directions with about 3 ms latency. Large uploads, video calls and cloud backups move as fast as downloads do.',
  },
  {
    id: 'ten-gig-equipment',
    question: 'What do I need to reach the full 10 Gig speed?',
    answer:
      'Ten-Gigabit speeds require 10 Gig-capable equipment at your end. Connecting a device with a 10 GbE port directly to the optical network terminal by Ethernet gets you closest to the maximum. WiFi is slower than a wired connection on any network, so a wired link is the way to see the top number.',
  },
  {
    id: 'phone-service',
    question: 'How does the home phone line work?',
    answer:
      'Sonic Home Phone is a digital voice line that runs over your fiber connection and is available with Sonic Fusion service. You plug your existing phones into an analog telephone adapter that arrives by mail. Unlimited nationwide calling is included, along with calling to 70 countries, and you can keep your current number.',
  },
  {
    id: 'data-caps',
    question: 'Is there a data cap or an overage charge?',
    answer:
      'No. Every plan listed here includes unlimited, uncapped data with no throttling and no charge for additional usage.',
  },
  {
    id: 'contract',
    question: 'Am I signing a contract?',
    answer:
      'No annual agreement is required and there is no early termination fee. Promotional rates run for the first 12 months, after which the standard monthly rate applies — both figures are printed on every plan card above.',
  },
  {
    id: 'router',
    question: 'Do I have to rent a router?',
    answer:
      'No. You are welcome to use your own equipment. If you would rather not shop for one, Sonic WiFi routers by eero start at $5 per month and include free replacements and automatic software updates.',
  },
  {
    id: 'availability',
    question: 'What if fiber has not reached my street yet?',
    answer:
      'Neighborhoods still under construction can pre-order. That locks in the best available rate and puts you first in line for installation, and nothing is charged until your service is live.',
  },
];

/* ========================================================================== *
 * NAVIGATION + FOOTER
 * ========================================================================== */

export const NAV_LINKS: { label: string; href: string }[] = [
  { label: 'Plans', href: '/#plans' },
  { label: 'Why Sonic', href: '/#why-sonic' },
  { label: 'FAQ', href: '/#faq' },
];

export const FOOTER_SHOP: { label: string; href: string }[] = [
  { label: 'Fiber Internet', href: '/#fiber' },
  { label: 'Internet + Home Phone', href: '/#bundle' },
  { label: 'Home Phone', href: '/#phone' },
  { label: 'Check availability', href: '/#hero' },
];

export const FOOTER_LEARN: { label: string; href: string }[] = [
  { label: 'Why Sonic', href: '/#why-sonic' },
  { label: 'How it works', href: '/#how-it-works' },
  { label: 'Plan details and fees', href: '/#fine-print' },
  { label: 'Frequently asked questions', href: '/#faq' },
];

export const FOOTER_HOURS: string[] = ['Mon–Fri, 8AM–9PM ET', 'Sat–Sun, 9AM–6PM ET'];

/* ========================================================================== *
 * DERIVED HELPERS — used by layout components so no .tsx file hard-codes data
 * ========================================================================== */

/** Plans belonging to one service line, in authored order. */
export function plansFor(line: ServiceLine): PlanItem[] {
  return PLANS.filter((p) => p.serviceLine === line);
}

/**
 * Service lines that actually have plans, in canonical merchandising order.
 * Lines Sonic does not offer natively return nothing and are never rendered.
 */
export function activeServiceLines(): ServiceLineMeta[] {
  return SERVICE_LINE_ORDER.filter((line) => plansFor(line).length > 0).map(
    (line) => SERVICE_LINE_META[line]
  );
}

/** The plan used for the hero price anchor: the flagged popular fiber plan. */
export function leadPlan(): PlanItem {
  const fiber = plansFor('fiber');
  return fiber.find((p) => p.isPopular) ?? fiber[0] ?? PLANS[0];
}

/** 10000 -> "10 Gig", 1000 -> "1 Gig", 500 -> "500 Mbps". */
export function formatSpeed(mbps?: number): string | null {
  if (!mbps) return null;
  if (mbps % 1000 === 0) return `${mbps / 1000} Gig`;
  return `${mbps} Mbps`;
}

/** 10000 -> "10 Gigabits", 1000 -> "1 Gigabit". Long form, for prose. */
export function formatSpeedLong(mbps?: number): string | null {
  if (!mbps) return null;
  if (mbps % 1000 === 0) {
    const gig = mbps / 1000;
    return `${gig} Gigabit${gig === 1 ? '' : 's'}`;
  }
  return `${mbps} Mbps`;
}

/**
 * Label/value pairs for the hero spec plate and the plan-card footer.
 * Derived from the plan itself, so both surfaces stay in step with PLANS and
 * with the fine-print grid, which reads the same fields under the same labels.
 */
export interface SpecRow {
  label: string;
  value: string;
}

/** Throughput rows only. */
export function planSpeedRows(plan: PlanItem): SpecRow[] {
  const rows: SpecRow[] = [];
  const down = formatSpeed(plan.speedDown);
  const up = formatSpeed(plan.speedUp);
  if (down) rows.push({ label: 'Download', value: down });
  if (up) rows.push({ label: 'Upload', value: up });
  return rows;
}

/** Commercial terms only — used in the plan-card footer, where the speed is
 *  already shown as a pill and would otherwise be stated twice. */
export function planTermRows(plan: PlanItem): SpecRow[] {
  const rows: SpecRow[] = [];
  if (plan.dataPolicy) rows.push({ label: 'Data', value: plan.dataPolicy });
  if (plan.contractTerm) rows.push({ label: 'Agreement', value: plan.contractTerm });
  if (plan.installation) rows.push({ label: 'Installation', value: plan.installation });
  return rows;
}

/** Full specification: throughput followed by commercial terms. */
export function planSpecRows(plan: PlanItem): SpecRow[] {
  return [...planSpeedRows(plan), ...planTermRows(plan)];
}

/** "Symmetrical 10 Gig" or "10 Gig down · 500 Mbps up". */
export function speedLabel(plan: PlanItem): string | null {
  const down = formatSpeed(plan.speedDown);
  if (!down) return null;
  if (plan.speedUp && plan.speedUp === plan.speedDown) {
    return `Symmetrical ${down}`;
  }
  const up = formatSpeed(plan.speedUp);
  return up ? `${down} down · ${up} up` : down;
}

/** True when a published rate exists; drives CTA wording on every card. */
export function hasPrice(plan: PlanItem): boolean {
  return typeof plan.price === 'number';
}

/** "Call to order" when priced, "Call for pricing" when not. */
export function ctaLabel(plan: PlanItem): string {
  return hasPrice(plan) ? CTA.order : CTA.pricing;
}

/**
 * The three glass highlight chips beside the hero copy. Derived from the lead
 * plan so the speed figure and the terms cannot drift from PLANS.
 */
export function heroHighlights(): { title: string; detail: string }[] {
  const plan = leadPlan();
  const speed = formatSpeed(plan.speedDown);
  return [
    {
      title: speed ? `${speed} symmetrical fiber` : 'Symmetrical fiber',
      detail: 'Upload capacity matches download on every tier.',
    },
    {
      title: 'Unlimited data',
      detail: 'No caps, no throttling, $0 per additional gigabyte.',
    },
    {
      title: 'Free professional installation',
      detail: 'No annual agreement and no early termination fee.',
    },
  ];
}

/** Rows for the fine-print comparison grid, derived entirely from PLANS. */
export interface FinePrintRow {
  label: string;
  values: (string | null)[];
}

export function finePrintTable(): { plans: PlanItem[]; rows: FinePrintRow[] } {
  const plans = PLANS;
  const rows: FinePrintRow[] = [
    {
      label: 'Monthly rate',
      values: plans.map((p) =>
        hasPrice(p) ? `$${p.price}.${p.cents ?? '00'}` : CTA.pricing
      ),
    },
    { label: 'Promotional terms', values: plans.map((p) => p.promoQualifier ?? null) },
    { label: 'Speed', values: plans.map((p) => speedLabel(p)) },
    { label: 'Data', values: plans.map((p) => p.dataPolicy ?? 'Not applicable') },
    { label: 'Agreement', values: plans.map((p) => p.contractTerm ?? null) },
    { label: 'Installation', values: plans.map((p) => p.installation ?? 'Included') },
    { label: 'Equipment', values: plans.map((p) => p.equipmentFee ?? null) },
  ];
  return { plans, rows };
}

/* ========================================================================== *
 * SEO
 * ------------------------------------------------------------------------- *
 * Declared last so the helpers and PLANS above are already initialised. The
 * headline speed is derived, so a change to the lead plan updates the meta
 * description with everything else.
 * ========================================================================== */

export const SEO = {
  title: 'Sonic Fiber Internet Plans | Authorized Retailer',
  get description(): string {
    const speed = formatSpeedLong(leadPlan().speedDown) ?? 'gigabit speeds';
    return `Order Sonic fiber internet with symmetrical speeds up to ${speed}, unlimited data, free professional installation and no annual contract. Independent authorized retailer.`;
  },
} as const;
