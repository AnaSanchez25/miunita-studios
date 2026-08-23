import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';
import { CATEGORIES } from '../../data/products';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.brand}>
          <Logo size={54} tagline />
          <p className={styles.blurb}>
            Small-batch art prints, sticker sheets, enamel pins and washi tape, drawn and packed by
            hand.
          </p>
        </div>

        <nav className={styles.col} aria-label="Shop">
          <h2 className={styles.colTitle}>shop</h2>
          <ul>
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link to={`/shop?category=${c.id}`}>{c.label}</Link>
              </li>
            ))}
            <li>
              <Link to="/shop">everything</Link>
            </li>
          </ul>
        </nav>

        <nav className={styles.col} aria-label="Studio">
          <h2 className={styles.colTitle}>studio</h2>
          <ul>
            <li>
              <Link to="/about">about miunita</Link>
            </li>
            <li>
              <Link to="/about#shipping">shipping &amp; returns</Link>
            </li>
            <li>
              <Link to="/about#contact">get in touch</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className={styles.base}>
        <div className={`wrap ${styles.baseInner}`}>
          <p>&copy; {new Date().getFullYear()} miunita studios</p>
          <p>made with a lot of pink</p>
        </div>
      </div>
    </footer>
  );
}
