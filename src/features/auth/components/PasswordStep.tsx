import { useState } from 'react';
import { Button } from '@/shared/components/Button/Button';
import { TextField } from '@/shared/components/TextField/TextField';
import { StepCard } from '@/shared/components/StepCard/StepCard';

interface PasswordStepProps {
  password: string;
  confirmPassword: string;
  errors: { password?: string; confirmPassword?: string };
  progress: number;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onContinue: () => void;
  onBack: () => void;
  isLoading: boolean;
  direction: 'forward' | 'backward';
}

export const PasswordStep = ({
  password,
  confirmPassword,
  errors,
  progress,
  onPasswordChange,
  onConfirmPasswordChange,
  onContinue,
  onBack,
  isLoading,
  direction,
}: PasswordStepProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordHint =
    errors.password ?? 'Must be atleast 6 characters';
  const confirmHint =
    errors.confirmPassword ?? 'Both passwords must match';

  return (
    <StepCard
      title="Create Password for your account"
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
      <div className="flex flex-col gap-5">
        <TextField
          label="Enter new password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter new password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          error={errors.password}
          hint={!errors.password ? passwordHint : undefined}
          showToggle
          isPasswordVisible={showPassword}
          onToggleVisibility={() => setShowPassword((v) => !v)}
        />
        <TextField
          label="Confirm password"
          type={showConfirm ? 'text' : 'password'}
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => onConfirmPasswordChange(e.target.value)}
          error={errors.confirmPassword}
          hint={!errors.confirmPassword ? confirmHint : undefined}
          showToggle
          isPasswordVisible={showConfirm}
          onToggleVisibility={() => setShowConfirm((v) => !v)}
        />
      </div>
    </StepCard>
  );
};
