import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../ui/Logo';
import { CATEGORIES } from '../../data/products';
import { useCart } from '../../context/CartContext';
import styles from './Header.module.css';

export default function Header() {
  const { count, openCart } = useCart();
  const location = useLocation();
  const current = `${location.pathname}${location.search}`;

  // Remember which URL the mobile menu was opened on. Navigating anywhere else
  // dismisses it without needing an effect to reset it.
  const [menuOpenAt, setMenuOpenAt] = useState(null);
  const menuOpen = menuOpenAt === current;
  const setMenuOpen = (open) => setMenuOpenAt(open ? current : null);

  // Escape closes the menu wherever focus happens to be.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setMenuOpenAt(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const links = [
    { to: '/shop', label: 'shop all' },
    ...CATEGORIES.map((c) => ({
      to: `/shop?category=${c.id}`,
      label: c.label,
    })),
    { to: '/about', label: 'about' },
  ];

  return (
    <header className={styles.header}>
      <div className={`wrap ${styles.inner}`}>
        <Logo size={46} />

        <nav className={styles.desktopNav} aria-label="Main">
          <ul className={styles.navList}>
            {links.map((link) => {
              // NavLink's isActive ignores the query string, so /shop would
              // light up for every category at once. Compare the full URL.
              const isActive = link.to === current;
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cartBtn}
            onClick={openCart}
            aria-label={`Open cart, ${count} ${count === 1 ? 'item' : 'items'}`}
          >
            <CartIcon />
            <span className={styles.cartLabel}>cart</span>
            {count > 0 && <span className={styles.badge}>{count}</span>}
          </button>

          <button
            type="button"
            className={styles.burger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={`${styles.burgerBox} ${menuOpen ? styles.burgerOpen : ''}`}>
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`${styles.mobileNav} ${menuOpen ? styles.mobileOpen : ''}`}
        hidden={!menuOpen}
      >
        <ul className={styles.mobileList}>
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`${styles.mobileLink} ${link.to === current ? styles.active : ''}`}
                aria-current={link.to === current ? 'page' : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

function CartIcon() {
  return (
    <svg viewBox="0 0 24 24" width="21" height="21" aria-hidden="true" focusable="false">
      <path
        d="M4 6h2l2.2 10.2a1.6 1.6 0 0 0 1.6 1.3h7.6a1.6 1.6 0 0 0 1.6-1.2L20.5 9H7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10.5" cy="20" r="1.4" fill="currentColor" />
      <circle cx="17.5" cy="20" r="1.4" fill="currentColor" />
    </svg>
  );
}
