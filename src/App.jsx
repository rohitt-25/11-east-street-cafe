import { useEffect, useState } from 'react'
import { initMotion } from './motion.js'

const WHATSAPP = 'https://wa.me/919876543210'
const PHONE_DISPLAY = '+91 98765 43210'
const PHONE_TEL = 'tel:+919876543210'
const MAPS_LISTING = 'https://maps.google.com/?cid=11eaststreet'
const ADDRESS = '11 East Street Cafe, Virvani Plaza, 11, East St, Camp, Pune, Maharashtra'
const MAPS_EMBED =
  'https://maps.google.com/maps?q=' +
  encodeURIComponent('Virvani Plaza, 11, East St, Camp, Pune, Maharashtra') +
  '&output=embed'
const DIRECTIONS =
  'https://www.google.com/maps/dir/?api=1&destination=' +
  encodeURIComponent('Virvani Plaza, 11, East St, Camp, Pune, Maharashtra')

const HERO_PHOTO = 'https://lh3.googleusercontent.com/p/AF1QipN-cafe-storefront=w1600-h900'
const INTERIOR_PHOTO = 'https://lh3.googleusercontent.com/p/AF1QipM-interior-seating=w1600-h900'
const COFFEE_PHOTO = 'https://lh3.googleusercontent.com/p/AF1QipO-filter-coffee=w1200-h900'

// Google's lh3 host serves a resized, WebP-encoded variant via the =wN-hM-rw
// suffix, so each image is fetched near the size it actually renders at rather
// than a full-width desktop file scaled down in CSS. The plain URLs above stay
// as the `src` fallback.
// FREELANCER: after re-hosting these three photos, regenerate the same widths
// from your own storage and keep the aspect ratios identical so nothing reflows.
const srcSet = (base, widths) =>
  widths
    .map((w) => `${base.replace(/=w\d+-h\d+$/, `=w${w}-h${Math.round((w * 9) / 16)}-rw`)} ${w}w`)
    .join(', ')

const HERO_SRCSET = srcSet(HERO_PHOTO, [640, 960, 1280, 1600])
const INTERIOR_SRCSET = srcSet(INTERIOR_PHOTO, [480, 768, 1024, 1600])
const COFFEE_SRCSET = srcSet(COFFEE_PHOTO, [400, 640, 960, 1200])

/* ---------- primitives ---------- */

// Nested surface: hairline outer shell + inner white card.
function Shell({ className = '', children, as: As = 'div', hover = false, ...rest }) {
  return (
    <As
      className={
        'rounded-[24px] border border-[#FDE68A] bg-[#FEF3C7] p-[8px] ' +
        (hover ? 'card-hover ' : '') +
        className
      }
      {...rest}
    >
      <div className="h-full rounded-[16px] bg-[#FFFFFF] shadow-[0_2px_6px_rgba(120,53,15,0.06),0_12px_32px_rgba(120,53,15,0.08)]">
        {children}
      </div>
    </As>
  )
}

function SectionHeading({ children }) {
  return (
    <h2
      className="font-['Playfair_Display'] font-semibold text-[#78350F] text-[28px] leading-tight md:text-[40px]"
    >
      {children}
    </h2>
  )
}

function Intro({ children }) {
  return (
    <p className="mt-[8px] font-['Inter'] text-[16px] leading-relaxed text-[#64748B] md:text-[18px]">
      {children}
    </p>
  )
}

function Section({ id, children, className = '' }) {
  return (
    <section
      id={id}
      className={'mx-auto w-full max-w-[1200px] px-[24px] pt-[48px] pb-[48px] ' + className}
    >
      {children}
    </section>
  )
}

function PrimaryButton({ href, children, className = '', ...rest }) {
  return (
    <a
      href={href}
      className={
        'btn-lift inline-flex min-h-[48px] items-center justify-center gap-[8px] rounded-[16px] bg-[#92400E] px-[24px] font-["Inter"] text-[16px] font-medium text-[#FFFFFF] ' +
        className
      }
      {...rest}
    >
      {children}
    </a>
  )
}

function SecondaryButton({ href, children, className = '', ...rest }) {
  return (
    <a
      href={href}
      className={
        'btn-lift inline-flex min-h-[48px] items-center justify-center gap-[8px] rounded-[16px] border-2 border-[#92400E] bg-transparent px-[24px] font-["Inter"] text-[16px] font-medium text-[#92400E] ' +
        className
      }
      {...rest}
    >
      {children}
    </a>
  )
}

