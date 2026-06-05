import { Button } from '@/shared/components/Button/Button';
import { OtpInput } from '@/shared/components/OtpInput/OtpInput';
import { StepCard } from '@/shared/components/StepCard/StepCard';

interface OtpStepProps {
  otp: string;
  error?: string;
  progress: number;
  resendSeconds: number;
  onChange: (value: string) => void;
  onResend: () => void;
  onContinue: () => void;
  onBack: () => void;
  isLoading: boolean;
  direction: 'forward' | 'backward';
}

export const OtpStep = ({
  otp,
  error,
  progress,
  resendSeconds,
  onChange,
  onResend,
  onContinue,
  onBack,
  isLoading,
  direction,
}: OtpStepProps) => {
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
      <OtpInput
        value={otp}
        onChange={onChange}
        error={error}
        resendSeconds={resendSeconds}
        onResend={onResend}
      />
    </StepCard>
  );
};
