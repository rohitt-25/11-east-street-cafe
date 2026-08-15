# Mobile QA Checklist — 11 East Street Cafe

Walk through this standing in the cafe with a phone, on real mobile data (not wifi).
Tick each item before handing the site to the owner.

1. [ ] Hero loads with the storefront photo visible and headline readable within 2.5 seconds.
2. [ ] Both hero CTAs ("Order on WhatsApp", "Explore the Menu") are tappable without zooming and don't overlap.
3. [ ] Tapping the floating WhatsApp button opens WhatsApp with +91 98765 43210 pre-filled or ready to chat.
4. [ ] Tapping the header phone number opens the phone dialer with +91 98765 43210 pre-filled.
5. [ ] Scroll through all 7 sections in order — nothing overlaps, no horizontal scroll appears anywhere.
6. [ ] Bento cards in "The East Street Specialties" stack full-width, single column, with clear gaps.
7. [ ] The hours table renders as a real readable table (not cut off or overlapping) with all 7 days visible.
8. [ ] The Google Maps section opens directions correctly when tapped.
9. [ ] FAQ accordion items expand/collapse smoothly and only one animates at a time.
10. [ ] Turn on "reduce motion" in phone accessibility settings and reload — confirm all cards/text appear immediately with no stuck-invisible elements.
11. [ ] Confirm the two review quotes display in full, correctly attributed to Sneha Kulkarni and Arjun Bhosale with their real relative dates.
12. [ ] Run a Lighthouse mobile audit (Chrome DevTools, throttled to "Slow 4G"/mid-tier device) and confirm performance, accessibility and SEO scores are all 90+.

## Before go-live

- Replace the canonical URL and `og:url` placeholders in `index.html` with the live domain.
- Re-host the three Google-listing photos (storefront, interior/bus seating, filter coffee) from your
  own asset storage or the owner's photography, keeping the same alt text and aspect ratios, and
  regenerate the responsive widths used in `src/App.jsx` (`srcSet`) and the hero preload in `index.html`.
- Point `og:image` at the re-hosted storefront photo.
