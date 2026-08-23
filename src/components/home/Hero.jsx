import Button from '../ui/Button';
import StickerBadge from '../ui/StickerBadge';
import styles from './Hero.module.css';

import logoSrc from '../../assets/miunita-logo.jpg';

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Decorative pastel shapes behind the mascot. */}
      <span className={`${styles.blob} ${styles.blobPeri}`} aria-hidden="true" />
      <span className={`${styles.blob} ${styles.blobButter}`} aria-hidden="true" />
      <span className={`${styles.blob} ${styles.blobMint}`} aria-hidden="true" />

      <div className={`wrap ${styles.inner}`}>
        <StickerBadge
          className={styles.badge}
          rotate={-8}
          lines={[
            { text: 'cute things' },
            { text: 'for your desk', accent: true },
            { text: '& diary' },
          ]}
        />

        <div className={styles.copy}>
          <h1 className={styles.title}>
            little treasures,
            <br />
            big feelings
          </h1>
          <p className={styles.lede}>
            Hand-drawn art prints, sticker sheets, enamel pins and washi tape — made in small
            batches and packed with a free sticker.
          </p>
          <div className={styles.ctas}>
            <Button to="/shop" variant="primary" size="lg">
              shop new
            </Button>
            <Button to="/shop?category=stickers" variant="cream" size="lg">
              browse stickers
            </Button>
          </div>
        </div>

        <div className={styles.mascot}>
          <img src={logoSrc} alt="The miunita studios cat mascot" width="360" height="360" />
        </div>
      </div>
    </section>
  );
}
