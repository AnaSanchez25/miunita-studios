import { Link } from 'react-router-dom';
import Hero from '../components/home/Hero';
import CategoryStrip from '../components/home/CategoryStrip';
import StickerClub from '../components/home/StickerClub';
import ProductCard from '../components/ui/ProductCard';
import SectionHeading from '../components/ui/SectionHeading';
import Button from '../components/ui/Button';
import { ZigzagDivider, WaveDivider, ScallopDivider } from '../components/ui/Dividers';
import { getFeatured } from '../data/products';
import styles from './Home.module.css';

export default function Home() {
  const featured = getFeatured();

  return (
    <>
      <Hero />
      <ZigzagDivider bg="var(--pink)" color="var(--cream)" />

      <section className={styles.section}>
        <div className="wrap">
          <SectionHeading sub="Freshly drawn, printed in small runs, and gone when they're gone.">
            new this month
          </SectionHeading>

          <ul className={styles.grid}>
            {featured.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>

          <div className={styles.more}>
            <Button to="/shop" variant="cream" size="lg">
              see everything
            </Button>
          </div>
        </div>
      </section>

      <ScallopDivider bg="var(--cream)" color="var(--cream-deep)" />

      <section className={`${styles.section} ${styles.tinted}`}>
        <div className="wrap">
          <SectionHeading sub="Four kinds of small joy. Pick your poison.">
            shop by kind
          </SectionHeading>
          <CategoryStrip />
        </div>
      </section>

      <ScallopDivider bg="var(--cream-deep)" color="var(--cream)" flip />

      <section className={styles.section}>
        <div className={`wrap ${styles.promise}`}>
          {[
            { title: 'small batches', copy: 'Everything is drawn, printed and packed by hand in the studio.' },
            { title: 'free sticker', copy: 'Every order goes out with a surprise sticker tucked inside.' },
            { title: 'free shipping over $35', copy: 'Flat rate below that, and everything ships within three days.' },
          ].map((item) => (
            <div key={item.title} className={styles.promiseItem}>
              <h3 className={styles.promiseTitle}>{item.title}</h3>
              <p className={styles.promiseCopy}>{item.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <WaveDivider bg="var(--cream)" color="var(--periwinkle)" />
      <StickerClub />
      <WaveDivider bg="var(--periwinkle)" color="var(--cream)" />

      <section className={`${styles.section} ${styles.aboutTease}`}>
        <div className="wrap">
          <p className={styles.teaseCopy}>
            miunita studios is a one-person studio making paper goods for desks, diaries and
            laptop lids.{' '}
            <Link to="/about" className={styles.teaseLink}>
              read the whole story
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
