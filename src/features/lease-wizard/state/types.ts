export type LandlordType = 'individual' | 'company' | '';
export type MinorsAnswer = 'yes' | 'no' | '';

export interface LeaseFormState {
  currentStep: number; // 1–7 = steps, 8 = completion
  // Step 1
  landlordType: LandlordType;
  // Step 2
  landlordName: string;
  landlordPhone: string;
  landlordEmail: string;
  landlordCity: string;
  landlordState: string;
  landlordZip: string;
  // Step 3
  tenantName: string;
  tenantPhone: string;
  tenantEmail: string;
  // Step 4
  minors: MinorsAnswer;
  minorNames: string[];
  // Step 5
  propertyType: string;
  // Step 6
  propertyStreet: string;
  propertyCity: string;
  propertyState: string;
  propertyZip: string;
  // Step 7
  leaseDate: string;
  startDate: string;
  endDate: string;
  rentAmount: string;
  rentDueDay: string;
  securityDeposit: string;
  paymentMethod: string;
  // Validation
  errors: Record<string, string>;
}

export type LeaseFormAction =
  | { type: 'SET_FIELD'; field: keyof Omit<LeaseFormState, 'errors' | 'minorNames' | 'currentStep'>; value: string }
  | { type: 'SET_MINOR_NAME'; index: number; value: string }
  | { type: 'ADD_MINOR' }
  | { type: 'SET_ERRORS'; errors: Record<string, string> }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'GOTO_STEP'; step: number };
