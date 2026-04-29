import { Input } from '../components/Input';
import { Dropdown } from '../components/Dropdown';
import { US_STATES } from './usStates';
import type { LeaseFormState, LeaseFormAction } from '../state/types';

interface Props {
  state: LeaseFormState;
  dispatch: React.Dispatch<LeaseFormAction>;
}

export function Step6PropertyAddress({ state, dispatch }: Props) {
  const field =
    (f: keyof Omit<LeaseFormState, 'errors' | 'minorNames' | 'currentStep'>) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({ type: 'SET_FIELD', field: f, value: e.target.value });

  return (
    <>
      <div className="flex flex-col gap-[8px]">
        <h2 className="text-[20px] font-semibold leading-[28px] text-[#282B2F] m-0">
          What is the address of the leased property?
        </h2>
        <p className="text-[16px] font-normal leading-[24px] text-[#282B2F] tracking-[0.128px]">
          Please enter the full name of the city, not abbreviations — e.g. "San Francisco" not
          "SF". This lease has unique sections that rely on the city being entered correctly.
        </p>
      </div>
      <div className="flex flex-col gap-[16px] w-[335px]">
        <Input
          label="Street"
          name="propertyStreet"
          value={state.propertyStreet}
          onChange={field('propertyStreet')}
          required
          error={state.errors.propertyStreet}
        />
        <Input
          label="City"
          name="propertyCity"
          value={state.propertyCity}
          onChange={field('propertyCity')}
          required
          error={state.errors.propertyCity}
        />
        <Dropdown
          label="State"
          name="propertyState"
          value={state.propertyState}
          onChange={e => dispatch({ type: 'SET_FIELD', field: 'propertyState', value: e.target.value })}
          options={US_STATES}
          error={state.errors.propertyState}
        />
        <Input
          label="ZIP code"
          name="propertyZip"
          value={state.propertyZip}
          onChange={field('propertyZip')}
          error={state.errors.propertyZip}
        />
      </div>
    </>
  );
}
