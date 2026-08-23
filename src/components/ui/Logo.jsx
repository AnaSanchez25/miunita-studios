import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

import logoSrc from '../../assets/miunita-logo.jpg';

/*
  The logo file has its pink background baked in, so it is always presented
  inside a circle with a brown ring. That turns the limitation into the
  brand's signature mark rather than something to apologise for.

  `size` is the diameter in px. `showWordmark` is off for decorative uses.
*/
export default function Logo({ size = 46, showWordmark = true, linkTo = '/', tagline = false }) {
  const mark = (
    <span
      className={styles.mark}
      style={{ width: size, height: size }}
      aria-hidden={showWordmark ? 'true' : undefined}
    >
      <img src={logoSrc} alt={showWordmark ? '' : 'miunita studios'} width={size} height={size} />
    </span>
  );

  const content = (
    <>
      {mark}
      {showWordmark && (
        <span className={styles.text}>
          <span className={styles.word}>miunita studios</span>
          {tagline && <span className={styles.tagline}>art prints &amp; paper goods</span>}
        </span>
      )}
    </>
  );

  if (!linkTo) {
    return <span className={styles.logo}>{content}</span>;
  }

  return (
    <Link to={linkTo} className={styles.logo} aria-label="miunita studios — home">
      {content}
    </Link>
  );
}
