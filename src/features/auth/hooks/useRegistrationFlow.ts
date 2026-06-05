import { useCallback, useEffect, useState } from 'react';
import {
  goToNextStep,
  goToPreviousStep,
  setAccountType,
  setCountryCode,
  setMobileNumber,
  setOtp,
  setFirstName,
  setLastName,
  setPassword,
  setConfirmPassword,
  setErrors,
  setLoading,
  showSuccess,
  selectProgress,
} from '@/features/auth/store/registrationSlice';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/hooks/useAppSelector';
import {
  validateMobileNumber,
  validateOtp,
  validateName,
  validatePassword,
} from '@/shared/utils/validation';
import type { AccountType } from '@/features/auth/types';

const MOCK_OTP = '8642';
const API_DELAY_MS = 800;

const simulateApi = () =>
  new Promise<void>((resolve) => setTimeout(resolve, API_DELAY_MS));

export const useRegistrationFlow = () => {
  const dispatch = useAppDispatch();
  const { currentStep, formData, errors, isLoading, showSuccessModal, direction } =
    useAppSelector((state) => state.registration);

  const [resendSeconds, setResendSeconds] = useState(0);

  useEffect(() => {
    if (resendSeconds <= 0) return;
    const timer = setInterval(() => {
      setResendSeconds((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendSeconds]);

  const progress = selectProgress(currentStep);

  const handleContinue = useCallback(async () => {
    dispatch(setLoading(true));

    try {
      switch (currentStep) {
        case 'account-type': {
          await simulateApi();
          dispatch(goToNextStep());
          break;
        }
        case 'mobile': {
          const mobileError = validateMobileNumber(formData.mobileNumber);
          if (mobileError) {
            dispatch(setErrors({ mobileNumber: mobileError }));
            return;
          }
          await simulateApi();
          setResendSeconds(59);
          dispatch(goToNextStep());
          break;
        }
        case 'otp': {
          const otpError = validateOtp(formData.otp);
          if (otpError) {
            dispatch(setErrors({ otp: otpError }));
            return;
          }
          if (formData.otp !== MOCK_OTP) {
            dispatch(setErrors({ otp: 'Invalid OTP. Use 8642 for demo.' }));
            return;
          }
          await simulateApi();
          dispatch(goToNextStep());
          break;
        }
        case 'name': {
          const nameErrors = validateName(
            formData.firstName,
            formData.lastName,
          );
          if (Object.keys(nameErrors).length > 0) {
            dispatch(setErrors(nameErrors));
            return;
          }
          await simulateApi();
          dispatch(goToNextStep());
          break;
        }
        case 'password': {
          const passwordErrors = validatePassword(
            formData.password,
            formData.confirmPassword,
          );
          if (Object.keys(passwordErrors).length > 0) {
            dispatch(setErrors(passwordErrors));
            return;
          }
          await simulateApi();
          dispatch(showSuccess());
          break;
        }
      }
    } finally {
      dispatch(setLoading(false));
    }
  }, [currentStep, dispatch, formData]);

  const handleBack = useCallback(() => {
    if (currentStep === 'account-type') return;
    dispatch(goToPreviousStep());
  }, [currentStep, dispatch]);

  const handleResendOtp = useCallback(() => {
    if (resendSeconds > 0) return;
    setResendSeconds(59);
    dispatch(setOtp(''));
  }, [resendSeconds, dispatch]);

  return {
    currentStep,
    formData,
    errors,
    isLoading,
    showSuccessModal,
    direction,
    progress,
    resendSeconds,
    handleContinue,
    handleBack,
    handleResendOtp,
    setAccountType: (type: AccountType) => dispatch(setAccountType(type)),
    setCountryCode: (code: string) => dispatch(setCountryCode(code)),
    setMobileNumber: (v: string) => dispatch(setMobileNumber(v)),
    setOtp: (v: string) => dispatch(setOtp(v)),
    setFirstName: (v: string) => dispatch(setFirstName(v)),
    setLastName: (v: string) => dispatch(setLastName(v)),
    setPassword: (v: string) => dispatch(setPassword(v)),
    setConfirmPassword: (v: string) => dispatch(setConfirmPassword(v)),
  };
};
