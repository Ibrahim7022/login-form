import { useId, type InputHTMLAttributes } from 'react';
import styles from './TextField.module.scss';

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  showToggle?: boolean;
  isPasswordVisible?: boolean;
  onToggleVisibility?: () => void;
}

const EyeIcon = ({ hidden }: { hidden: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
    {hidden ? (
      <>
        <path
          d="M3 3L21 21M10.5 10.677a2 2 0 002.823 2.823M7.362 7.561C5.68 8.74 4.279 10.42 3 12c1.889 2.78 5.077 6 9 6 1.55 0 2.97-.45 4.238-1.194M14.12 14.12A2 2 0 0010.5 10.677"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M9.88 9.88C11.4 8.74 13.2 8 15 8c3.923 0 7.111 3.22 9 6-.64.94-1.45 1.8-2.38 2.52"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </>
    ) : (
      <>
        <path
          d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      </>
    )}
  </svg>
);

export const TextField = ({
  label,
  hint,
  error,
  required,
  showToggle,
  isPasswordVisible,
  onToggleVisibility,
  className = '',
  id: externalId,
  ...props
}: TextFieldProps) => {
  const generatedId = useId();
  const id = externalId ?? generatedId;
  const hasError = Boolean(error);

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <div className={styles.inputWrapper}>
        <input
          id={id}
          className={`${styles.input} ${showToggle ? styles.hasToggle : ''} ${hasError ? styles.error : ''} ${className}`}
          aria-invalid={hasError}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          {...props}
        />
        {showToggle && onToggleVisibility && (
          <button
            type="button"
            className={styles.toggle}
            onClick={onToggleVisibility}
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
          >
            <EyeIcon hidden={!isPasswordVisible} />
          </button>
        )}
      </div>
      {(error || hint) && (
        <span
          id={error ? `${id}-error` : `${id}-hint`}
          className={`${styles.hint} ${hasError ? styles.hintError : ''}`}
          role={error ? 'alert' : undefined}
        >
          {error ?? hint}
        </span>
      )}
    </div>
  );
};
