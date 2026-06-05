import type { ReactNode } from 'react';
import styles from './SelectableCard.module.scss';

interface SelectableCardProps {
  icon: ReactNode;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export const SelectableCard = ({
  icon,
  label,
  isSelected,
  onClick,
}: SelectableCardProps) => {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      className={`${styles.card} ${isSelected ? styles.selected : ''}`}
      onClick={onClick}
    >
      <span className={styles.icon}>{icon}</span>
      <span className={styles.label}>{label}</span>
      {isSelected && (
        <span className={styles.check} aria-hidden>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 6L5 9L10 3"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </button>
  );
};
