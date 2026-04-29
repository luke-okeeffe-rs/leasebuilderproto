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
    default:
      return state;
  }
}

const STEP_PROGRESS: Record<number, number> = {
  1: 0, 2: 2, 3: 6, 4: 8, 5: 12, 6: 14, 7: 16, 8: 100,
};

export function getProgress(step: number): number {
  return STEP_PROGRESS[step] ?? 0;
}

export function canContinue(step: number, state: LeaseFormState): boolean {
  switch (step) {
    case 1: return !!state.landlordType;
    case 2: return !!state.landlordPhone && !!state.landlordEmail;
    case 3: return true;
    case 4: return !!state.minors;
    case 5: return !!state.propertyType;
    case 6: return !!state.propertyStreet && !!state.propertyCity;
    case 7: return !!state.startDate && !!state.endDate && !!state.rentAmount;
    default: return true;
  }
}
