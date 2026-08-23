import { Link } from 'react-router-dom';
import ProductArt from './ProductArt';
import Button from './Button';
import { formatPrice } from '../../data/products';
import { useCart } from '../../context/CartContext';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <article className={styles.card}>
      {/* The whole image + title area is one link. The add button sits outside
          it so it is not a nested interactive element. */}
      <Link to={`/product/${product.slug}`} className={styles.media}>
        {product.image ? (
          <img src={product.image} alt={product.name} className={styles.photo} />
        ) : (
          <ProductArt art={product.art} tint={product.tint} className={styles.artBox} />
        )}
      </Link>

      <div className={styles.body}>
        <h3 className={styles.name}>
          <Link to={`/product/${product.slug}`} className={styles.nameLink}>
            {product.name}
          </Link>
        </h3>
        <p className={styles.price}>{formatPrice(product.price)}</p>
        <Button
          variant="pink"
          size="sm"
          full
          className={styles.add}
          onClick={() => addItem(product)}
          aria-label={`Add ${product.name} to cart`}
        >
          add to cart
        </Button>
      </div>
    </article>
  );
}
