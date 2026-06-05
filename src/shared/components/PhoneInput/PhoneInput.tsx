import styles from './PhoneInput.module.scss';

const COUNTRY_OPTIONS = [
  { code: '+1', flag: '🇺🇸', label: 'US' },
  { code: '+44', flag: '🇬🇧', label: 'UK' },
  { code: '+91', flag: '🇮🇳', label: 'IN' },
  { code: '+971', flag: '🇦🇪', label: 'AE' },
];

interface PhoneInputProps {
  countryCode: string;
  value: string;
  onCountryChange: (code: string) => void;
  onChange: (value: string) => void;
  error?: string;
}

export const PhoneInput = ({
  countryCode,
  value,
  onCountryChange,
  onChange,
  error,
}: PhoneInputProps) => {
  const selected =
    COUNTRY_OPTIONS.find((c) => c.code === countryCode) ?? COUNTRY_OPTIONS[0];

  return (
    <div className={`${styles.wrapper} ${error ? styles.error : ''}`}>
      <label className={styles.label}>
        Mobile Number<span className={styles.required}>*</span>
      </label>
      <div className={styles.row}>
        <select
          className={styles.countrySelect}
          value={countryCode}
          onChange={(e) => onCountryChange(e.target.value)}
          aria-label="Country code"
        >
          {COUNTRY_OPTIONS.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.flag} {opt.code}
            </option>
          ))}
        </select>
        <input
          type="tel"
          className={styles.phoneInput}
          placeholder="8343989239"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, '').slice(0, 10))}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'phone-error' : undefined}
        />
      </div>
      {error && (
        <span id="phone-error" className={styles.errorText} role="alert">
          {error}
        </span>
      )}
      <span className="sr-only">{selected.label}</span>
    </div>
  );
};
