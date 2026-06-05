import { AnimatePresence } from 'framer-motion';
import { RegistrationLayout } from '@/shared/components/RegistrationLayout/RegistrationLayout';
import { SuccessModal } from '@/shared/components/Modal/SuccessModal';
import { AccountTypeStep } from '@/features/auth/components/AccountTypeStep';
import { MobileNumberStep } from '@/features/auth/components/MobileNumberStep';
import { OtpStep } from '@/features/auth/components/OtpStep';
import { NameStep } from '@/features/auth/components/NameStep';
import { PasswordStep } from '@/features/auth/components/PasswordStep';
import { useRegistrationFlow } from '@/features/auth/hooks/useRegistrationFlow';
import {
  formatAccountType,
  maskEmail,
} from '@/shared/utils/validation';

export const RegistrationPage = () => {
  const flow = useRegistrationFlow();
  const { formData, currentStep } = flow;

  const fullName = [formData.firstName, formData.lastName]
    .filter(Boolean)
    .join(' ') || 'John Doe';

  const summary = [
    { label: 'Account Type', value: formatAccountType(formData.accountType) },
    { label: 'Email', value: maskEmail(formData.firstName || 'jo') },
    { label: 'Name', value: fullName },
    {
      label: 'Mobile Number',
      value: formData.mobileNumber || '9711677290',
    },
  ];

  const handleDashboard = () => {
    alert('Welcome to your dashboard! Registration complete.');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'account-type':
        return (
          <AccountTypeStep
            accountType={formData.accountType}
            onSelect={flow.setAccountType}
            onContinue={flow.handleContinue}
            onBack={flow.handleBack}
            isLoading={flow.isLoading}
            direction={flow.direction}
          />
        );
      case 'mobile':
        return (
          <MobileNumberStep
            countryCode={formData.countryCode}
            mobileNumber={formData.mobileNumber}
            error={flow.errors.mobileNumber}
            progress={flow.progress}
            onCountryChange={flow.setCountryCode}
            onChange={flow.setMobileNumber}
            onContinue={flow.handleContinue}
            onBack={flow.handleBack}
            isLoading={flow.isLoading}
            direction={flow.direction}
          />
        );
      case 'otp':
        return (
          <OtpStep
            otp={formData.otp}
            error={flow.errors.otp}
            progress={flow.progress}
            resendSeconds={flow.resendSeconds}
            onChange={flow.setOtp}
            onResend={flow.handleResendOtp}
            onContinue={flow.handleContinue}
            onBack={flow.handleBack}
            isLoading={flow.isLoading}
            direction={flow.direction}
          />
        );
      case 'name':
        return (
          <NameStep
            firstName={formData.firstName}
            lastName={formData.lastName}
            errors={{
              firstName: flow.errors.firstName,
              lastName: flow.errors.lastName,
            }}
            progress={flow.progress}
            onFirstNameChange={flow.setFirstName}
            onLastNameChange={flow.setLastName}
            onContinue={flow.handleContinue}
            onBack={flow.handleBack}
            isLoading={flow.isLoading}
            direction={flow.direction}
          />
        );
      case 'password':
        return (
          <PasswordStep
            password={formData.password}
            confirmPassword={formData.confirmPassword}
            errors={{
              password: flow.errors.password,
              confirmPassword: flow.errors.confirmPassword,
            }}
            progress={flow.progress}
            onPasswordChange={flow.setPassword}
            onConfirmPasswordChange={flow.setConfirmPassword}
            onContinue={flow.handleContinue}
            onBack={flow.handleBack}
            isLoading={flow.isLoading}
            direction={flow.direction}
          />
        );
      default:
        return null;
    }
  };

  return (
    <RegistrationLayout>
      <AnimatePresence mode="wait">
        <div key={currentStep}>{renderStep()}</div>
      </AnimatePresence>
      <SuccessModal
        isOpen={flow.showSuccessModal}
        summary={summary}
        onGoToDashboard={handleDashboard}
      />
    </RegistrationLayout>
  );
};
