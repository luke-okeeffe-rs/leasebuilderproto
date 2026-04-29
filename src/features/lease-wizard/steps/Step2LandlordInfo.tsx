import { Input } from '../components/Input';
import { Dropdown } from '../components/Dropdown';
import { US_STATES } from './usStates';
import type { LeaseFormState, LeaseFormAction } from '../state/types';

interface Props {
  state: LeaseFormState;
  dispatch: React.Dispatch<LeaseFormAction>;
}

export function Step2LandlordInfo({ state, dispatch }: Props) {
  const field =
    (f: keyof Omit<LeaseFormState, 'errors' | 'minorNames' | 'currentStep'>) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({ type: 'SET_FIELD', field: f, value: e.target.value });

  return (
    <>
      <div className="flex flex-col gap-[8px]">
        <h2 className="text-[20px] font-semibold leading-[28px] text-[#282B2F] m-0">
          Tell us about the landlord.
        </h2>
        <p className="text-[16px] font-normal leading-[24px] text-[#282B2F] tracking-[0.128px]">
          Enter the full name, contact information, and address of the landlord.
        </p>
      </div>
      <div className="flex flex-col gap-[16px] w-[335px]">
        <Input
          label="Name"
          name="landlordName"
          value={state.landlordName}
          onChange={field('landlordName')}
          error={state.errors.landlordName}
        />
        <Input
          label="Phone number"
          name="landlordPhone"
          value={state.landlordPhone}
          onChange={field('landlordPhone')}
          type="tel"
          required
          error={state.errors.landlordPhone}
        />
        <Input
          label="Email address"
          name="landlordEmail"
          value={state.landlordEmail}
          onChange={field('landlordEmail')}
          type="email"
          required
          error={state.errors.landlordEmail}
        />
        <Input
          label="City"
          name="landlordCity"
          value={state.landlordCity}
          onChange={field('landlordCity')}
          error={state.errors.landlordCity}
        />
        <Dropdown
          label="State"
          name="landlordState"
          value={state.landlordState}
          onChange={e => dispatch({ type: 'SET_FIELD', field: 'landlordState', value: e.target.value })}
          options={US_STATES}
          error={state.errors.landlordState}
        />
        <Input
          label="ZIP code"
          name="landlordZip"
          value={state.landlordZip}
          onChange={field('landlordZip')}
          error={state.errors.landlordZip}
        />
      </div>
    </>
  );
}
