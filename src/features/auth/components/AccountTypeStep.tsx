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
  <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M14 3C15.0938 3 16 3.90625 16 5V13C16 14.125 15.0938 15 14 15H2C0.875 15 0 14.125 0 13V5C0 3.90625 0.875 3 2 3H4V2C4 0.90625 4.875 0 6 0H10C11.0938 0 12 0.90625 12 2V3H14ZM5.5 2V3H10.5V2C10.5 1.75 10.25 1.5 10 1.5H6C5.71875 1.5 5.5 1.75 5.5 2ZM11.5 4.5H4.5V13.5H11.5V4.5ZM1.5 13C1.5 13.2812 1.71875 13.5 2 13.5H3V4.5H2C1.71875 4.5 1.5 4.75 1.5 5V13ZM14.5 13V5C14.5 4.75 14.25 4.5 14 4.5H13V13.5H14C14.25 13.5 14.5 13.2812 14.5 13Z" fill="#132C4A"/>
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
