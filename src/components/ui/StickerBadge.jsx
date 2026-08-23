import styles from './StickerBadge.module.css';

/*
  The rotated circular sticker from the reference hero. Cream disc, chunky
  brown ring, a couple of lines of bubbly type with one line picked out in
  pink.
*/
export default function StickerBadge({ lines = [], rotate = -8, className = '' }) {
  return (
    <div
      className={`${styles.badge} ${className}`}
      style={{ '--rot': `${rotate}deg` }}
      aria-hidden="true"
    >
      <span className={styles.inner}>
        {lines.map((line, i) => (
          <span key={i} className={line.accent ? styles.accent : undefined}>
            {line.text}
          </span>
        ))}
      </span>
    </div>
  );
}
