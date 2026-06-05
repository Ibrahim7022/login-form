import { Button } from '@/shared/components/Button/Button';
import { SelectableCard } from '@/shared/components/SelectableCard/SelectableCard';
import { StepCard } from '@/shared/components/StepCard/StepCard';
import type { AccountType } from '@/features/auth/types';

const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M5 20c0-3.314 3.134-6 7-6s7 2.686 7 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const BriefcaseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <rect x="4" y="8" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M9 8V6a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

interface AccountTypeStepProps {
  accountType: AccountType;
  onSelect: (type: AccountType) => void;
  onContinue: () => void;
  onBack: () => void;
  isLoading: boolean;
  direction: 'forward' | 'backward';
}

export const AccountTypeStep = ({
  accountType,
  onSelect,
  onContinue,
  onBack,
  isLoading,
  direction,
}: AccountTypeStepProps) => {
  return (
    <StepCard
      title={
        <>
          To join us tell us <strong>what type of account</strong> you are opening
        </>
      }
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
      <div className="flex flex-col gap-4" role="radiogroup" aria-label="Account type">
        <SelectableCard
          icon={<UserIcon />}
          label="Personal"
          isSelected={accountType === 'personal'}
          onClick={() => onSelect('personal')}
        />
        <SelectableCard
          icon={<BriefcaseIcon />}
          label="Business"
          isSelected={accountType === 'business'}
          onClick={() => onSelect('business')}
        />
      </div>
    </StepCard>
  );
};
