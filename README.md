# miunita studios

The storefront for miunita studios — art prints, stickers, enamel pins and washi tape.

React + Vite. Pink and cream with the cat mascot's chocolate-brown outline as the ink colour.

Live at <https://miunita-studios.miunita-studios.workers.dev>

## Running it

Two ways, depending on whether you want to edit or just look.

**To work on it** — live reload, changes appear as you save:

```bash
npm install && npm run dev
```

Then open http://localhost:5173.

**To just open it** — no terminal needed after the build:

```bash
npm run build
```

That produces `dist/index.html` as a **single self-contained file** with the JavaScript,
styles, fonts and logo all inlined. Double-click it in Finder and it opens in your browser.
You can email it, put it on a USB stick, or open it on a plane.

> The single-file build is not just tidiness. A normal Vite build splits the JavaScript into
> a separate `assets/` file loaded as an ES module, and browsers refuse to load module
> scripts over `file://` for security reasons — so it would show a blank page when opened
> from Finder even though it works fine on a server. Inlining everything sidesteps that.
> This is also why routing uses `HashRouter` rather than `BrowserRouter`.

## What's in it

| Page | Route | What it does |
| --- | --- | --- |
| Home | `#/` | Hero, featured products, category tiles, sticker club signup |
| Shop | `#/shop` | Full catalogue, category filters, sorting |
| Product | `#/product/peachy-cat-print` | Detail, quantity, add to cart, related items |
| About | `#/about` | Studio story, shipping and returns, contact |

Filters live in the URL, so `#/shop?category=pins` is a real link you can share or bookmark.

The cart is a slide-out drawer. It totals correctly, tracks progress toward free shipping, and
survives a page reload via `localStorage`. Checkout is deliberately not wired up — there's no
payment backend, so the button explains that rather than dead-ending.

Responsive from 375px up: the product grid runs 2 columns on a phone, 3 on a tablet and 4 on a
desktop, and the nav collapses to a hamburger below 900px.

## Putting it online

Live at **https://miunita-studios.miunita-studios.workers.dev**

To publish changes:

```bash
npm run deploy
```

That rebuilds and uploads. On a new machine, run `npx wrangler login` once first.

A few things worth knowing about this setup:

- It deploys to **Cloudflare Workers static assets**, not Cloudflare Pages. Cloudflare
  has folded Pages into Workers, and `wrangler deploy` driven by `wrangler.jsonc` is the
  current path. That is why the URL is `workers.dev` rather than `pages.dev`.
- The first deploy warned that no `workers.dev` subdomain was registered, and the URL
  returned nothing for a few minutes. That was DNS propagation, not a misconfiguration.
  If a fresh deploy ever looks dead, give it five minutes before debugging it.
- `wrangler.jsonc` is the project config and belongs in git. The `dist/wrangler.json` and
  `dist/.assetsignore` that appear after a build are generated metadata; `.assetsignore`
  keeps them from being served.
- Free tier, HTTPS included, no card required.

### A custom domain

Buy the domain wherever you like (~$12/year for a `.com`), then in the Cloudflare dashboard
open the Worker → Settings → Domains & Routes → Add custom domain. Cloudflare issues the
certificate. Attaching a domain costs nothing beyond the domain itself.

If you have a student email, the GitHub Student Developer Pack includes a free `.me` domain
for the first year through Namecheap.

### Why there are no redirect rules

Single-page apps normally need a rule sending every path back to `index.html`, or deep links
404. Two things make that a non-issue here: routing happens on the URL hash (`#/shop`), which
browsers never send to the server, and `wrangler.jsonc` sets `not_found_handling` to
`single-page-application` so any unknown path serves the app anyway.

## Adding a product

Everything comes from one file: `src/data/products.js`. Add an object to the array and it shows
up in the shop, gets its own page, and can be added to the cart. Nothing else to touch.

```js
{
  id: 13,
  slug: 'lemon-sticker-sheet',      // the URL: #/product/lemon-sticker-sheet
  name: 'Lemon Sticker Sheet',
  category: 'stickers',             // prints | stickers | pins | washi
  price: 6,
  tint: 'butter',                   // pink | mint | periwinkle | butter
  art: 'sheet',                     // placeholder drawing, see below
  blurb: 'Short line for the product page.',
  details: 'Size, materials, that kind of thing.',
  featured: true,                   // optional — puts it on the homepage
  added: '2026-08-11',              // used by the "newest" sort
}
```

### Product images

There are no photos yet, so each product renders a drawn placeholder picked by its `art` field
(`cat`, `sheet`, `mushroom`, `washi`, `moon`, `shelf`, `bell` — all in
`src/components/ui/ProductArt.jsx`).

When you have real photos, drop them in `public/products/` and add an `image` field:

```js
image: './products/lemon-sticker-sheet.jpg',
```

Any product with an `image` uses the photo instead of the drawing. You can mix the two freely
while you work through the catalogue — no code changes needed.

## Colours

The palette in `src/styles/tokens.css` is sampled directly from the logo artwork, so the site
and the mascot always agree:

| | |
| --- | --- |
| `#FDBACB` | the logo's background pink |
| `#774433` | the outline brown — used as the main text colour |
| `#D1D1D1` | the grey head patches |
| `#FFE5BC` | the collar bell |
| `#CAD9F9` | the collar |

Change a value there and it updates everywhere.

## Layout

```
src/
├── assets/miunita-logo.jpg     the logo, circle-cropped everywhere it appears
├── data/products.js            the catalogue
├── context/CartContext.jsx     cart state + localStorage
├── components/
│   ├── layout/                 header, footer
│   ├── cart/                   the drawer
│   ├── ui/                     buttons, dividers, product cards, placeholder art
│   └── home/                   homepage sections
├── pages/                      one file per route
└── styles/tokens.css           colours, type, spacing
```

## Not included

No real checkout, payments or backend, no CMS, and no stock tracking. This is the shop front —
it's ready to be pointed at Shopify, Etsy or similar when you want to actually take money.