function WhatsAppIcon({ className = 'h-[24px] w-[24px]' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12.04 2C6.6 2 2.18 6.42 2.18 11.86c0 1.74.46 3.44 1.32 4.94L2 22l5.34-1.4a9.87 9.87 0 0 0 4.7 1.2h.01c5.44 0 9.86-4.42 9.86-9.86 0-2.63-1.03-5.11-2.89-6.97A9.8 9.8 0 0 0 12.04 2Zm0 1.8c2.15 0 4.17.84 5.69 2.36a8 8 0 0 1 2.36 5.7c0 4.45-3.62 8.06-8.06 8.06a8.1 8.1 0 0 1-4.12-1.13l-.3-.18-3.06.8.82-2.99-.19-.31a8.02 8.02 0 0 1-1.24-4.29c0-4.45 3.62-8.06 8.1-8.06Zm-2.5 4.06c-.19 0-.5.07-.76.35-.26.28-1 .98-1 2.4s1.02 2.78 1.17 2.97c.14.19 2 3.06 4.86 4.16 2.38.91 2.86.73 3.38.69.52-.05 1.68-.69 1.92-1.35.24-.66.24-1.23.17-1.35-.07-.12-.26-.19-.55-.33-.28-.14-1.68-.83-1.94-.92-.26-.1-.45-.14-.64.14-.19.28-.73.92-.9 1.11-.16.19-.33.21-.62.07-.28-.14-1.2-.44-2.28-1.41-.84-.75-1.41-1.68-1.58-1.96-.16-.28-.02-.44.13-.58.13-.13.28-.33.42-.5.14-.16.19-.28.28-.47.1-.19.05-.35-.02-.5-.07-.14-.63-1.55-.87-2.12-.23-.55-.46-.48-.63-.48h-.05Z" />
    </svg>
  )
}

function PhoneIcon({ className = 'h-[18px] w-[18px]' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.4 21 3 13.6 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z" />
    </svg>
  )
}

/* ---------- data ---------- */

const SPECIALTIES = [
  {
    title: 'Continental & Sizzler Mains',
    copy: 'Legendary sizzlers and hearty European mains crafted to perfection — the dish everyone at the next table is having.',
  },
  {
    title: 'Artisanal Bakery & Desserts',
    copy: 'Freshly baked pastries, signature cakes, and decadent sweet treats, baked in-house every morning.',
  },
  {
    title: 'Craft Coffee & Mocktails',
    copy: 'Expertly brewed specialty roasts and refreshing signature mocktails — Pune’s original filter coffee favourite.',
  },
]

const HOURS = [
  ['Monday', '8:00 AM – 11:00 PM'],
  ['Tuesday', '8:00 AM – 11:00 PM'],
  ['Wednesday', '8:00 AM – 11:00 PM'],
  ['Thursday', '8:00 AM – 11:00 PM'],
  ['Friday', '8:00 AM – 11:00 PM'],
  ['Saturday', '8:00 AM – 11:00 PM'],
  ['Sunday', '8:00 AM – 11:00 PM'],
]

const FAQS = [
  {
    q: 'Do you take table reservations?',
    a: 'Yes — message us on WhatsApp with your preferred date, time and party size, especially for weekends.',
  },
  {
    q: 'Is 11 East Street Cafe good for groups or long sit-downs?',
    a: 'Absolutely — our London-street seating and bus interior are built for lingering over coffee, no rush.',
  },
  {
    q: 'Do you offer home delivery or takeaway?',
    a: 'Yes, order directly on WhatsApp and skip the aggregator markup.',
  },
  {
    q: 'What are your opening hours?',
    a: 'We’re open daily, 8:00 AM to 11:00 PM, every day of the week.',
  },
]

const STATS = ['12 Years in Camp', '4.0★ Google Rating', '4,102 Happy Reviews']

