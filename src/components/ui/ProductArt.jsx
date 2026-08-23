import styles from './ProductArt.module.css';

/*
  Placeholder product artwork, drawn rather than photographed.

  Every product in data/products.js names an `art` scene and a `tint`. If a
  product gets a real `image` later, ProductCard uses that instead and this
  component is skipped entirely — so nothing here needs unpicking when the
  photos arrive.
*/

const INK = '#774433';
const CREAM = '#fff8f4';
const PINK = '#fdbacb';
const BUTTER = '#ffe5bc';
const PERI = '#cad9f9';
const MINT = '#cfe9db';

const stroke = {
  fill: 'none',
  stroke: INK,
  strokeWidth: 2.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

function Cat() {
  return (
    <g>
      <path
        d="M30 34C26 20 27 12 31 11C37 10 45 18 49 24C52 23.4 58 23.4 61 24C65 18 73 10 79 11C83 12 84 20 80 34C84 40 86 47 86 53C86 70 72 81 55 81C38 81 24 70 24 53C24 47 26 40 30 34Z"
        fill={CREAM}
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M33 16C31 22 31 28 33 33C37 27 41 23 45 21Z" fill={INK} />
      <path d="M77 16C79 22 79 28 77 33C73 27 69 23 65 21Z" fill={INK} />
      <ellipse cx="38" cy="60" rx="7" ry="4" fill={PINK} opacity="0.85" />
      <ellipse cx="72" cy="60" rx="7" ry="4" fill={PINK} opacity="0.85" />
      <ellipse cx="45" cy="50" rx="3.6" ry="4.2" fill={INK} />
      <ellipse cx="65" cy="50" rx="3.6" ry="4.2" fill={INK} />
      <path d="M51 56C51 54 59 54 59 56C59 59 56.5 61 55 61C53.5 61 51 59 51 56Z" fill={INK} />
      <path d="M55 61C55 65 51.5 66 49 64M55 61C55 65 58.5 66 61 64" {...stroke} />
      <path d="M22 52C15 49 9 48 4 49M22 59C15 59 8 61 3 63" {...stroke} />
      <path d="M88 52C95 49 101 48 106 49M88 59C95 59 102 61 107 63" {...stroke} />
    </g>
  );
}

function Sheet() {
  const dots = [
    { x: 28, y: 30, fill: PINK },
    { x: 55, y: 26, fill: BUTTER },
    { x: 80, y: 32, fill: MINT },
    { x: 26, y: 58, fill: PERI },
    { x: 54, y: 54, fill: PINK },
    { x: 82, y: 60, fill: BUTTER },
    { x: 32, y: 82, fill: MINT },
    { x: 62, y: 80, fill: PERI },
  ];
  return (
    <g>
      <rect
        x="10"
        y="12"
        width="88"
        height="84"
        rx="7"
        fill={CREAM}
        stroke={INK}
        strokeWidth="3"
        strokeDasharray="7 5"
      />
      {dots.map((d, i) => (
        <g key={i}>
          <circle cx={d.x} cy={d.y} r="11" fill={d.fill} stroke={INK} strokeWidth="2.4" />
          <circle cx={d.x - 3.4} cy={d.y - 1} r="1.5" fill={INK} />
          <circle cx={d.x + 3.4} cy={d.y - 1} r="1.5" fill={INK} />
          <path
            d={`M${d.x - 2.6} ${d.y + 3.4}Q${d.x} ${d.y + 6} ${d.x + 2.6} ${d.y + 3.4}`}
            {...stroke}
            strokeWidth="1.9"
          />
        </g>
      ))}
    </g>
  );
}

function Mushroom() {
  return (
    <g>
      <path d="M40 62H68V80C68 87 62 91 54 91C46 91 40 87 40 80Z" fill={CREAM} {...stroke} strokeWidth="3" />
      <path
        d="M16 60C16 38 33 21 54 21C75 21 92 38 92 60C92 63 89 65 85 65H23C19 65 16 63 16 60Z"
        fill={PINK}
        stroke={INK}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="34" cy="44" r="7" fill={CREAM} />
      <circle cx="66" cy="38" r="9" fill={CREAM} />
      <circle cx="78" cy="55" r="5.5" fill={CREAM} />
      <ellipse cx="46" cy="76" rx="4" ry="3" fill={PINK} opacity="0.8" />
      <ellipse cx="62" cy="76" rx="4" ry="3" fill={PINK} opacity="0.8" />
      <circle cx="48" cy="72" r="2.4" fill={INK} />
      <circle cx="60" cy="72" r="2.4" fill={INK} />
      <path d="M51 78Q54 81 57 78" {...stroke} strokeWidth="2.2" />
    </g>
  );
}

function Washi() {
  return (
    <g>
      <ellipse cx="54" cy="56" rx="38" ry="34" fill={PINK} stroke={INK} strokeWidth="3" />
      <ellipse cx="54" cy="56" rx="16" ry="14" fill={CREAM} stroke={INK} strokeWidth="3" />
      <path d="M30 34C34 40 34 46 30 52M54 26C58 32 58 38 54 44M78 34C82 40 82 46 78 52" {...stroke} strokeWidth="2.2" />
      <path d="M30 60C34 66 34 72 30 78M78 60C82 66 82 72 78 78" {...stroke} strokeWidth="2.2" />
      <path
        d="M16 74C16 74 8 80 8 86C8 90 12 92 16 90L30 83"
        fill={BUTTER}
        stroke={INK}
        strokeWidth="2.8"
        strokeLinejoin="round"
      />
    </g>
  );
}

function Moon() {
  return (
    <g>
      <circle cx="54" cy="52" r="34" fill={BUTTER} stroke={INK} strokeWidth="3" />
      <circle cx="40" cy="40" r="6" fill={CREAM} opacity="0.75" />
      <circle cx="66" cy="66" r="4.5" fill={CREAM} opacity="0.75" />
      <circle cx="72" cy="38" r="3.5" fill={CREAM} opacity="0.75" />
      <ellipse cx="40" cy="58" rx="5.5" ry="3.4" fill={PINK} opacity="0.85" />
      <ellipse cx="68" cy="58" rx="5.5" ry="3.4" fill={PINK} opacity="0.85" />
      <path d="M44 50Q47 47 50 50M58 50Q61 47 64 50" {...stroke} strokeWidth="2.4" />
      <path d="M50 58Q54 62 58 58" {...stroke} strokeWidth="2.4" />
      <path d="M18 20L21 26L27 29L21 32L18 38L15 32L9 29L15 26Z" fill={PINK} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <path d="M92 68L94 73L99 75L94 77L92 82L90 77L85 75L90 73Z" fill={PERI} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
    </g>
  );
}

function Shelf() {
  const books = [
    { x: 22, w: 11, h: 34, fill: PINK },
    { x: 34, w: 9, h: 40, fill: BUTTER },
    { x: 44, w: 12, h: 30, fill: PERI },
    { x: 57, w: 10, h: 38, fill: MINT },
    { x: 68, w: 11, h: 33, fill: PINK },
  ];
  return (
    <g>
      {books.map((b, i) => (
        <g key={i}>
          <rect
            x={b.x}
            y={68 - b.h}
            width={b.w}
            height={b.h}
            rx="2.5"
            fill={b.fill}
            stroke={INK}
            strokeWidth="2.6"
          />
          <path d={`M${b.x + 2.5} ${74 - b.h}H${b.x + b.w - 2.5}`} {...stroke} strokeWidth="2" />
        </g>
      ))}
      <path d="M12 68H96" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      <circle cx="86" cy="60" r="8" fill={CREAM} stroke={INK} strokeWidth="2.6" />
      <circle cx="83.5" cy="59" r="1.6" fill={INK} />
      <circle cx="88.5" cy="59" r="1.6" fill={INK} />
      <path d="M12 80H96" stroke={INK} strokeWidth="4" strokeLinecap="round" opacity="0.35" />
    </g>
  );
}

function Bell() {
  return (
    <g>
      <path d="M18 40C30 62 78 62 90 40" fill="none" stroke={INK} strokeWidth="11" strokeLinecap="round" />
      <path d="M19 40C31 60 77 60 89 40" fill="none" stroke={PERI} strokeWidth="6" strokeLinecap="round" />
      <circle cx="54" cy="64" r="17" fill={BUTTER} stroke={INK} strokeWidth="3" />
      <path d="M40 60H68" {...stroke} strokeWidth="2.6" />
      <path d="M54 64V79" {...stroke} strokeWidth="2.6" />
      <circle cx="54" cy="70" r="3.4" fill={INK} />
    </g>
  );
}

const SCENES = { cat: Cat, sheet: Sheet, mushroom: Mushroom, washi: Washi, moon: Moon, shelf: Shelf, bell: Bell };

const TINTS = { pink: 'var(--pink-soft)', mint: 'var(--mint-soft)', periwinkle: 'var(--periwinkle-soft)', butter: 'var(--butter-soft)' };

export default function ProductArt({ art = 'sheet', tint = 'pink', className = '' }) {
  const Scene = SCENES[art] ?? Sheet;
  return (
    <div
      className={`${styles.art} ${className}`}
      style={{ background: TINTS[tint] ?? TINTS.pink }}
    >
      <svg viewBox="0 0 108 108" className={styles.svg} aria-hidden="true" focusable="false">
        <Scene />
      </svg>
    </div>
  );
}
