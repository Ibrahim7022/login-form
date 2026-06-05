export type AccountType = 'personal' | 'business';

export type RegistrationStep =
  | 'account-type'
  | 'mobile'
  | 'otp'
  | 'name'
  | 'password';

export interface RegistrationFormData {
  accountType: AccountType;
  countryCode: string;
  mobileNumber: string;
  otp: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export interface FieldErrors {
  accountType?: string;
  mobileNumber?: string;
  otp?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  confirmPassword?: string;
}
