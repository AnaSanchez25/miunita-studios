import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';
import SectionHeading from '../components/ui/SectionHeading';
import { ZigzagDivider } from '../components/ui/Dividers';
import products, { CATEGORIES, getByCategory } from '../data/products';
import styles from './Shop.module.css';

const SORTS = [
  { id: 'newest', label: 'newest' },
  { id: 'price-asc', label: 'price: low to high' },
  { id: 'price-desc', label: 'price: high to low' },
];

export default function Shop() {
  const [params, setParams] = useSearchParams();

  // Filters live in the URL so they can be linked to and shared, and so the
  // homepage category tiles can deep-link straight into a filtered shop.
  const rawCategory = params.get('category') ?? 'all';
  const category = CATEGORIES.some((c) => c.id === rawCategory) ? rawCategory : 'all';
  const sort = SORTS.some((s) => s.id === params.get('sort')) ? params.get('sort') : 'newest';

  const visible = useMemo(() => {
    const list = [...getByCategory(category)];
    if (sort === 'price-asc') return list.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') return list.sort((a, b) => b.price - a.price);
    return list.sort((a, b) => b.added.localeCompare(a.added));
  }, [category, sort]);

  const setParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (!value || value === 'all' || value === 'newest') next.delete(key);
    else next.set(key, value);
    setParams(next, { replace: true });
  };

  const active = CATEGORIES.find((c) => c.id === category);

  return (
    <>
      <div className={styles.banner}>
        <div className="wrap">
          <SectionHeading
            as="h1"
            sub={active ? active.blurb : 'Everything in the studio, all in one place.'}
          >
            {active ? active.label : 'shop everything'}
          </SectionHeading>
        </div>
      </div>
      <ZigzagDivider bg="var(--pink)" color="var(--cream)" />

      <div className={`wrap ${styles.body}`}>
        <div className={styles.controls}>
          <div className={styles.chips} role="group" aria-label="Filter by category">
            <Chip active={category === 'all'} onClick={() => setParam('category', 'all')}>
              everything
            </Chip>
            {CATEGORIES.map((c) => (
              <Chip
                key={c.id}
                active={category === c.id}
                onClick={() => setParam('category', c.id)}
              >
                {c.label}
              </Chip>
            ))}
          </div>

          <div className={styles.sort}>
            <label htmlFor="sort">sort</label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setParam('sort', e.target.value)}
              className={styles.select}
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className={styles.count} role="status">
          {visible.length} {visible.length === 1 ? 'thing' : 'things'}
          {category !== 'all' ? ` in ${active.label}` : ''}
        </p>

        {visible.length === 0 ? (
          <p className={styles.none}>
            Nothing here yet. <Link to="/shop">See everything instead.</Link>
          </p>
        ) : (
          <ul className={styles.grid}>
            {visible.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        )}

        <p className={styles.total}>{products.length} products in the studio right now.</p>
      </div>
    </>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      className={`${styles.chip} ${active ? styles.chipOn : ''}`}
      onClick={onClick}
      aria-pressed={active}
    >
      {children}
    </button>
  );
}
