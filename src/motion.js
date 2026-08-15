// Motion bootstrap. Loaded lazily after first paint so the hero image and
// headline never wait on the animation bundle.
//
// Every tween lives inside a gsap.matchMedia() "no-reduced-motion" branch, so
// with prefers-reduced-motion set nothing is registered at all and every element
// stays in its final, fully-visible state.
let started = false

export function initMotion() {
  if (started) return
  started = true
  if (typeof window === 'undefined') return

  Promise.all([import('gsap'), import('gsap/ScrollTrigger'), import('lenis')]).then(
    ([{ gsap }, { ScrollTrigger }, { default: Lenis }]) => {
      gsap.registerPlugin(ScrollTrigger)

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
        lenis.on('scroll', ScrollTrigger.update)

        const raf = (time) => lenis.raf(time * 1000)
        gsap.ticker.add(raf)
        gsap.ticker.lagSmoothing(0)

        /* 1. Hero — stagger reveal on load, parallax on the photo layer only */
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

        /* 2. Specialties — stagger from the grid centre outward */
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

        /* 3. Story — image settles a beat before the copy, plus a capped parallax */
        gsap.utils.toArray('.story-reveal').forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 12,
            duration: 0.35,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          })
        })

        gsap.to('.story-parallax', {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: { trigger: '.story-parallax-wrap', scrub: 0.5 },
        })

        /* 4. Reserve — fade + 12px rise, "Reserve a Table" a beat before "Order Directly" */
        gsap.from('.reserve-card', {
          opacity: 0,
          y: 12,
          duration: 0.35,
          stagger: 0.06,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: '.reserve-grid',
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })

        /* 5. Reviews — each card independently, natural scroll order */
        gsap.utils.toArray('.review-card').forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 12,
            duration: 0.35,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          })
        })

        /* 6. Hours & Location — whole cards as single units, no overshoot */
        gsap.utils.toArray('.hours-reveal').forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 12,
            duration: 0.35,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
          })
        })

        ScrollTrigger.refresh()

        return () => {
          gsap.ticker.remove(raf)
          lenis.destroy()
        }
      })
    }
  )
}
