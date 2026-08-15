import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Ship the main stylesheet non-render-blocking: the above-the-fold CSS for the
// header and hero is inlined in index.html, everything else swaps in on load.
function deferMainCss() {
  return {
    name: 'defer-main-css',
    enforce: 'post',
    apply: 'build',
    transformIndexHtml(html) {
      return html.replace(
        /<link rel="stylesheet"([^>]*?)href="(\/assets\/[^"]+\.css)"([^>]*)>/g,
        (_m, pre, href, post) =>
          `<link rel="stylesheet"${pre}href="${href}"${post} media="print" onload="this.media='all'">` +
          `<noscript><link rel="stylesheet" href="${href}"></noscript>`
      )
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), deferMainCss()],
})
