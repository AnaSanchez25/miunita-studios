import SectionHeading from '../components/ui/SectionHeading';
import StickerBadge from '../components/ui/StickerBadge';
import Button from '../components/ui/Button';
import { ZigzagDivider, ScallopDivider } from '../components/ui/Dividers';
import styles from './About.module.css';

import logoSrc from '../assets/miunita-logo.jpg';

export default function About() {
  return (
    <>
      <section className={styles.intro}>
        <div className={`wrap ${styles.introInner}`}>
          <div className={styles.mascot}>
            <img src={logoSrc} alt="The miunita studios cat mascot" width="260" height="260" />
          </div>
          <div className={styles.introCopy}>
            <h1 className={styles.title}>hello, we&rsquo;re miunita</h1>
            <p className={styles.lede}>
              A one-person studio making small paper things — art prints, sticker sheets, enamel
              pins and washi tape — for desks, diaries and laptop lids.
            </p>
          </div>
          <StickerBadge
            className={styles.badge}
            rotate={9}
            lines={[{ text: 'made in' }, { text: 'small', accent: true }, { text: 'batches' }]}
          />
        </div>
      </section>

      <ZigzagDivider bg="var(--pink)" color="var(--cream)" />

      <section className={styles.story}>
        <div className={`wrap ${styles.prose}`}>
          <p>
            Everything starts as a drawing. Most of them start as a drawing of the cat, who runs
            the place and appears on more products than is strictly reasonable.
          </p>
          <p>
            Prints are run on heavy cotton paper in batches small enough to check every sheet.
            Stickers are kiss-cut matte vinyl that survives a water bottle. Pins are hard enamel
            with proper rubber backs, because the butterfly clutches always get lost. Washi is
            Japanese paper tape that tears clean and takes ink.
          </p>
          <p>
            Orders are packed by hand, flat, with a free sticker tucked inside — and that part is
            not going to change however big this gets.
          </p>
        </div>
      </section>

      <ScallopDivider bg="var(--cream)" color="var(--cream-deep)" />

      <section className={styles.info} id="shipping">
        <div className="wrap">
          <SectionHeading sub="The practical bits, in plain terms.">shipping &amp; returns</SectionHeading>
          <div className={styles.cards}>
            {[
              {
                title: 'when it ships',
                copy: 'Within three working days. You get a note with tracking as soon as it leaves.',
              },
              {
                title: 'what it costs',
                copy: 'Flat rate under $35, free over it. The cart shows how close you are.',
              },
              {
                title: 'if it goes wrong',
                copy: 'Anything damaged in the post gets replaced. Just send a photo within 14 days.',
              },
              {
                title: 'changed your mind',
                copy: 'Unopened items can come back within 30 days. Return postage is on you.',
              },
            ].map((card) => (
              <div key={card.title} className={styles.card}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardCopy}>{card.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ScallopDivider bg="var(--cream-deep)" color="var(--pink)" />

      <section className={styles.contact} id="contact">
        <div className={`wrap ${styles.contactInner}`}>
          <SectionHeading sub="Questions, wholesale, custom commissions, or just to say hello.">
            get in touch
          </SectionHeading>
          <Button href="mailto:hello@miunitastudios.com" variant="cream" size="lg">
            hello@miunitastudios.com
          </Button>
        </div>
      </section>
    </>
  );
}
