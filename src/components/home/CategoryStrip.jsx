import { Link } from 'react-router-dom';
import ProductArt from '../ui/ProductArt';
import { CATEGORIES } from '../../data/products';
import styles from './CategoryStrip.module.css';

const ART = {
  prints: 'moon',
  stickers: 'sheet',
  pins: 'mushroom',
  washi: 'washi',
};

export default function CategoryStrip() {
  return (
    <ul className={styles.grid}>
      {CATEGORIES.map((category) => (
        <li key={category.id}>
          <Link
            to={`/shop?category=${category.id}`}
            className={`${styles.tile} ${styles[category.tint]}`}
          >
            <ProductArt art={ART[category.id]} tint={category.tint} className={styles.art} />
            <span className={styles.label}>{category.label}</span>
            <span className={styles.blurb}>{category.blurb}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
