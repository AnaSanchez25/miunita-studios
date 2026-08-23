import { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';

import { CartProvider } from './context/CartContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CartDrawer from './components/cart/CartDrawer';

import Home from './pages/Home';
import Shop from './pages/Shop';
import Product from './pages/Product';
import About from './pages/About';
import NotFound from './pages/NotFound';

import styles from './App.module.css';

/*
  HashRouter, not BrowserRouter. Combined with base: './' in vite.config.js it
  means the production build in dist/ works when opened straight from the
  filesystem — no dev server, no web host. BrowserRouter would need a server
  rewriting every path back to index.html.
*/
export default function App() {
  return (
    <CartProvider>
      <HashRouter>
        <ScrollToTop />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div className={styles.shell}>
          <Header />
          <main id="main" className={styles.main}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:slug" element={<Product />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <CartDrawer />
      </HashRouter>
    </CartProvider>
  );
}

/*
  Without this, clicking a product halfway down the shop grid lands you
  halfway down the product page. Changing the query string alone (filtering
  the shop) should not scroll, so only the pathname is watched.
*/
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}
