import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ProgressBar } from '@/shared/components/ProgressBar/ProgressBar';
import styles from './StepCard.module.scss';

interface StepCardProps {
  title?: ReactNode;
  progress?: number;
  children: ReactNode;
  footer: ReactNode;
  direction?: 'forward' | 'backward';
}

const slideVariants = {
  enter: (direction: 'forward' | 'backward') => ({
    x: direction === 'forward' ? 24 : -24,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: 'forward' | 'backward') => ({
    x: direction === 'forward' ? -24 : 24,
    opacity: 0,
  }),
};

export const StepCard = ({
  title,
  progress,
  children,
  footer,
  direction = 'forward',
}: StepCardProps) => {
  const showProgress = progress !== undefined && progress > 0;

  return (
    <div className={styles.card}>
      {showProgress && <ProgressBar progress={progress} />}
      <motion.div
        className={styles.body}
        key={typeof title === 'string' ? title : 'step'}
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      >
        {title && <h3 className={styles.title}>{title}</h3>}
        <div className={styles.formContent}>{children}</div>
      </motion.div>
      <div className={styles.footer}>{footer}</div>
    </div>
  );
};
