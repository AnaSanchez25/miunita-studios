import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import ProductArt from '../ui/ProductArt';
import { formatPrice, FREE_SHIPPING_THRESHOLD } from '../../data/products';
import { useCart } from '../../context/CartContext';
import styles from './CartDrawer.module.css';

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function CartDrawer() {
  const {
    lines,
    count,
    subtotal,
    isOpen,
    closeCart,
    setQty,
    removeItem,
    remainingForFreeShipping,
    qualifiesForFreeShipping,
  } = useCart();

  const panelRef = useRef(null);
  const previouslyFocused = useRef(null);
  const [checkoutNote, setCheckoutNote] = useState(false);

  // Reset the "coming soon" note whenever the drawer reopens.
  useEffect(() => {
    if (isOpen) setCheckoutNote(false);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    previouslyFocused.current = document.activeElement;
    // Lock the page behind the drawer so scrolling does not bleed through.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Move focus into the panel once it exists.
    const focusTimer = window.setTimeout(() => {
      const first = panelRef.current?.querySelector(FOCUSABLE);
      first?.focus();
    }, 0);

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeCart();
        return;
      }
      if (e.key !== 'Tab') return;

      // Keep Tab inside the drawer while it is open.
      const items = panelRef.current?.querySelectorAll(FOCUSABLE);
      if (!items || items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(focusTimer);
      previouslyFocused.current?.focus?.();
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className={styles.overlay}>
      <div className={styles.scrim} onClick={closeCart} aria-hidden="true" />

      <aside
        className={styles.panel}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <header className={styles.head}>
          <h2 className={styles.title}>your cart</h2>
          <button type="button" className={styles.close} onClick={closeCart} aria-label="Close cart">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        {count === 0 ? (
          <div className={styles.empty}>
            <ProductArt art="cat" tint="pink" className={styles.emptyArt} />
            <p className={styles.emptyTitle}>nothing in here yet</p>
            <p className={styles.emptyCopy}>
              Prints, stickers, pins and washi tape are all waiting for you.
            </p>
            <Button to="/shop" variant="primary" onClick={closeCart}>
              start shopping
            </Button>
          </div>
        ) : (
          <>
            <div className={styles.shipping}>
              {qualifiesForFreeShipping ? (
                <p className={styles.shipWin}>you&rsquo;ve got free shipping</p>
              ) : (
                <p className={styles.shipNote}>
                  {formatPrice(remainingForFreeShipping)} away from free shipping
                </p>
              )}
              <div
                className={styles.progressTrack}
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={FREE_SHIPPING_THRESHOLD}
                aria-valuenow={Math.min(subtotal, FREE_SHIPPING_THRESHOLD)}
                aria-label="Progress toward free shipping"
              >
                <span className={styles.progressFill} style={{ width: `${progress}%` }} />
              </div>
            </div>

            <ul className={styles.lines}>
              {lines.map((line) => (
                <li key={line.id} className={styles.line}>
                  <Link to={`/product/${line.slug}`} className={styles.lineArt} onClick={closeCart}>
                    <ProductArt art={line.art} tint={line.tint} />
                  </Link>

                  <div className={styles.lineBody}>
                    <Link
                      to={`/product/${line.slug}`}
                      className={styles.lineName}
                      onClick={closeCart}
                    >
                      {line.name}
                    </Link>
                    <p className={styles.linePrice}>{formatPrice(line.price)}</p>

                    <div className={styles.stepper}>
                      <button
                        type="button"
                        onClick={() => setQty(line.id, line.qty - 1)}
                        aria-label={`Decrease quantity of ${line.name}`}
                      >
                        &minus;
                      </button>
                      <span aria-live="polite">{line.qty}</span>
                      <button
                        type="button"
                        onClick={() => setQty(line.id, line.qty + 1)}
                        aria-label={`Increase quantity of ${line.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className={styles.lineEnd}>
                    <p className={styles.lineTotal}>{formatPrice(line.price * line.qty)}</p>
                    <button
                      type="button"
                      className={styles.remove}
                      onClick={() => removeItem(line.id)}
                      aria-label={`Remove ${line.name} from cart`}
                    >
                      remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <footer className={styles.foot}>
              <div className={styles.subtotal}>
                <span>subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <p className={styles.tax}>Shipping and taxes worked out at checkout.</p>

              {checkoutNote && (
                <p className={styles.note} role="status">
                  Checkout isn&rsquo;t hooked up yet — this is a preview of the shop. Your cart is
                  saved on this device.
                </p>
              )}

              <Button variant="primary" size="lg" full onClick={() => setCheckoutNote(true)}>
                checkout &middot; {formatPrice(subtotal)}
              </Button>
              <Button variant="ghost" full onClick={closeCart}>
                keep shopping
              </Button>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
