import { Button } from '@/shared/components/Button/Button';
import { TextField } from '@/shared/components/TextField/TextField';
import { StepCard } from '@/shared/components/StepCard/StepCard';

interface NameStepProps {
  firstName: string;
  lastName: string;
  errors: { firstName?: string; lastName?: string };
  progress: number;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onContinue: () => void;
  onBack: () => void;
  isLoading: boolean;
  direction: 'forward' | 'backward';
}

export const NameStep = ({
  firstName,
  lastName,
  errors,
  progress,
  onFirstNameChange,
  onLastNameChange,
  onContinue,
  onBack,
  isLoading,
  direction,
}: NameStepProps) => {
  return (
    <StepCard
      title="What is your name?"
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
          label="First Name"
          placeholder="Oliver"
          value={firstName}
          onChange={(e) => onFirstNameChange(e.target.value)}
          error={errors.firstName}
        />
        <TextField
          label="Last Name"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => onLastNameChange(e.target.value)}
          error={errors.lastName}
        />
      </div>
    </StepCard>
  );
};
