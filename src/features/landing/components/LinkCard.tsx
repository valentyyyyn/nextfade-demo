import styles from "./LinkCard.module.css";

type CardVariant = 'default' | 'second__default' | 'instagram' | 'whatsapp' | 'youtube' | 'facebook' | 'location';

interface LinkCardProps {
  href: string;
  title: string;
  icon: string;
  variant?: CardVariant;
}

export default function LinkCard({ href, title, icon, variant = 'default' }: LinkCardProps) {
  const isDefaultLink = variant === 'default' || variant === 'second__default';
  const target = isDefaultLink ? "_self" : "_blank";
  const rel = isDefaultLink ? undefined : "noopener noreferrer";

  // Dynamic class based on variant 
  const cardClass = `${styles.link__card} ${styles[`link__card__hover__${variant}`]}`;

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={cardClass}
    >
      <img src={icon} alt={`${title} icon`} className={styles.link__card__icon} />
      <span className={styles.link__card__title}>{title}</span>
    </a>
  );
}