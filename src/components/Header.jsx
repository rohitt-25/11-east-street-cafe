import React, { useState } from 'react'
import { BUSINESS } from '../data.js'
import { PhoneIcon, WhatsAppIcon } from './ui.jsx'

const NAV = [
  { label: 'Specialties', href: '#specialties' },
  { label: 'Our London Street', href: '#london-street' },
  { label: 'Reserve', href: '#reserve' },
  { label: 'Hours & Location', href: '#hours' },
  { label: 'FAQ', href: '#faq' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-page/95 backdrop-blur-sm">
      <div className="mx-auto flex min-h-[68px] max-w-[1240px] items-center justify-between gap-[24px] px-[20px] py-[8px] md:px-[32px]">
        <a
          href="#top"
          className="font-display text-[17px] font-semibold uppercase tracking-[0.14em] text-ink md:text-[19px]"
        >
          11 East Street Cafe
        </a>

        <nav className="hidden items-center gap-[24px] lg:flex" aria-label="Primary">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[14px] font-medium text-muted-ink transition-colors duration-300 hover:text-brand"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-[8px]">
          <a
            href={BUSINESS.phoneHref}
            className="hidden min-h-[44px] items-center gap-[8px] rounded-full px-[12px] text-[14px] font-medium text-ink transition-colors duration-300 hover:text-brand md:inline-flex"
          >
            <PhoneIcon className="h-4 w-4" />
            {BUSINESS.phoneDisplay}
          </a>
          <a
            href={BUSINESS.phoneHref}
            aria-label={`Call ${BUSINESS.name}`}
            className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-full border border-line text-ink transition-colors duration-300 hover:bg-line/50 md:hidden"
          >
            <PhoneIcon className="h-5 w-5" />
          </a>
          <a
            href={BUSINESS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-[44px] items-center gap-[8px] rounded-full bg-brand px-[20px] text-[14px] font-medium text-white transition-all duration-300 hover:brightness-110 sm:inline-flex"
          >
            <WhatsAppIcon className="h-[18px] w-[18px]" />
            Order on WhatsApp
          </a>
          <a
            href={BUSINESS.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Order on WhatsApp"
            className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-full bg-brand text-white sm:hidden"
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle menu"
            className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-full border border-line text-ink lg:hidden"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? (
                <>
                  <path d="M5 5l14 14" />
                  <path d="M19 5L5 19" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-line bg-page px-[20px] py-[8px] lg:hidden"
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex min-h-[48px] items-center border-b border-line/70 text-[16px] font-medium text-ink last:border-b-0"
            >
              {item.label}
            </a>
          ))}
        </nav>
      ) : null}
    </header>
  )
}
