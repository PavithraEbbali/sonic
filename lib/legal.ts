/**
 * lib/legal.ts — POLICY CONTENT
 * ---------------------------------------------------------------------------
 * The eight policy documents, as data. `app/(policies)/[slug]/page.tsx` maps
 * over LEGAL_PAGES to prerender one static route per document, so adding or
 * removing a policy here changes the site and the footer with no layout edits.
 *
 * ⚠️  REVIEW BEFORE LAUNCH
 * These are carefully written, conventional policies for an independent
 * authorized retailer — they are NOT legal advice and have not been reviewed by
 * counsel. Have a lawyer review them against the retailer's actual practices,
 * jurisdiction and carrier agreement. Every bracketed value in LEGAL below is a
 * placeholder that must be replaced.
 */

import { SITE } from './content';

/* ========================================================================== *
 * ENTITY DETAILS — all placeholders
 * ========================================================================== */

export const LEGAL = {
  /** Registered company that operates this site. */
  entityName: '[Retailer legal entity name]',
  /** Registered mailing address. */
  address: '[Street address, City, State ZIP]',
  /** Mailbox monitored for privacy and legal enquiries. */
  email: '[legal@yourdomain.com]',
  /** Public site hostname, used in the policies' own text. */
  siteName: '[yourdomain.com]',
  /**
   * Effective date shown at the head of each policy. Policies need a date to be
   * enforceable; this is distinct from the pricing date stamps the site avoids.
   */
  effectiveDate: '[Month YYYY]',
  businessHours: 'Mon–Fri, 8AM–9PM ET · Sat–Sun, 9AM–6PM ET',
} as const;

/* ========================================================================== *
 * MODEL
 * ========================================================================== */

export interface LegalBlock {
  heading: string;
  /** Rendered before the bullet list. */
  paragraphs?: string[];
  bullets?: string[];
  /** Rendered after the bullet list, for a closing note. */
  footnote?: string[];
}

export interface LegalPage {
  slug: string;
  /** H1 and <title>. */
  title: string;
  /** Footer link text — shorter than the title where that reads better. */
  navLabel: string;
  /** Meta description and the standfirst under the H1. */
  description: string;
  blocks: LegalBlock[];
}

const RETAILER_STATUS =
  `${LEGAL.entityName} is an independent authorized retailer of ${SITE.brandName}. ` +
  `We are a separate company from the network operator: we sell and place orders for ` +
  `its residential services, and the operator provides, installs and bills for the ` +
  `service itself under its own terms.`;

const CONTACT_BLOCK = (subject: string): LegalBlock => ({
  heading: 'Contact us',
  paragraphs: [
    `Questions about ${subject}? Write to ${LEGAL.email} or call ${SITE.phoneDisplay} during ${LEGAL.businessHours}.`,
    `${LEGAL.entityName}, ${LEGAL.address}.`,
  ],
});

/* ========================================================================== *
 * THE POLICIES
 * ========================================================================== */

