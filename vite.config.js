import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

/*
  Two things here exist purely so the built site can be opened by
  double-clicking dist/index.html, with no server involved:

  1. base: './' keeps every asset path relative.
  2. viteSingleFile() inlines the JS, CSS, fonts and logo into that one HTML
     file and emits a classic <script> instead of <script type="module">.
     This is the important one: browsers refuse to load module scripts over
     file:// under CORS, so a normal Vite build renders a blank page when
     opened from Finder even though it works perfectly over http.

  Routing uses HashRouter for the same reason — see src/App.jsx.
*/
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  base: './',
  server: {
    // Vite does not read PORT from the environment on its own. Honouring it
    // lets the dev server take whichever port is free instead of failing when
    // 5173 is already taken.
    port: Number(process.env.PORT) || 5173,
  },
  build: {
    // Inline every asset regardless of size. Without this the fonts and the
    // logo stay as separate files and the single-file output is incomplete.
    assetsInlineLimit: 100 * 1024 * 1024,
    cssCodeSplit: false,
  },
});
