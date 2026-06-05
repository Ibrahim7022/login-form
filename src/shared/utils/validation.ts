import type { FieldErrors, RegistrationFormData } from '@/features/auth/types';

const PHONE_REGEX = /^\d{10}$/;
const OTP_REGEX = /^\d{4}$/;

export const validateAccountType = (
  accountType: string,
): string | undefined => {
  if (!accountType) return 'Please select an account type';
  return undefined;
};

export const validateMobileNumber = (mobile: string): string | undefined => {
  if (!mobile.trim()) return 'Mobile number is required';
  if (!PHONE_REGEX.test(mobile.replace(/\s/g, ''))) {
    return 'Please enter a valid 10-digit mobile number';
  }
  return undefined;
};

export const validateOtp = (otp: string): string | undefined => {
  if (!otp.trim()) return 'OTP is required';
  if (!OTP_REGEX.test(otp)) return 'Please enter the 4-digit OTP';
  return undefined;
};

export const validateName = (
  firstName: string,
  lastName: string,
): FieldErrors => {
  const errors: FieldErrors = {};
  if (!firstName.trim()) errors.firstName = 'First name is required';
  if (!lastName.trim()) errors.lastName = 'Last name is required';
  return errors;
};

export const validatePassword = (
  password: string,
  confirmPassword: string,
): FieldErrors => {
  const errors: FieldErrors = {};
  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 6) {
    errors.password = 'Must be at least 6 characters';
  }
  if (!confirmPassword) {
    errors.confirmPassword = 'Please confirm your password';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Both passwords must match';
  }
  return errors;
};

export const maskEmail = (firstName: string): string => {
  const prefix = firstName.toLowerCase().slice(0, 2) || 'jo';
  return `${prefix}••••@example.com`;
};

export const formatAccountType = (type: RegistrationFormData['accountType']) =>
  type.charAt(0).toUpperCase() + type.slice(1);
