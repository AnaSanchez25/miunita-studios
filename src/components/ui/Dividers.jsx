import styles from './Dividers.module.css';

/*
  Section transitions, lifted from the reference design.

  All three use preserveAspectRatio="none" so the shape stretches to the
  viewport width instead of tiling — a repeating pattern gets visibly cramped
  on a narrow phone, a stretched one just gets gentler.

  `color` is the section arriving below: the divider paints that colour in the
  shape of the cut. `bg` is the section being left behind, and it fills the
  gaps the cut leaves. Getting `bg` wrong is what makes a zigzag look like a
  flat line, so it defaults to the pink band that sits above most dividers.
*/

export function ZigzagDivider({
  color = 'var(--cream)',
  bg = 'var(--pink)',
  flip = false,
  height = 22,
}) {
  return (
    <svg
      className={`${styles.divider} ${flip ? styles.flip : ''}`}
      style={{ height, background: bg }}
      viewBox="0 0 120 12"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0 12 L0 6 L5 11 L10 6 L15 11 L20 6 L25 11 L30 6 L35 11 L40 6 L45 11 L50 6 L55 11 L60 6 L65 11 L70 6 L75 11 L80 6 L85 11 L90 6 L95 11 L100 6 L105 11 L110 6 L115 11 L120 6 L120 12 Z"
        fill={color}
      />
    </svg>
  );
}

export function WaveDivider({
  color = 'var(--cream)',
  bg = 'var(--pink)',
  flip = false,
  height = 34,
}) {
  return (
    <svg
      className={`${styles.divider} ${flip ? styles.flip : ''}`}
      style={{ height, background: bg }}
      viewBox="0 0 120 14"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0 14 L0 5 C 10 -2, 20 12, 30 5 S 50 -2, 60 5 S 80 12, 90 5 S 110 -2, 120 5 L120 14 Z"
        fill={color}
      />
    </svg>
  );
}

export function ScallopDivider({
  color = 'var(--cream)',
  bg = 'var(--pink)',
  flip = false,
  height = 22,
}) {
  return (
    <svg
      className={`${styles.divider} ${flip ? styles.flip : ''}`}
      style={{ height, background: bg }}
      viewBox="0 0 120 10"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0 10 L0 4 A 5 5 0 0 0 10 4 A 5 5 0 0 0 20 4 A 5 5 0 0 0 30 4 A 5 5 0 0 0 40 4 A 5 5 0 0 0 50 4 A 5 5 0 0 0 60 4 A 5 5 0 0 0 70 4 A 5 5 0 0 0 80 4 A 5 5 0 0 0 90 4 A 5 5 0 0 0 100 4 A 5 5 0 0 0 110 4 A 5 5 0 0 0 120 4 L120 10 Z"
        fill={color}
      />
    </svg>
  );
}
