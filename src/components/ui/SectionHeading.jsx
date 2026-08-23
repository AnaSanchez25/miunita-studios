import styles from './SectionHeading.module.css';

/*
  The big bubbly centred heading from the reference, with an optional line of
  supporting copy underneath.
*/
export default function SectionHeading({ children, sub, align = 'center', as: Tag = 'h2', id }) {
  return (
    <div className={`${styles.head} ${styles[align]}`}>
      <Tag className={styles.title} id={id}>
        {children}
      </Tag>
      {sub && <p className={styles.sub}>{sub}</p>}
    </div>
  );
}
