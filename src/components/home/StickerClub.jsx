import { useState } from 'react';
import Button from '../ui/Button';
import styles from './StickerClub.module.css';

import logoSrc from '../../assets/miunita-logo.jpg';

export default function StickerClub() {
  const [email, setEmail] = useState('');
  const [signedUp, setSignedUp] = useState(false);

  // No mailing-list backend yet, so this confirms locally rather than
  // pretending to send anything.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSignedUp(true);
  };

  return (
    <section className={styles.club} aria-labelledby="sticker-club">
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.mascot}>
          <img src={logoSrc} alt="" width="200" height="200" />
        </div>

        <div className={styles.copy}>
          <h2 className={styles.title} id="sticker-club">
            sticker club
          </h2>
          <p className={styles.lede}>
            A new sheet in your mailbox every month, plus first pick of new drops. Cancel any time.
          </p>

          {signedUp ? (
            <p className={styles.done} role="status">
              You&rsquo;re on the list. Watch your mailbox.
            </p>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="club-email">
                Email address
              </label>
              <input
                id="club-email"
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
              />
              <Button type="submit" variant="primary">
                join the club
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
