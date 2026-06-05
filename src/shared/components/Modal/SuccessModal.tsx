import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/shared/components/Button/Button';
import styles from './Modal.module.scss';

interface SummaryItem {
  label: string;
  value: string;
}

interface SuccessModalProps {
  isOpen: boolean;
  summary: SummaryItem[];
  onGoToDashboard: () => void;
}

export const SuccessModal = ({
  isOpen,
  summary,
  onGoToDashboard,
}: SuccessModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-title"
        >
          <motion.div
            className={styles.dialog}
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className={styles.icon} aria-hidden>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12L10 17L19 7"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 id="success-title" className={styles.title}>
              You&apos;re all set!
            </h2>
            <p className={styles.subtitle}>
              Here&apos;s a quick summary of your account details
            </p>
            <div className={styles.summary}>
              {summary.map((item) => (
                <div key={item.label} className={styles.row}>
                  <span className={styles.rowLabel}>{item.label}</span>
                  <span className={styles.rowValue}>{item.value}</span>
                </div>
              ))}
            </div>
            <p className={styles.security}>
              <svg
                className={styles.shield}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M12 2L4 6v6c0 5 3.5 9.5 8 10 4.5-.5 8-5 8-10V6l-8-4z"
                  stroke="#16A34A"
                  strokeWidth="1.5"
                  fill="#DCFCE7"
                />
                <path
                  d="M9 12l2 2 4-4"
                  stroke="#16A34A"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              Your account is secured with bank-grade security
            </p>
            <Button className={styles.action} onClick={onGoToDashboard}>
              Go To Dashboard
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
