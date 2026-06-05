import { Button } from '@/shared/components/Button/Button';
import { PhoneInput } from '@/shared/components/PhoneInput/PhoneInput';
import { StepCard } from '@/shared/components/StepCard/StepCard';

interface MobileNumberStepProps {
  countryCode: string;
  mobileNumber: string;
  error?: string;
  progress: number;
  onCountryChange: (code: string) => void;
  onChange: (value: string) => void;
  onContinue: () => void;
  onBack: () => void;
  isLoading: boolean;
  direction: 'forward' | 'backward';
}

export const MobileNumberStep = ({
  countryCode,
  mobileNumber,
  error,
  progress,
  onCountryChange,
  onChange,
  onContinue,
  onBack,
  isLoading,
  direction,
}: MobileNumberStepProps) => {
  return (
    <StepCard
      title="OTP Verification"
      progress={progress}
      direction={direction}
      footer={
        <>
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button variant="primary" isLoading={isLoading} onClick={onContinue}>
            Continue
          </Button>
        </>
      }
    >
      <PhoneInput
        countryCode={countryCode}
        value={mobileNumber}
        onCountryChange={onCountryChange}
        onChange={onChange}
        error={error}
      />
    </StepCard>
  );
};
