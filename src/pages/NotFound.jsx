import ProductArt from '../components/ui/ProductArt';
import Button from '../components/ui/Button';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <section className={`wrap ${styles.wrap}`}>
      <ProductArt art="cat" tint="pink" className={styles.art} />
      <h1 className={styles.title}>nothing here</h1>
      <p className={styles.copy}>
        This page has wandered off. The cat says try the shop instead.
      </p>
      <div className={styles.ctas}>
        <Button to="/shop" variant="primary" size="lg">
          go to the shop
        </Button>
        <Button to="/" variant="cream" size="lg">
          back home
        </Button>
      </div>
    </section>
  );
}
