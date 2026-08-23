import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductArt from '../components/ui/ProductArt';
import ProductCard from '../components/ui/ProductCard';
import Button from '../components/ui/Button';
import SectionHeading from '../components/ui/SectionHeading';
import { ScallopDivider } from '../components/ui/Dividers';
import { getBySlug, getRelated, formatPrice, categoryLabel } from '../data/products';
import { useCart } from '../context/CartContext';
import NotFound from './NotFound';
import styles from './Product.module.css';

export default function Product() {
  const { slug } = useParams();
  const product = getBySlug(slug);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  // A stale bookmark or a typo should land somewhere friendly.
  if (!product) return <NotFound />;

  const related = getRelated(product);

  return (
    <>
      <div className={`wrap ${styles.crumbs}`}>
        <Link to="/shop">shop</Link>
        <span aria-hidden="true">/</span>
        <Link to={`/shop?category=${product.category}`}>{categoryLabel(product.category)}</Link>
        <span aria-hidden="true">/</span>
        <span className={styles.crumbNow}>{product.name}</span>
      </div>

      <div className={`wrap ${styles.layout}`}>
        <div className={styles.media}>
          {product.image ? (
            <img src={product.image} alt={product.name} className={styles.photo} />
          ) : (
            <ProductArt art={product.art} tint={product.tint} />
          )}
        </div>

        <div className={styles.info}>
          <p className={styles.kind}>{categoryLabel(product.category)}</p>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.price}>{formatPrice(product.price)}</p>
          <p className={styles.blurb}>{product.blurb}</p>

          <div className={styles.buy}>
            <div className={styles.stepper}>
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                disabled={qty <= 1}
              >
                &minus;
              </button>
              <span aria-live="polite" aria-label={`Quantity ${qty}`}>
                {qty}
              </span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(99, q + 1))}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <Button
              variant="primary"
              size="lg"
              className={styles.addBtn}
              onClick={() => {
                addItem(product, qty);
                setQty(1);
              }}
            >
              add to cart &middot; {formatPrice(product.price * qty)}
            </Button>
          </div>

          <dl className={styles.details}>
            <div>
              <dt>the details</dt>
              <dd>{product.details}</dd>
            </div>
            <div>
              <dt>shipping</dt>
              <dd>
                Ships within three working days, flat rate, free over $35. Packed flat with a free
                sticker tucked in.
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {related.length > 0 && (
        <>
          <ScallopDivider bg="var(--cream)" color="var(--cream-deep)" />
          <section className={styles.related}>
            <div className="wrap">
              <SectionHeading sub={`More from ${categoryLabel(product.category)}.`}>
                you might also like
              </SectionHeading>
              <ul className={styles.grid}>
                {related.map((item) => (
                  <li key={item.id}>
                    <ProductCard product={item} />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </>
      )}
    </>
  );
}