/* ---------- header ---------- */

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50 border-b border-[#FDE68A] bg-[#FEF3C7]">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-[8px] px-[24px] py-[8px]">
        <a
          href="#top"
          className="font-['Playfair_Display'] text-[18px] font-semibold tracking-[0.08em] text-[#78350F] uppercase md:text-[22px]"
          style={{ fontVariantCaps: 'small-caps' }}
        >
          11 East Street Cafe
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-[8px] md:flex">
          <a
            href={PHONE_TEL}
            aria-label="Call 11 East Street Cafe"
            className="btn-lift inline-flex min-h-[44px] items-center gap-[8px] rounded-[16px] px-[16px] font-['Inter'] text-[16px] font-medium text-[#92400E]"
          >
            <PhoneIcon />
            {PHONE_DISPLAY}
          </a>
          <PrimaryButton href={WHATSAPP} className="min-h-[44px]">
            Order on WhatsApp
          </PrimaryButton>
        </nav>

        <div className="flex items-center gap-[8px] md:hidden">
          <a
            href={WHATSAPP}
            aria-label="Order on WhatsApp"
            className="btn-lift inline-flex h-[44px] w-[44px] items-center justify-center rounded-[16px] bg-[#92400E] text-[#FFFFFF]"
          >
            <WhatsAppIcon />
          </a>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-[16px] border border-[#FDE68A] text-[#78350F]"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[22px] w-[22px]" fill="currentColor">
              <path d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Sections" className="border-t border-[#FDE68A] px-[24px] py-[8px] md:hidden">
          <ul className="flex flex-col gap-[8px] font-['Inter'] text-[16px] text-[#78350F]">
            {[
              ['#specialties', 'The East Street Specialties'],
              ['#story', 'Step Into Our London Street'],
              ['#reserve', 'Reserve Your Table or Order In'],
              ['#reviews', 'What Camp Says About Us'],
              ['#hours', 'Hours & Location'],
              ['#faq', 'Good to Know'],
            ].map(([href, label]) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[44px] items-center"
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={PHONE_TEL}
                aria-label="Call 11 East Street Cafe"
                className="flex min-h-[44px] items-center gap-[8px] text-[#92400E]"
              >
                <PhoneIcon />
                {PHONE_DISPLAY}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}

/* ---------- sections ---------- */

function Hero() {
  return (
    <section
      id="top"
      className="hero relative flex min-h-[100dvh] w-full items-end overflow-hidden"
    >
      <img
        className="hero-bg photo-graded absolute left-0 top-[-10%] h-[120%] w-full object-cover"
        src={HERO_PHOTO}
        srcSet={HERO_SRCSET}
        sizes="100vw"
        alt="Storefront of 11 East Street Cafe at Virvani Plaza, Camp, Pune, showing its London-street-themed facade."
        width="1600"
        height="900"
        loading="eager"
        fetchPriority="high"
        decoding="async"
        style={{ aspectRatio: '16 / 9' }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            // bottom-weighted warm-brown scrim, strengthened so the headline and
            // subcopy clear 7:1 against the photo at every stop
            'linear-gradient(to top, rgba(120,53,15,0.96) 0%, rgba(120,53,15,0.90) 40%, rgba(120,53,15,0.72) 70%, rgba(120,53,15,0.55) 100%)',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-[24px] pt-[96px] pb-[64px]">
        <h1 className="max-w-[16ch] font-['Playfair_Display'] text-[38px] leading-[1.05] font-bold text-[#FFFFFF] md:text-[64px]">
          Pune&rsquo;s Legendary London-Street Cafe Experience.
        </h1>

        <p className="mt-[24px] max-w-[62ch] font-['Inter'] text-[16px] leading-relaxed text-[#FEF3C7] md:text-[18px]">
          Savoring 12 years of gourmet continental mains, fresh bakery bakes, and vibrant vibes in
          Camp, backed by over 4,100 reviews.
        </p>

        <ul className="mt-[24px] flex flex-wrap items-center gap-[8px]">
          {['★ 4.0 Google Rating', '4,102 Reviews', '12 Years in Camp'].map((badge) => (
            <li
              key={badge}
              className="hero-badge rounded-[16px] border border-[#FDE68A] bg-[#92400E] px-[16px] py-[8px] font-['Inter'] text-[13px] font-medium text-[#FFFFFF] md:text-[14px]"
            >
              {badge}
            </li>
          ))}
        </ul>

        <div className="mt-[32px] flex flex-col gap-[8px] sm:flex-row sm:items-center">
          <PrimaryButton href={WHATSAPP} className="hero-cta w-full sm:w-auto">
            <WhatsAppIcon className="h-[20px] w-[20px]" />
            Order on WhatsApp
          </PrimaryButton>
          <a
            href="#specialties"
            className="hero-cta btn-lift inline-flex min-h-[48px] w-full items-center justify-center rounded-[16px] border-2 border-[#92400E] bg-[#FEF3C7] px-[24px] font-['Inter'] text-[16px] font-medium text-[#92400E] sm:w-auto"
          >
            Explore the Menu
          </a>
        </div>
      </div>
    </section>
  )
}

function Specialties() {
  return (
    <Section id="specialties">
      <SectionHeading>The East Street Specialties</SectionHeading>
      <Intro>Twelve years of recipes Camp regulars still order by name.</Intro>

      <div className="specialties-grid mt-[32px] grid grid-cols-1 gap-[24px] md:grid-cols-2 md:grid-rows-2">
        <Shell
          as="a"
          hover
          href={WHATSAPP}
          className="specialty-card block md:col-span-1 md:row-span-2"
        >
          <div className="flex h-full flex-col">
            <img
              src={INTERIOR_PHOTO}
              alt="Interior seating at 11 East Street Cafe styled like a vintage London street, including the cafe's iconic red double-decker bus seating."
              width="1600"
              height="900"
              loading="lazy"
              decoding="async"
              srcSet={INTERIOR_SRCSET}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="photo-graded h-[220px] w-full rounded-t-[16px] object-cover md:h-[340px]"
            />
            <div className="flex flex-1 flex-col justify-center p-[24px]">
              <span className="font-['Inter'] text-[13px] font-medium tracking-[0.14em] text-[#B45309] uppercase">
                Signature
              </span>
              <h3 className="mt-[8px] font-['Playfair_Display'] text-[24px] font-semibold text-[#78350F] md:text-[30px]">
                {SPECIALTIES[0].title}
              </h3>
              <p className="mt-[8px] font-['Inter'] text-[16px] leading-relaxed text-[#64748B] md:text-[18px]">
                {SPECIALTIES[0].copy}
              </p>
            </div>
          </div>
        </Shell>

        {SPECIALTIES.slice(1).map((item, i) => (
          <Shell as="a" hover key={item.title} href={WHATSAPP} className="specialty-card block">
            <div className="flex h-full flex-col">
              <img
                src={i === 0 ? COFFEE_PHOTO : INTERIOR_PHOTO}
                alt={
                  i === 0
                    ? 'Close-up of freshly brewed filter coffee served at 11 East Street Cafe.'
                    : "Interior seating at 11 East Street Cafe styled like a vintage London street, including the cafe's iconic red double-decker bus seating."
                }
                width="1200"
                height="900"
                loading="lazy"
                decoding="async"
                srcSet={i === 0 ? COFFEE_SRCSET : INTERIOR_SRCSET}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="photo-graded h-[160px] w-full rounded-t-[16px] object-cover"
              />
              <div className="flex flex-1 flex-col justify-center p-[24px]">
                <h3 className="font-['Playfair_Display'] text-[22px] font-semibold text-[#78350F] md:text-[24px]">
                  {item.title}
                </h3>
                <p className="mt-[8px] font-['Inter'] text-[16px] leading-relaxed text-[#64748B]">
                  {item.copy}
                </p>
              </div>
            </div>
          </Shell>
        ))}
      </div>
    </Section>
  )
}

function Story() {
  return (
    <Section id="story">
      <SectionHeading>Step Into Our London Street</SectionHeading>

      <div className="mt-[32px] grid grid-cols-1 gap-[24px] md:grid-cols-3 md:grid-rows-2">
        <Shell hover className="story-reveal md:col-span-2 md:row-span-1">
          <div className="story-parallax-wrap h-[240px] overflow-hidden rounded-[16px] md:h-[300px]">
            <img
              src={INTERIOR_PHOTO}
              alt="Interior seating at 11 East Street Cafe styled like a vintage London street, including the cafe's iconic red double-decker bus seating."
              width="1600"
              height="900"
              loading="lazy"
              decoding="async"
              srcSet={INTERIOR_SRCSET}
              sizes="(min-width: 768px) 66vw, 100vw"
              className="story-parallax photo-graded h-[112%] w-full object-cover"
              style={{ marginTop: '-6%' }}
            />
          </div>
        </Shell>

        <Shell className="story-reveal md:col-span-1 md:row-span-2">
          <div className="flex h-full flex-col justify-center p-[24px]">
            <p className="font-['Inter'] text-[16px] leading-relaxed text-[#78350F] md:text-[18px]">
              Walk in from Camp and step onto a corner of London — our red double-decker bus,
              vintage street lamps, and cobbled-style seating have made 11 East Street a Pune
              landmark for 12 years. It&rsquo;s the table people remember, and the photo they always
              take.
            </p>
            <p className="mt-[24px] font-['Inter'] text-[13px] text-[#64748B] md:text-[14px]">
              Virvani Plaza, 11, East St, Camp, Pune
            </p>
          </div>
        </Shell>

        <Shell hover className="story-reveal md:col-span-2 md:row-span-1">
          <div className="flex h-full flex-col gap-[8px] sm:flex-row sm:items-stretch">
            <img
              src={COFFEE_PHOTO}
              alt="Close-up of freshly brewed filter coffee served at 11 East Street Cafe."
              width="1200"
              height="900"
              loading="lazy"
              decoding="async"
              srcSet={COFFEE_SRCSET}
              sizes="(min-width: 768px) 33vw, 100vw"
              className="photo-graded h-[180px] w-full rounded-t-[16px] object-cover sm:h-auto sm:w-1/2 sm:rounded-l-[16px] sm:rounded-tr-none"
            />
            <div className="flex flex-1 flex-col justify-center p-[24px]">
              <h3 className="font-['Playfair_Display'] text-[22px] font-semibold text-[#78350F]">
                Pune&rsquo;s original filter coffee favourite
              </h3>
              <p className="mt-[8px] font-['Inter'] text-[13px] text-[#64748B] md:text-[14px]">
                Brewed fresh, all day, every day.
              </p>
            </div>
          </div>
        </Shell>
      </div>
    </Section>
  )
}

function Reserve() {
  const cards = [
    {
      title: 'Reserve a Table',
      copy: 'Weekend slots fill up fast at Camp’s favourite London-street cafe. Message us your date, time and party size.',
      label: 'Book on WhatsApp',
    },
    {
      title: 'Order Directly',
      copy: 'Get your sizzlers, bakes and mocktails without the middleman markup — order straight from 11 East Street.',
      label: 'Order on WhatsApp',
    },
  ]

  return (
    <Section id="reserve">
      <SectionHeading>Reserve Your Table or Order In</SectionHeading>
      <Intro>
        Skip the aggregator fees — book your weekend table or order your favourites straight from us
        on WhatsApp.
      </Intro>

      <div className="reserve-grid mt-[32px] grid grid-cols-1 gap-[24px] md:grid-cols-2">
        {cards.map((c) => (
          <Shell hover key={c.title} className="reserve-card">
            <div className="flex h-full flex-col p-[24px]">
              <h3 className="font-['Playfair_Display'] text-[24px] font-semibold text-[#78350F] md:text-[30px]">
                {c.title}
              </h3>
              <p className="mt-[8px] font-['Inter'] text-[16px] leading-relaxed text-[#64748B] md:text-[18px]">
                {c.copy}
              </p>
              <div className="mt-[32px]">
                <PrimaryButton href={WHATSAPP} className="w-full sm:w-auto">
                  <WhatsAppIcon className="h-[20px] w-[20px]" />
                  {c.label}
                </PrimaryButton>
              </div>
            </div>
          </Shell>
        ))}
      </div>
    </Section>
  )
}

function Reviews() {
  const reviews = [
    {
      quote:
        '“Been coming to East Street Cafe since college. The filter coffee is still the best in Camp and the staff remember your order.”',
      by: '— Sneha Kulkarni, 1 month ago',
    },
    {
      quote:
        '“Perfect spot for a long breakfast. Sat for two hours with a book and nobody rushed me, which is exactly what you want on a Sunday.”',
      by: '— Arjun Bhosale, 4 months ago',
    },
  ]

  return (
    <Section id="reviews">
      <a
        href={MAPS_LISTING}
        target="_blank"
        rel="noreferrer"
        className="block"
        aria-label="Rated 4.0 stars from 4,102 Google reviews — view the Google listing"
      >
        <SectionHeading>What Camp Says About Us</SectionHeading>
        <Intro>Rated 4.0 stars from 4,102 Google reviews</Intro>

        <div className="mt-[32px] grid grid-cols-1 gap-[24px] md:grid-cols-2">
          {reviews.map((r) => (
            <Shell hover key={r.by} className="review-card">
              <div className="flex h-full flex-col p-[24px]">
                <span className="font-['Inter'] text-[18px] tracking-[0.12em] text-[#92400E]">
                  ★★★★★
                </span>
                <blockquote className="mt-[8px] font-['Inter'] text-[16px] leading-relaxed text-[#78350F] md:text-[18px]">
                  {r.quote}
                </blockquote>
                <cite className="mt-[24px] font-['Inter'] text-[13px] not-italic text-[#64748B] md:text-[14px]">
                  {r.by}
                </cite>
              </div>
            </Shell>
          ))}
        </div>
      </a>
    </Section>
  )
}

function HoursLocation() {
  return (
    <Section id="hours">
      <SectionHeading>Hours &amp; Location</SectionHeading>

      <div className="mt-[32px] grid grid-cols-1 gap-[24px] md:grid-cols-3">
        <Shell className="hours-reveal md:col-span-1">
          <div className="p-[24px]">
            <h3 className="font-['Playfair_Display'] text-[22px] font-semibold text-[#78350F]">
              Opening Hours
            </h3>
            <table className="mt-[24px] w-full border-collapse font-['Inter'] text-[16px]">
              <caption className="sr-only">Opening hours for 11 East Street Cafe</caption>
              <tbody>
                {HOURS.map(([day, time]) => (
                  <tr key={day} className="border-b border-[#EDEEF0] last:border-b-0">
                    <th
                      scope="row"
                      className="py-[8px] pr-[8px] text-left font-medium text-[#78350F]"
                    >
                      {day}
                    </th>
                    <td className="py-[8px] text-right text-[#64748B]">{time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Shell>

        <Shell className="hours-reveal md:col-span-2">
          <div className="flex h-full flex-col">
            <iframe
              title="Map showing 11 East Street Cafe at Virvani Plaza, 11, East St, Camp, Pune, Maharashtra"
              src={MAPS_EMBED}
              width="600"
              height="300"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[240px] w-full rounded-t-[16px] border-0 md:h-[300px]"
            />
            <div className="flex flex-1 flex-col p-[24px]">
              <h3 className="font-['Playfair_Display'] text-[22px] font-semibold text-[#78350F]">
                Find Us in Camp
              </h3>
              <p className="mt-[8px] font-['Inter'] text-[16px] leading-relaxed text-[#78350F]">
                {ADDRESS}
              </p>
              <div className="mt-[32px] flex flex-col gap-[8px] sm:flex-row sm:flex-wrap">
                <PrimaryButton href={DIRECTIONS} target="_blank" rel="noreferrer">
                  Get Directions
                </PrimaryButton>
                <SecondaryButton href={PHONE_TEL} aria-label="Call 11 East Street Cafe">
                  <PhoneIcon />
                  {PHONE_DISPLAY}
                </SecondaryButton>
                <SecondaryButton href={WHATSAPP}>
                  <WhatsAppIcon className="h-[20px] w-[20px]" />
                  Order on WhatsApp
                </SecondaryButton>
              </div>
            </div>
          </div>
        </Shell>
      </div>
    </Section>
  )
}

function FaqItem({ item, index, open, onToggle }) {
  const panelId = `faq-panel-${index}`
  const buttonId = `faq-button-${index}`

  return (
    <Shell>
      <div className="p-[24px]">
        <h3>
          <button
            type="button"
            id={buttonId}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={onToggle}
            className="flex min-h-[44px] w-full cursor-pointer items-center justify-between gap-[24px] text-left font-['Playfair_Display'] text-[20px] font-semibold text-[#78350F]"
          >
            {item.q}
            <span
              aria-hidden="true"
              className="font-['Inter'] text-[24px] leading-none text-[#92400E] transition-transform duration-[280ms] ease-[cubic-bezier(0.33,1,0.68,1)]"
              style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
            >
              +
            </span>
          </button>
        </h3>

        {/* answer only: opacity + max-height wrapper crossfade, never raw height */}
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          data-open={open ? 'true' : 'false'}
          className="faq-answer"
        >
          <p className="mt-[8px] font-['Inter'] text-[16px] leading-relaxed text-[#64748B] md:text-[18px]">
            {item.a}
          </p>
        </div>
      </div>
    </Shell>
  )
}

function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <Section id="faq">
      <SectionHeading>Good to Know</SectionHeading>

      <div className="mt-[32px] grid grid-cols-1 gap-[24px] md:grid-cols-2">
        {FAQS.map((f, i) => (
          <FaqItem
            key={f.q}
            item={f}
            index={i}
            open={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
          />
        ))}
      </div>
    </Section>
  )
}

function About() {
  return (
    <Section id="about">
      <div className="grid grid-cols-1 gap-[24px] md:grid-cols-3">
        {STATS.map((s) => (
          <Shell hover key={s}>
            <div className="flex h-full items-center justify-center p-[24px]">
              <p className="text-center font-['Playfair_Display'] text-[24px] font-bold text-[#92400E] md:text-[28px]">
                {s}
              </p>
            </div>
          </Shell>
        ))}
      </div>
      <p className="mt-[32px] max-w-[80ch] font-['Inter'] text-[16px] leading-relaxed text-[#64748B] md:text-[18px]">
        From a small Camp corner to Pune&rsquo;s most photographed cafe table — 11 East Street has
        been serving continental comfort food since day one.
      </p>
    </Section>
  )
}

function Footer() {
  return (
    <footer className="relative z-10 border-t border-[#FDE68A]">
      <div className="mx-auto w-full max-w-[1200px] px-[24px] pt-[48px] pb-[96px] md:pb-[48px]">
        <div className="grid grid-cols-1 gap-[32px] md:grid-cols-3">
          <div>
            <p
              className="font-['Playfair_Display'] text-[22px] font-semibold tracking-[0.08em] text-[#78350F] uppercase"
              style={{ fontVariantCaps: 'small-caps' }}
            >
              11 East Street Cafe
            </p>
            <p className="mt-[8px] font-['Inter'] text-[16px] leading-relaxed text-[#64748B]">
              {ADDRESS}
            </p>
          </div>

          <div className="flex flex-col gap-[8px] font-['Inter'] text-[16px]">
            <a
              href={PHONE_TEL}
              aria-label="Call 11 East Street Cafe"
              className="flex min-h-[44px] items-center gap-[8px] text-[#92400E]"
            >
              <PhoneIcon />
              {PHONE_DISPLAY}
            </a>
            <a
              href={WHATSAPP}
              className="flex min-h-[44px] items-center gap-[8px] text-[#92400E]"
            >
              <WhatsAppIcon className="h-[20px] w-[20px]" />
              Order on WhatsApp
            </a>
          </div>

          <div className="font-['Inter'] text-[16px] text-[#78350F]">
            <p>Open daily, 8 AM – 11 PM</p>
            <a
              href={MAPS_LISTING}
              target="_blank"
              rel="noreferrer"
              className="mt-[8px] inline-flex min-h-[44px] items-center text-[13px] text-[#64748B] md:text-[14px]"
            >
              Rated 4.0★ on Google (4,102 reviews)
            </a>
          </div>
        </div>

        <p className="mt-[32px] border-t border-[#FDE68A] pt-[24px] font-['Inter'] text-[13px] text-[#64748B]">
          © 11 East Street Cafe, Camp, Pune.
        </p>
      </div>
    </footer>
  )
}

function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP}
      aria-label="Order on WhatsApp"
      className="btn-lift fixed right-[24px] bottom-[24px] z-50 inline-flex h-[56px] w-[56px] items-center justify-center rounded-full bg-[#92400E] text-[#25D366] shadow-[0_4px_10px_rgba(120,53,15,0.10),0_20px_44px_rgba(120,53,15,0.14)]"
    >
      <WhatsAppIcon className="h-[30px] w-[30px]" />
    </a>
  )
}

/* ---------- app ---------- */

export default function App() {
  useEffect(() => {
    // after first paint, so the hero LCP never waits on the motion bundle
    const id = requestAnimationFrame(() => initMotion())
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div className="relative bg-[#FEF3C7] text-[#78350F]">
      {/* signature detail: warm film-grain paper texture, above the cream, behind content */}
      <div className="grain-overlay" aria-hidden="true" />
      <Header />
      <main className="relative z-10">
        <Hero />
        <div className="flex flex-col gap-[96px] pt-[96px] pb-[96px]">
          <Specialties />
          <Story />
          <Reserve />
          <Reviews />
          <HoursLocation />
          <Faq />
          <About />
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
