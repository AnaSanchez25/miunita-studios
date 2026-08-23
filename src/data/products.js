/*
  The whole catalogue lives here. Every other part of the site reads from it,
  so adding a product means adding one object to this array and nothing else.

  When you have real product photos, drop them into public/products/ and set
  `image: './products/whatever.jpg'` on the item. Any product without an
  `image` falls back to a generated pastel illustration, so the grid never
  looks broken while you are still shooting photos.
*/

export const CATEGORIES = [
  { id: 'prints', label: 'art prints', blurb: 'giclée prints on heavy cotton paper', tint: 'pink' },
  { id: 'stickers', label: 'stickers', blurb: 'weatherproof vinyl, matte finish', tint: 'mint' },
  { id: 'pins', label: 'enamel pins', blurb: 'hard enamel with rubber backs', tint: 'periwinkle' },
  { id: 'washi', label: 'washi tape', blurb: 'japanese paper tape, 10m rolls', tint: 'butter' },
];

export const FREE_SHIPPING_THRESHOLD = 35;

const products = [
  {
    id: 1,
    slug: 'peachy-cat-print',
    name: 'Peachy Cat Print',
    category: 'prints',
    price: 24,
    tint: 'pink',
    art: 'cat',
    blurb: 'The house mascot, sitting politely among the peaches.',
    details: 'A4 (210 × 297mm) giclée print on 250gsm cotton rag. Signed on the back.',
    featured: true,
    added: '2026-08-01',
  },
  {
    id: 2,
    slug: 'little-guys-sticker-sheet',
    name: 'Little Guys Sticker Sheet',
    category: 'stickers',
    price: 6,
    tint: 'mint',
    art: 'sheet',
    blurb: 'Sixteen small friends for your laptop lid and water bottle.',
    details: 'A6 sheet, kiss-cut matte vinyl. Dishwasher-shy but rain-proof.',
    featured: true,
    added: '2026-08-04',
  },
  {
    id: 3,
    slug: 'mushroom-enamel-pin',
    name: 'Mushroom Enamel Pin',
    category: 'pins',
    price: 12,
    tint: 'periwinkle',
    art: 'mushroom',
    blurb: 'A very small mushroom with a very serious face.',
    details: '25mm hard enamel, gold plating, double rubber clutch backs.',
    featured: true,
    added: '2026-07-28',
  },
  {
    id: 4,
    slug: 'strawberry-washi-tape',
    name: 'Strawberry Washi Tape',
    category: 'washi',
    price: 8,
    tint: 'butter',
    art: 'washi',
    blurb: 'Strawberries all the way down. Tears clean, writes nicely.',
    details: '15mm × 10m roll of Japanese washi paper tape.',
    featured: true,
    added: '2026-08-06',
  },
  {
    id: 5,
    slug: 'mochi-moon-print',
    name: 'Mochi Moon Print',
    category: 'prints',
    price: 26,
    tint: 'periwinkle',
    art: 'moon',
    blurb: 'A round moon having a quiet night in.',
    details: 'A4 giclée print on 250gsm cotton rag. Signed on the back.',
    added: '2026-07-20',
  },
  {
    id: 6,
    slug: 'snack-club-sticker-sheet',
    name: 'Snack Club Sticker Sheet',
    category: 'stickers',
    price: 6,
    tint: 'butter',
    art: 'sheet',
    blurb: 'Everything in this shop, but as tiny snacks.',
    details: 'A6 sheet, kiss-cut matte vinyl.',
    added: '2026-07-14',
  },
  {
    id: 7,
    slug: 'sleepy-cat-pin',
    name: 'Sleepy Cat Pin',
    category: 'pins',
    price: 12,
    tint: 'pink',
    art: 'cat',
    blurb: 'The mascot, but asleep. Relatable.',
    details: '30mm hard enamel, silver plating, rubber clutch backs.',
    added: '2026-08-02',
  },
  {
    id: 8,
    slug: 'gingham-washi-set',
    name: 'Gingham Washi Set',
    category: 'washi',
    price: 14,
    tint: 'mint',
    art: 'washi',
    blurb: 'Three rolls of soft gingham in pink, mint and butter.',
    details: 'Three 15mm × 8m rolls. Comes boxed.',
    added: '2026-07-30',
  },
  {
    id: 9,
    slug: 'bookshelf-print',
    name: 'Little Bookshelf Print',
    category: 'prints',
    price: 24,
    tint: 'mint',
    art: 'shelf',
    blurb: 'A shelf of imaginary books with very good titles.',
    details: 'A4 giclée print on 250gsm cotton rag.',
    added: '2026-06-30',
  },
  {
    id: 10,
    slug: 'tiny-desk-friends-stickers',
    name: 'Tiny Desk Friends',
    category: 'stickers',
    price: 7,
    tint: 'periwinkle',
    art: 'sheet',
    blurb: 'Staplers, mugs and one suspicious cat.',
    details: 'A6 sheet, kiss-cut matte vinyl.',
    added: '2026-08-08',
  },
  {
    id: 11,
    slug: 'bell-collar-pin',
    name: 'Bell & Collar Pin',
    category: 'pins',
    price: 11,
    tint: 'butter',
    art: 'bell',
    blurb: "The mascot's collar, wearable at last.",
    details: '22mm hard enamel, gold plating.',
    added: '2026-07-11',
  },
  {
    id: 12,
    slug: 'cloud-washi-tape',
    name: 'Cloud Washi Tape',
    category: 'washi',
    price: 8,
    tint: 'periwinkle',
    art: 'washi',
    blurb: 'Soft clouds on a pale blue sky.',
    details: '15mm × 10m roll of Japanese washi paper tape.',
    added: '2026-08-09',
  },
];

export default products;

export const getBySlug = (slug) => products.find((p) => p.slug === slug);

export const getFeatured = () => products.filter((p) => p.featured);

export const getByCategory = (category) =>
  category === 'all' ? products : products.filter((p) => p.category === category);

/** Same category, excluding the product itself. Used for "you might also like". */
export const getRelated = (product, limit = 4) =>
  products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, limit);

export const categoryLabel = (id) => CATEGORIES.find((c) => c.id === id)?.label ?? id;

/** Money always goes through here so no float drift ever reaches the screen. */
export const formatPrice = (value) => `$${value.toFixed(2)}`;