export const LEGAL_PAGES: LegalPage[] = [
  /* ---------------------------------------------------------------- 1 ----- */
  {
    slug: 'privacy-policy',
    title: 'Privacy & Data Protection',
    navLabel: 'Privacy & Data Protection',
    description:
      'What we collect when you check availability or call us, why we collect it, how long we keep it, and the rights you can exercise over it.',
    blocks: [
      {
        heading: 'Who we are',
        paragraphs: [
          RETAILER_STATUS,
          `This policy covers ${LEGAL.siteName} only. Once you become a subscriber, the network operator handles your account under its own privacy policy, which we do not control.`,
        ],
      },
      {
        heading: 'Information we collect',
        paragraphs: ['We keep collection deliberately narrow. Depending on how you use the site, that can include:'],
        bullets: [
          'The ZIP code you type into the availability checker. It is processed in your browser to validate the format; we do not attach it to your identity.',
          'Details you give us on a call — name, service address, contact number, and the plan you want — so an order can be placed.',
          'Standard server and security logs, including IP address, browser type, referring page and timestamps.',
          'Aggregate analytics about which pages are viewed and which calls-to-action are used.',
          'Call records, where a call is recorded for quality and training purposes and you have been notified.',
        ],
      },
      {
        heading: 'How we use it',
        bullets: [
          'To confirm whether service is available at a specific address.',
          'To place, correct and follow up on an order you asked us to place.',
          'To respond to enquiries and to schedule installation.',
          'To detect and prevent fraud, abuse and security incidents.',
          'To measure how our advertising performs, in aggregate.',
          'To meet record-keeping obligations that apply to us.',
        ],
        footnote: [
          'We do not use your information for automated decision-making that produces legal or similarly significant effects.',
        ],
      },
      {
        heading: 'Sharing',
        paragraphs: [
          '**We do not sell your personal information, and we do not share it for cross-context behavioural advertising.**',
          'We disclose it only to the network operator in order to place and provision the order you asked for; to service providers who work on our behalf under contract, such as telephony and hosting; and where we are legally required to, or must to establish or defend a legal claim.',
        ],
      },
      {
        heading: 'How long we keep it',
        bullets: [
          'Order records: for as long as needed to fulfil the order, and afterwards for the period our record-keeping obligations require.',
          'Call recordings: a limited retention window, then deleted on a rolling basis.',
          'Server and security logs: a short rolling window, unless a log is preserved for an active investigation.',
          'Aggregate analytics: retained in a form that does not identify you.',
        ],
      },
      {
        heading: 'Security',
        paragraphs: [
          'The site is served over HTTPS. We apply access controls, limit who can see order records to staff who need them, and review our providers. No method of transmission or storage is perfectly secure, and we cannot guarantee absolute security.',
        ],
      },
      {
        heading: 'Children',
        paragraphs: [
          'This site is intended for adults arranging residential service. It is not directed at children under 18, and we do not knowingly collect their personal information. If you believe a child has given us information, contact us and we will delete it.',
        ],
      },
      {
        heading: 'Your rights',
        paragraphs: [
          'Depending on where you live — including under the CCPA/CPRA in California and comparable laws in other US states — you may have the right to:',
        ],
        bullets: [
          'Know what personal information we hold about you and how we use it.',
          'Receive a copy of it in a portable form.',
          'Correct information that is inaccurate.',
          'Delete information, subject to exceptions we are required to observe.',
          'Opt out of sale or sharing — though as stated above, we do neither.',
          'Not be discriminated against for exercising any of these rights.',
        ],
      },
      {
        heading: 'Exercising your rights',
        paragraphs: [
          `Write to ${LEGAL.email} or call ${SITE.phoneDisplay}. We will verify your request against the information we already hold before acting on it, and respond within the period the applicable law allows. An authorised agent may act for you with written permission.`,
        ],
      },
      {
        heading: 'Changes to this policy',
        paragraphs: [
          'We update this policy when our practices change. The effective date at the top of the page shows when it was last revised, and the current version always appears here.',
        ],
      },
      CONTACT_BLOCK('this policy or the data we hold'),
    ],
  },

  /* ---------------------------------------------------------------- 2 ----- */
  {
    slug: 'disclaimer',
    title: 'Disclaimer',
    navLabel: 'Disclaimer',
    description:
      'Our relationship to the network operator, and the limits of the pricing, speed and availability information published on this site.',
    blocks: [
      {
        heading: 'Independent retailer',
        paragraphs: [
          RETAILER_STATUS,
          `This site is not the network operator's official website, and nothing here should be read as a statement made by the operator.`,
        ],
      },
      {
        heading: 'Pricing and promotions',
        paragraphs: [
          'Rates, promotional terms and plan inclusions shown here reflect residential offers as we understand them and can change at any time without notice. Advertised rates are introductory and apply for the stated promotional period; the standard rate applies afterwards. Taxes and government fees are additional and vary by location.',
          'The rate that applies to you is the one confirmed on your order and on your bill from the network operator.',
        ],
      },
      {
        heading: 'Speeds',
        paragraphs: [
          'Speeds shown are maximums, not guarantees. Actual throughput varies with in-home wiring, router and device capability, wireless conditions, simultaneous usage and other network factors. Reaching multi-gigabit speeds requires equipment rated for those speeds and a wired connection.',
        ],
      },
      {
        heading: 'Availability',
        paragraphs: [
          'Fiber is built street by street. Serviceability is determined by the exact service address and is never guaranteed by ZIP code. The availability checker on this site makes no representation that service can be delivered to you; it only moves you to the step where an address can be verified.',
        ],
      },
      {
        heading: 'No professional advice',
        paragraphs: [
          'Content on this site is general information about consumer broadband products. It is not legal, financial or technical advice, and should not be relied on as a substitute for advice about your circumstances.',
        ],
      },
      {
        heading: 'No warranties',
        paragraphs: [
          'This site is provided on an "as is" and "as available" basis. To the fullest extent permitted by law we disclaim all warranties, express or implied, including merchantability, fitness for a particular purpose and non-infringement. We do not warrant that the site will be uninterrupted, error-free or free of harmful components.',
        ],
      },
      {
        heading: 'Limitation of liability',
        paragraphs: [
          `To the fullest extent permitted by law, ${LEGAL.entityName} is not liable for indirect, incidental, special, consequential or punitive damages, or for lost profits or data, arising from your use of this site or reliance on information published on it.`,
        ],
      },
      {
        heading: 'External links',
        paragraphs: [
          'Where this site links to a third-party website, we do not control that site and are not responsible for its content, practices or availability. A link is not an endorsement.',
        ],
      },
      CONTACT_BLOCK('this disclaimer'),
    ],
  },

  /* ---------------------------------------------------------------- 3 ----- */
  {
    slug: 'cookies-policy',
    title: 'Cookies Policy',
    navLabel: 'Cookies Policy',
    description:
      'The small number of cookies and similar technologies this site uses, what each is for, and how to control them.',
    blocks: [
      {
        heading: 'What cookies are',
        paragraphs: [
          'Cookies are small text files a site stores in your browser. Similar technologies — local storage, pixels and scripts — do comparable work. They let a site remember a preference between visits or measure how a page is used.',
        ],
      },
      {
        heading: 'What we use',
        paragraphs: ['We keep this deliberately minimal:'],
        bullets: [
          '**Strictly necessary** — needed for the site to load and stay secure. These cannot be switched off.',
          '**Preferences** — remember choices you make, such as dismissing a notice, so the site behaves consistently.',
          '**Analytics** — tell us, in aggregate, which pages are read and which calls-to-action are used, so we can improve the page. These do not identify you personally.',
          '**Advertising measurement** — where we run advertising, these attribute a visit or a call to the campaign that produced it.',
        ],
      },
      {
        heading: 'What we do not use',
        paragraphs: [
          'We do not use cookies to build advertising profiles about you across unrelated websites, and we do not sell information collected through cookies.',
        ],
      },
      {
        heading: 'Managing cookies',
        paragraphs: [
          'Every major browser lets you see the cookies stored, delete them, and refuse new ones — usually under Settings, then Privacy. You can also browse in a private window, which discards them when you close it.',
          'Blocking strictly necessary cookies may stop parts of the site from working. Blocking the others will not.',
        ],
      },
      {
        heading: 'Do Not Track and global signals',
        paragraphs: [
          'Browsers send Do Not Track and Global Privacy Control signals inconsistently. Where we are required to honour an opt-out preference signal, we do. Because we do not sell or share personal information for cross-context behavioural advertising, there is nothing further to opt out of.',
        ],
      },
      {
        heading: 'Changes',
        paragraphs: [
          'If the cookies we use change, this page changes with them and the effective date is updated.',
        ],
      },
      CONTACT_BLOCK('cookies on this site'),
    ],
  },

  /* ---------------------------------------------------------------- 4 ----- */
  {
    slug: 'tcpa-policy',
    title: 'TCPA Policy',
    navLabel: 'TCPA Policy',
    description:
      'How we handle calls and text messages under the Telephone Consumer Protection Act, including consent, opt-out and do-not-call rights.',
    blocks: [
      {
        heading: 'Calls you place to us',
        paragraphs: [
          `When you dial ${SITE.phoneDisplay}, you are starting the conversation. No autodialer or prerecorded message is used to reach you, and no prior consent is needed for a call you make yourself.`,
        ],
      },
      {
        heading: 'Consent for calls and messages from us',
        paragraphs: [
          'If you give us your telephone number — on a call, or through a form — you agree that we and those working on our behalf may contact you at that number about the service you enquired about, including by automatic telephone dialling system, prerecorded or artificial voice, and SMS.',
          '**Consent is not a condition of purchasing any product or service.** You can arrange service without agreeing to be contacted this way; simply tell us and we will note it.',
        ],
      },
      {
        heading: 'Message frequency and charges',
        paragraphs: [
          'Message frequency varies with your enquiry. Message and data rates may apply according to your own mobile plan. We do not charge for the messages themselves.',
        ],
      },
      {
        heading: 'How to opt out',
        bullets: [
          'Reply STOP to any text message to end texts to that number.',
          'Reply HELP to any text message for assistance.',
          'Tell the representative on any call that you want to be removed.',
          `Write to ${LEGAL.email} with the number you want removed.`,
        ],
        footnote: [
          'We action opt-outs promptly. You may receive one final message confirming the request.',
        ],
      },
      {
        heading: 'Do-not-call rights',
        paragraphs: [
          'We maintain an internal do-not-call list and honour the National Do Not Call Registry. Ask to be added to our internal list and we will keep your number on it, and provide our do-not-call policy in writing on request.',
        ],
      },
      {
        heading: 'Call recording',
        paragraphs: [
          'Calls may be monitored or recorded for quality assurance and training. You will be told at the start of a call where recording applies. If you would rather not be recorded, say so and we will continue without it or arrange another way to help.',
        ],
      },
      {
        heading: 'Carrier liability',
        paragraphs: [
          'Mobile carriers are not liable for delayed or undelivered messages. Delivery depends on your carrier and your device.',
        ],
      },
      CONTACT_BLOCK('this policy, consent or an opt-out request'),
    ],
  },

  /* ---------------------------------------------------------------- 5 ----- */
  {
    slug: 'trademarks',
    title: 'Trademarks',
    navLabel: 'Trademarks',
    description:
      'Ownership of the marks that appear on this site, and the basis on which we refer to them.',
    blocks: [
      {
        heading: 'Ownership',
        paragraphs: [
          `${SITE.brandName} and the ${SITE.brandName} logo are trademarks of their respective owner. All other product names, logos, brands and marks appearing on this site are the property of their respective owners.`,
          'No ownership of any third-party mark is claimed by us, and nothing on this site transfers any right in a mark to you.',
        ],
      },
      {
        heading: 'Why the marks appear here',
        paragraphs: [
          RETAILER_STATUS,
          'We refer to the operator by name because that is the service we are authorised to sell, and because naming it accurately is the only way to describe what we offer. Marks are used descriptively to identify the services available through us — not to suggest that the mark holder produced, endorsed or sponsored this site.',
        ],
      },
      {
        heading: 'No endorsement or affiliation',
        paragraphs: [
          'Use of a third-party mark does not imply any partnership, joint venture, endorsement or affiliation beyond the authorised retailer relationship described above.',
        ],
      },
      {
        heading: 'Our own material',
        paragraphs: [
          `The design, layout, original copy and photography on this site are owned by ${LEGAL.entityName} or licensed to us, and may not be copied or reused without permission.`,
        ],
      },
      {
        heading: 'Reporting a concern',
        paragraphs: [
          `If you own a mark and believe it has been used incorrectly on this site, write to ${LEGAL.email} with the mark, where it appears and the correction you are asking for. We review these promptly and correct genuine errors.`,
        ],
      },
      CONTACT_BLOCK('trademark use on this site'),
    ],
  },

  /* ---------------------------------------------------------------- 6 ----- */
  {
    slug: 'marketing-policy',
    title: 'Marketing Policy',
    navLabel: 'Marketing Policy',
    description:
      'The standards we hold our own advertising to, and what we require of anyone who markets on our behalf.',
    blocks: [
      {
        heading: 'Scope',
        paragraphs: [
          `This policy applies to all marketing carried out by ${LEGAL.entityName} and by any publisher, affiliate, agency or call centre working on our behalf.`,
        ],
      },
      {
        heading: 'Accuracy',
        bullets: [
          'Advertised rates state the promotional period and the standard rate that follows it.',
          'Speed claims are presented as maximums, with the qualifications that apply.',
          'Availability is never implied for an address we have not checked.',
          'Every material term needed to understand an offer appears with the offer, not behind a link.',
        ],
      },
      {
        heading: 'Identifying ourselves',
        paragraphs: [
          'We identify ourselves as an independent authorized retailer in our advertising and at the start of a call. We never present ourselves as the network operator, as its customer service department, or as a government or consumer body.',
        ],
      },
      {
        heading: 'What we prohibit',
        bullets: [
          'Claiming or implying that a caller has reached the network operator directly.',
          'Fabricated urgency, countdowns or offers that do not exist.',
          'Rate quotes that omit the standard rate, taxes or fees.',
          'Unsolicited calls to numbers on the National Do Not Call Registry or our internal list.',
          'Buying or using lead lists gathered without valid consent.',
          'Bidding on or imitating the operator’s branding in a way likely to confuse a consumer about who they are dealing with.',
        ],
      },
      {
        heading: 'Partners and affiliates',
        paragraphs: [
          'Anyone marketing on our behalf agrees to these standards in writing before campaigns begin. We audit partner creative and call handling, and we terminate partners who breach this policy.',
        ],
      },
      {
        heading: 'Raising a concern',
        paragraphs: [
          `If you have seen marketing that claims to represent us and falls short of this policy, tell us at ${LEGAL.email}. Include where you saw it, and a screenshot or the calling number if you have one. We investigate every report.`,
        ],
      },
      CONTACT_BLOCK('our marketing practices'),
    ],
  },

  /* ---------------------------------------------------------------- 7 ----- */
  {
    slug: 'service-fulfillment',
    title: 'Service Fulfillment',
    navLabel: 'Service Fulfillment',
    description:
      'What we do when you place an order, what the network operator does, and what to expect between order and activation.',
    blocks: [
      {
        heading: 'Our role, and the operator’s',
        paragraphs: [
          RETAILER_STATUS,
          'In practice: we confirm what is serviceable at your address, explain the plans and the rates, and submit the order. The network operator provisions the line, performs the installation, activates the service and bills you directly under its own subscriber terms.',
        ],
      },
      {
        heading: 'Placing an order',
        bullets: [
          'You give us the exact service address so serviceability can be verified.',
          'We confirm the plans available there, the promotional rate and the standard rate that follows.',
          'You choose the plan, whether to add a home phone line, and whether you need rented WiFi equipment.',
          'We read the material terms back to you before anything is submitted.',
        ],
      },
      {
        heading: 'Installation',
        paragraphs: [
          'Installation is scheduled with the operator once the order is accepted. A technician brings the line to the property, commissions the equipment and confirms the connection is working before the appointment closes. Where a neighbourhood is still under construction, a pre-order holds your place and nothing is charged until service is live.',
        ],
      },
      {
        heading: 'Equipment',
        paragraphs: [
          'Renting WiFi equipment is optional on every plan listed on this site. You may use your own router. Any rented equipment remains the property of the network operator and is returned under its terms if you cancel.',
        ],
      },
      {
        heading: 'Billing',
        paragraphs: [
          'Your account, invoices and payments are held by the network operator, not by us. We do not bill you, take payment for monthly service, or hold your account. Promotional rates run for the stated period, after which the standard rate applies. Taxes and government fees are additional.',
        ],
      },
      {
        heading: 'Changing or cancelling an order',
        paragraphs: [
          `If you want to change or cancel an order we placed and installation has not yet happened, call us on ${SITE.phoneDisplay} and we will process it. Once service is active, your agreement is with the network operator and any change is made on your account under its terms.`,
        ],
      },
      {
        heading: 'If something goes wrong',
        paragraphs: [
          'If an order we placed was set up incorrectly — the wrong plan, the wrong rate, a missed appointment — tell us. We placed it, so we will work to correct it.',
        ],
      },
      CONTACT_BLOCK('an order placed through us'),
    ],
  },

  /* ---------------------------------------------------------------- 8 ----- */
  {
    slug: 'pci-dss',
    title: 'PCI DSS',
    navLabel: 'PCI DSS',
    description:
      'How payment card data is handled in relation to this site — and why this site never touches it.',
    blocks: [
      {
        heading: 'What PCI DSS is',
        paragraphs: [
          'The Payment Card Industry Data Security Standard is the framework the card brands require of any organisation that stores, processes or transmits cardholder data. It covers network security, access control, encryption, monitoring and testing.',
        ],
      },
      {
        heading: 'This site does not take payments',
        paragraphs: [
          '**No part of this website collects, processes, transmits or stores payment card data.** There is no checkout, no payment form and no card field anywhere on it. You cannot pay us here, and you should never be asked to.',
          'If any page presenting itself as ours asks you to enter card details, it is not ours. Please report it to us immediately.',
        ],
      },
      {
        heading: 'How payment details are handled',
        paragraphs: [
          'Monthly service is billed by the network operator, which holds your account and takes payment through its own PCI DSS compliant systems. Where a deposit or one-time charge applies at the point of order, it is taken by the operator through those systems — not by us.',
        ],
      },
      {
        heading: 'What our representatives will never do',
        bullets: [
          'Ask you to read a full card number aloud so it can be written down.',
          'Ask for a card number, CVV or PIN by email, SMS or chat.',
          'Ask you to send payment by gift card, wire transfer or cryptocurrency.',
          'Store your card details in our systems in any form.',
        ],
      },
      {
        heading: 'Our safeguards',
        paragraphs: [
          'Because we operate outside the cardholder data environment, our obligation is to keep it that way. We serve this site over HTTPS, keep our platform patched, restrict access to order records to the staff who need it, and train representatives never to solicit or record card data.',
        ],
      },
      {
        heading: 'Reporting a concern',
        paragraphs: [
          `If you believe you were asked for card details by someone claiming to represent us, contact ${LEGAL.email} or call ${SITE.phoneDisplay} straight away, and contact your card issuer. We investigate every report.`,
        ],
      },
      CONTACT_BLOCK('payment handling'),
    ],
  },
];

/** Lookup by slug, used by the dynamic route. */
export function legalPageBySlug(slug: string): LegalPage | undefined {
  return LEGAL_PAGES.find((page) => page.slug === slug);
}
