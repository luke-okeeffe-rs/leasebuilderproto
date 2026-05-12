import type { LeaseFormState, LeaseFormAction } from './types';

export const initialState: LeaseFormState = {
  currentStep: 1,
  landlordType: '',
  landlordName: '',
  landlordPhone: '',
  landlordEmail: '',
  landlordCity: '',
  landlordState: '',
  landlordZip: '',
  tenantName: '',
  tenantPhone: '',
  tenantEmail: '',
  minors: '',
  minorNames: [],
  propertyType: '',
  propertyStreet: '',
  propertyCity: '',
  propertyState: '',
  propertyZip: '',
  leaseDate: '',
  startDate: '',
  endDate: '',
  rentAmount: '',
  rentDueDay: '',
  proRateFrom: '',
  proRateTo: '',
  proRateAmount: '',
  securityDeposit: '',
  paymentMethod: '',
  errors: {},
};

export function leaseFormReducer(state: LeaseFormState, action: LeaseFormAction): LeaseFormState {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value,
        errors: { ...state.errors, [action.field]: '' },
      };
    case 'SET_MINOR_NAME': {
      const names = [...state.minorNames];
      names[action.index] = action.value;
      return { ...state, minorNames: names };
    }
    case 'ADD_MINOR':
      return { ...state, minorNames: [...state.minorNames, ''] };
    case 'SET_ERRORS':
      return { ...state, errors: action.errors };
    case 'NEXT_STEP':
      return { ...state, currentStep: state.currentStep + 1, errors: {} };
    case 'PREV_STEP':
      return { ...state, currentStep: Math.max(1, state.currentStep - 1), errors: {} };
    case 'GOTO_STEP':
      return { ...state, currentStep: action.step, errors: {} };
    case 'GOTO_STEP_WITH_ERRORS':
      return { ...state, currentStep: action.step, errors: action.errors };
    default:
      return state;
  }
}

const STEP_PROGRESS: Record<number, number> = {
  1: 4, 2: 6, 3: 8, 4: 10, 5: 12, 6: 90, 7: 90,
};

export function getProgress(step: number): number {
  return STEP_PROGRESS[step] ?? 0;
}

export function canContinue(step: number, state: LeaseFormState): boolean {
  switch (step) {
    case 1: return !!state.landlordType;
    case 2: return !!state.landlordPhone && !!state.landlordEmail;
    case 3: return true;
    case 4: return !!state.propertyType;
    case 5: return !!state.propertyStreet && !!state.propertyCity;
    case 6: return !!state.startDate && !!state.endDate && !!state.rentAmount;
    default: return true;
  }
}

export function allStepsComplete(state: LeaseFormState): boolean {
  return [1, 2, 3, 4, 5, 6].every(step => canContinue(step, state));
}

export function validateStep(step: number, state: LeaseFormState): Record<string, string> {
  const errors: Record<string, string> = {};
  switch (step) {
    case 1:
      if (!state.landlordType) errors.landlordType = 'Please select an option';
      break;
    case 2:
      if (!state.landlordName) errors.landlordName = 'Name is required';
      if (!state.landlordPhone) errors.landlordPhone = 'Phone number is required';
      if (!state.landlordEmail) errors.landlordEmail = 'Email address is required';
      break;
    case 3:
      if (!state.tenantName) errors.tenantName = 'Tenant name is required';
      if (!state.tenantPhone) errors.tenantPhone = 'Tenant phone number is required';
      if (!state.tenantEmail) errors.tenantEmail = 'Tenant email address is required';
      break;
    case 4:
      if (!state.propertyType) errors.propertyType = 'Please select a property type';
      break;
    case 5:
      if (!state.propertyStreet) errors.propertyStreet = 'Street address is required';
      if (!state.propertyCity) errors.propertyCity = 'City is required';
      if (!state.propertyState) errors.propertyState = 'State is required';
      break;
    case 6:
      if (!state.startDate) errors.startDate = 'Lease start date is required';
      if (!state.endDate) errors.endDate = 'Lease end date is required';
      if (!state.rentAmount) errors.rentAmount = 'Monthly rent is required';
      break;
  }
  return errors;
}
