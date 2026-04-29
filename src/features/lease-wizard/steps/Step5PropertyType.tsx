import { Dropdown } from '../components/Dropdown';
import type { LeaseFormState, LeaseFormAction } from '../state/types';

interface Props {
  state: LeaseFormState;
  dispatch: React.Dispatch<LeaseFormAction>;
}

const PROPERTY_TYPES = [
  { value: 'single-family', label: 'Single family home' },
  { value: 'condo', label: 'Condo' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'duplex', label: 'Duplex' },
  { value: 'other', label: 'Other' },
];

export function Step5PropertyType({ state, dispatch }: Props) {
  return (
    <>
      <div className="flex flex-col gap-[8px]">
        <h2 className="text-[20px] font-semibold leading-[28px] text-[#282B2F] m-0">
          What type of home is the leased property?
        </h2>
        <p className="text-[16px] font-normal leading-[24px] text-[#282B2F] tracking-[0.128px]">
          Using the dropdown menu, select the type of home that the leased property is categorized
          as. For example, "Single-family home."
        </p>
      </div>
      <div className="w-[335px]">
        <Dropdown
          label="Property type"
          name="propertyType"
          value={state.propertyType}
          onChange={e => dispatch({ type: 'SET_FIELD', field: 'propertyType', value: e.target.value })}
          options={PROPERTY_TYPES}
          required
          error={state.errors.propertyType}
        />
      </div>
    </>
  );
}
