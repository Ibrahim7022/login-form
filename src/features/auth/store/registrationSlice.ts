import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  AccountType,
  FieldErrors,
  RegistrationFormData,
  RegistrationStep,
} from '@/features/auth/types';

interface RegistrationState {
  currentStep: RegistrationStep;
  formData: RegistrationFormData;
  errors: FieldErrors;
  isLoading: boolean;
  showSuccessModal: boolean;
  direction: 'forward' | 'backward';
}

const initialFormData: RegistrationFormData = {
  accountType: 'personal',
  countryCode: '+1',
  mobileNumber: '',
  otp: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
};

const initialState: RegistrationState = {
  currentStep: 'account-type',
  formData: initialFormData,
  errors: {},
  isLoading: false,
  showSuccessModal: false,
  direction: 'forward',
};

const stepOrder: RegistrationStep[] = [
  'account-type',
  'mobile',
  'otp',
  'name',
  'password',
];

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setAccountType: (state, action: PayloadAction<AccountType>) => {
      state.formData.accountType = action.payload;
      delete state.errors.accountType;
    },
    setCountryCode: (state, action: PayloadAction<string>) => {
      state.formData.countryCode = action.payload;
    },
    setMobileNumber: (state, action: PayloadAction<string>) => {
      state.formData.mobileNumber = action.payload;
      delete state.errors.mobileNumber;
    },
    setOtp: (state, action: PayloadAction<string>) => {
      state.formData.otp = action.payload;
      delete state.errors.otp;
    },
    setFirstName: (state, action: PayloadAction<string>) => {
      state.formData.firstName = action.payload;
      delete state.errors.firstName;
    },
    setLastName: (state, action: PayloadAction<string>) => {
      state.formData.lastName = action.payload;
      delete state.errors.lastName;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.formData.password = action.payload;
      delete state.errors.password;
    },
    setConfirmPassword: (state, action: PayloadAction<string>) => {
      state.formData.confirmPassword = action.payload;
      delete state.errors.confirmPassword;
    },
    setErrors: (state, action: PayloadAction<FieldErrors>) => {
      state.errors = action.payload;
    },
    clearErrors: (state) => {
      state.errors = {};
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    goToNextStep: (state) => {
      const currentIndex = stepOrder.indexOf(state.currentStep);
      if (currentIndex < stepOrder.length - 1) {
        state.currentStep = stepOrder[currentIndex + 1];
        state.direction = 'forward';
        state.errors = {};
      }
    },
    goToPreviousStep: (state) => {
      const currentIndex = stepOrder.indexOf(state.currentStep);
      if (currentIndex > 0) {
        state.currentStep = stepOrder[currentIndex - 1];
        state.direction = 'backward';
        state.errors = {};
      }
    },
    showSuccess: (state) => {
      state.showSuccessModal = true;
      state.isLoading = false;
    },
    hideSuccess: (state) => {
      state.showSuccessModal = false;
    },
    resetRegistration: () => initialState,
  },
});

export const {
  setAccountType,
  setCountryCode,
  setMobileNumber,
  setOtp,
  setFirstName,
  setLastName,
  setPassword,
  setConfirmPassword,
  setErrors,
  clearErrors,
  setLoading,
  goToNextStep,
  goToPreviousStep,
  showSuccess,
  hideSuccess,
  resetRegistration,
} = registrationSlice.actions;

export const registrationReducer = registrationSlice.reducer;

export const selectProgress = (step: RegistrationStep): number => {
  const progressMap: Record<RegistrationStep, number> = {
    'account-type': 0,
    mobile: 20,
    otp: 40,
    name: 60,
    password: 80,
  };
  return progressMap[step];
};
