import { useRef, useEffect, useCallback, type KeyboardEvent } from 'react';
import styles from './OtpInput.module.scss';

const OTP_LENGTH = 4;

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  resendSeconds: number;
  onResend: () => void;
}

export const OtpInput = ({
  value,
  onChange,
  error,
  resendSeconds,
  onResend,
}: OtpInputProps) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = value.padEnd(OTP_LENGTH, ' ').split('').slice(0, OTP_LENGTH);

  const updateValue = useCallback(
    (newDigits: string[]) => {
      onChange(newDigits.join('').replace(/\s/g, ''));
    },
    [onChange],
  );

  useEffect(() => {
    if (value.length === 0) {
      inputRefs.current[0]?.focus();
    }
  }, [value.length]);

  const handleChange = (index: number, char: string) => {
    const digit = char.replace(/\D/g, '').slice(-1);
    const newDigits = [...digits.map((d) => (d === ' ' ? '' : d))];
    newDigits[index] = digit;
    updateValue(newDigits);
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      const current = digits[index]?.trim();
      if (!current && index > 0) {
        inputRefs.current[index - 1]?.focus();
        const newDigits = [...digits.map((d) => (d === ' ' ? '' : d))];
        newDigits[index - 1] = '';
        updateValue(newDigits);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    onChange(pasted);
    const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.subtitle}>An OTP has been sent to your mobile number</p>
      <div className={styles.inputs} role="group" aria-label="OTP verification code">
        {Array.from({ length: OTP_LENGTH }).map((_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            className={`${styles.digit} ${error ? styles.error : ''}`}
            value={digits[index]?.trim() ?? ''}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            aria-label={`Digit ${index + 1}`}
          />
        ))}
      </div>
      {error && (
        <span className={styles.errorText} role="alert">
          {error}
        </span>
      )}
      <p className={styles.resend}>
        Did not receive OTP?{' '}
        <button
          type="button"
          className={styles.resendLink}
          onClick={onResend}
          disabled={resendSeconds > 0}
        >
          {resendSeconds > 0
            ? `Resend OTP (${resendSeconds}s)`
            : 'Resend OTP'}
        </button>
      </p>
    </div>
  );
};
