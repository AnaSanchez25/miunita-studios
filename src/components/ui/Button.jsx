import { Link } from 'react-router-dom';
import styles from './Button.module.css';

/*
  One button, three shapes: a real <button>, a router <Link>, or a plain <a>.
  Picking the right element matters for keyboard and screen-reader users, so
  the `to` / `href` props decide it rather than everything being a div.
*/
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  full = false,
  to,
  href,
  className = '',
  ...rest
}) {
  const classes = [
    styles.btn,
    styles[variant],
    size !== 'md' ? styles[size] : '',
    full ? styles.full : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
