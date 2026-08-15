import React from 'react'

/* Outer shell: hairline border + small padding, wrapping an inner white surface. */
export function Shell({ className = '', innerClassName = '', children, as: Tag = 'div', ...rest }) {
  return (
    <Tag
      className={`rounded-[24px] border border-line bg-line/25 p-[6px] ${className}`}
      {...rest}
    >
      <div
        className={`h-full rounded-[16px] bg-surface shadow-[var(--shadow-warm)] ${innerClassName}`}
      >
        {children}
      </div>
    </Tag>
  )
}

/* Interactive shell — used for the clickable specialty cards. */
export function LinkCard({ href, className = '', innerClassName = '', children, ...rest }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block rounded-[24px] border border-line bg-line/25 p-[6px] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.02] focus-visible:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:scale-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand ${className}`}
      {...rest}
    >
      <div
        className={`flex h-full flex-col overflow-hidden rounded-[16px] bg-surface shadow-[var(--shadow-warm)] transition-shadow duration-500 group-hover:shadow-[var(--shadow-warm-lift)] ${innerClassName}`}
      >
        {children}
      </div>
    </a>
  )
}

const btnBase =
  'inline-flex min-h-[48px] items-center justify-center gap-[8px] rounded-full px-[24px] text-[15px] font-medium leading-none transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand motion-reduce:transition-none motion-reduce:hover:scale-100'

export function PrimaryButton({ className = '', children, ...rest }) {
  return (
    <a
      className={`${btnBase} bg-brand text-white shadow-[var(--shadow-warm)] hover:brightness-110 hover:shadow-[var(--shadow-warm-lift)] ${className}`}
      {...rest}
    >
      {children}
    </a>
  )
}

export function GhostButton({ className = '', children, ...rest }) {
  return (
    <a
      className={`${btnBase} border-2 border-brand bg-transparent text-brand hover:bg-brand hover:text-white hover:shadow-[var(--shadow-warm-lift)] ${className}`}
      {...rest}
    >
      {children}
    </a>
  )
}

export function SectionHeading({ eyebrow, title, intro, className = '' }) {
  return (
    <header className={`max-w-[720px] ${className}`} data-reveal>
      {eyebrow ? (
        <p className="mb-[8px] text-[13px] font-medium uppercase tracking-[0.18em] text-brand-soft">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-[28px] font-semibold leading-[1.12] tracking-[-0.01em] text-ink md:text-[40px] lg:text-[44px]">
        {title}
      </h2>
      {intro ? (
        <p className="mt-[24px] text-[17px] leading-[1.65] text-muted-ink md:text-[18px]">{intro}</p>
      ) : null}
    </header>
  )
}

export function WhatsAppIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className={className}>
      <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.45 1.34 4.95L2 22l5.23-1.37a9.9 9.9 0 0 0 4.81 1.23h.01c5.5 0 9.96-4.46 9.96-9.96C22.01 6.46 17.54 2 12.04 2Zm0 18.02h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.1.81.83-3.02-.2-.31a8.24 8.24 0 0 1 12.8-10.2 8.24 8.24 0 0 1-5.83 14.05Zm4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.09-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.47c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.17 1.73 2.64 4.2 3.7.59.26 1.04.41 1.4.52.59.19 1.12.16 1.55.1.47-.07 1.47-.6 1.68-1.19.2-.58.2-1.08.15-1.18-.06-.11-.23-.17-.48-.29Z" />
    </svg>
  )
}

export function PhoneIcon({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className={className}>
      <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.85 21 3 13.15 3 3.5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.7Z" />
    </svg>
  )
}

/**
 * The three photos are Google-hosted listing images, which accept sizing
 * directives after `=`. `-rw` asks for a modern format (WebP/AVIF) so mobile
 * never downloads a full-size desktop JPEG and scales it down in CSS.
 *
 * FREELANCER NOTE: before go-live, re-host these three photos on your own
 * storage (or swap in the owner's photography) at the same aspect ratios and
 * keep the alt text below verbatim — Google listing URLs can expire or start
 * blocking hotlinks. buildUrl/buildSrcSet degrade to the plain URL for any
 * source that isn't a Google-hosted one, so self-hosted files just work.
 */
const GOOGLE_PHOTO = /^(https:\/\/lh\d\.googleusercontent\.com\/.+?)=w\d+-h\d+$/
export const SRC_WIDTHS = [480, 768, 1200, 1600]

function buildUrl(src, width, height) {
  const m = src.match(GOOGLE_PHOTO)
  if (!m) return src
  return `${m[1]}=w${width}-h${height}-rw`
}

function buildSrcSet(src, width, height) {
  const m = src.match(GOOGLE_PHOTO)
  if (!m) return undefined
  const ratio = height / width
  return SRC_WIDTHS.filter((w) => w <= width)
    .map((w) => `${m[1]}=w${w}-h${Math.round(w * ratio)}-rw ${w}w`)
    .join(', ')
}

export function Photo({
  src,
  alt,
  className = '',
  width = 1600,
  height = 900,
  eager = false,
  sizes = '(min-width: 768px) 50vw, 100vw',
}) {
  return (
    <img
      src={buildUrl(src, width, height)}
      srcSet={buildSrcSet(src, width, height)}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      decoding={eager ? 'sync' : 'async'}
      fetchPriority={eager ? 'high' : 'auto'}
      className={`img-graded ${className}`}
      style={{ backgroundColor: '#EDEEF0', aspectRatio: `${width} / ${height}` }}
    />
  )
}
