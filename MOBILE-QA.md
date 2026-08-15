# 11 East Street Cafe — Mobile QA Checklist

Walk through this standing in the cafe, on a real phone, on **mobile data (not the
cafe wifi)**. Tick each item before sending the link to the owner.

1. **Hero loads fast.** Open the site cold (clear cache / private tab). The storefront
   photo is visible and the headline "Pune's Legendary London-Street Cafe Experience."
   is readable within **2.5 seconds**.
2. **Both hero CTAs are tappable.** "Order on WhatsApp" and "Explore the Menu" can be
   tapped without zooming, don't overlap each other, and both are visible without
   scrolling.
3. **Floating WhatsApp button works.** Tap the round button bottom-right — WhatsApp
   opens on a chat with **+91 98765 43210**, ready to send.
4. **Header phone number works.** Tap the phone icon/number top-right — the dialer
   opens with **+91 98765 43210** pre-filled.
5. **Full scroll, all 7 sections in order** (Specialties → Our London Street → Reserve
   → Reviews → Hours & Location → FAQ → About). Nothing overlaps and **no horizontal
   scroll** appears at any point — swipe left/right at several depths to confirm.
6. **Specialties stack correctly.** All three bento cards are full-width, single
   column, with clear gaps between them.
7. **Hours table reads properly.** All **7 days** are visible, nothing cut off or
   overlapping, times legible without zooming.
8. **Maps works.** Tap "Get Directions" — Google Maps opens with 11 East Street Cafe,
   Virvani Plaza, East St, Camp as the destination.
9. **FAQ accordion.** Items expand and collapse smoothly; opening one closes the
   other, so **only one animates at a time**.
10. **Reduced motion.** Turn on the phone's reduce-motion setting
    (iOS: Settings → Accessibility → Motion → Reduce Motion; Android: Settings →
    Accessibility → Remove animations) and reload. Every card and paragraph appears
    immediately — **nothing stuck invisible**, no parallax, no stagger.
11. **Reviews are complete and correct.** Both quotes display in full, attributed to
    **Sneha Kulkarni, 1 month ago** and **Arjun Bhosale, 4 months ago**.
12. **Lighthouse mobile audit.** Chrome DevTools → Lighthouse → Mobile, throttled to
    "Slow 4G" / mid-tier device. Confirm **Performance, Accessibility and SEO are all
    90+**. Re-run after the go-live steps below, since image hosting affects LCP.

## Before go-live (do these first)

- **Re-host the three photos.** The storefront, interior/bus and filter-coffee images
  currently point at Google-hosted listing URLs, which can expire or start blocking
  hotlinks. Download each one (or use the owner's own photography), upload to your
  asset storage, and swap the URLs in `src/data.js` — keep the **same aspect ratios**
  (16:9 storefront and interior, 4:3 coffee) and the **exact alt text**, so nothing
  reflows and accessibility stays intact. Export WebP/AVIF at 480/768/1200/1600 wide.
- **Set the real domain.** In `index.html`, replace `https://11eaststreetcafe.example/`
  in the `<link rel="canonical">`, `og:url` and `og:image` tags.
- **Confirm the WhatsApp number.** Every CTA points at `wa.me/919876543210` — verify
  it is the number the cafe actually monitors.
