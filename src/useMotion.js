import { useEffect } from 'react'

/**
 * Standard-tier motion: smooth scroll (Lenis) + GSAP/ScrollTrigger choreography.
 *
 * Loaded dynamically AFTER first paint so the hero image and headline never
 * wait on the motion bundle. Every tween lives inside a gsap.matchMedia()
 * "(prefers-reduced-motion: no-preference)" branch — when reduced motion is
 * set, nothing is created, so no element is ever left at opacity 0.
 */
export default function useMotion() {
  useEffect(() => {
    let lenis
    let mm
    let rafId
    let cancelled = false

    const start = async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      if (cancelled) return

      gsap.registerPlugin(ScrollTrigger)

      mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        lenis = new Lenis({ duration: 1.1, smoothWheel: true, anchors: { offset: -80 } })
        lenis.on('scroll', ScrollTrigger.update)

        const raf = (time) => {
          lenis.raf(time)
          rafId = requestAnimationFrame(raf)
        }
        rafId = requestAnimationFrame(raf)

        /* 1. HERO — stagger list on load (not on scroll) + background parallax. */
        gsap.from('.hero-badge, .hero-cta', {
          opacity: 0,
          scale: 0.92,
          y: 16,
          duration: 0.4,
          stagger: { each: 0.06, from: 'start' },
          ease: 'back.out(1.4)',
        })

        gsap.to('.hero-bg', {
          yPercent: -8,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', scrub: 0.5 },
        })

        /* 2. SPECIALTIES — bento stagger from the grid centre outward. */
        gsap.from('.specialty-card', {
          opacity: 0,
          scale: 0.92,
          y: 16,
          duration: 0.4,
          stagger: { each: 0.06, from: 'center', grid: 'auto' },
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: '.specialties-grid',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })

        /* Shared scroll-reveal helper: fade + small rise, no overshoot. */
        const reveal = (target, delay = 0) => {
          gsap.utils.toArray(target).forEach((el) => {
            gsap.from(el, {
              opacity: 0,
              y: 12,
              duration: 0.35,
              delay,
              ease: 'power1.out',
              scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' },
            })
          })
        }

        /* 3. LONDON STREET — image settles a beat before the copy. */
        reveal('.london-image')
        reveal('.london-text', 0.12)
        reveal('.london-secondary')

        gsap.to('.london-parallax', {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: { trigger: '.london-image', scrub: 0.5 },
        })

        /* 4. RESERVE — "Reserve a Table" settles just before "Order Directly". */
        gsap.utils.toArray('.reserve-card').forEach((el, i) => {
          gsap.from(el, {
            opacity: 0,
            y: 12,
            duration: 0.35,
            delay: i * 0.06,
            ease: 'power1.out',
            scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' },
          })
        })

        /* 5-8. Reviews, hours (as whole cards), FAQ and stats — plain reveals. */
        reveal('.review-card')
        reveal('.hours-card')
        reveal('main section:not(.hero) [data-reveal]')

        ScrollTrigger.refresh()

        return () => {
          if (rafId) cancelAnimationFrame(rafId)
          rafId = null
          if (lenis) {
            lenis.destroy()
            lenis = null
          }
        }
      })
    }

    // Two frames out: guarantees the hero has painted first.
    const kickoff = requestAnimationFrame(() => requestAnimationFrame(start))

    return () => {
      cancelled = true
      cancelAnimationFrame(kickoff)
      if (mm) mm.revert()
      if (rafId) cancelAnimationFrame(rafId)
      if (lenis) lenis.destroy()
    }
  }, [])
}
