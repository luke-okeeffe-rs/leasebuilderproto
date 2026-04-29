import { RadioGroup } from '../components/RadioGroup';
import type { LeaseFormState, LeaseFormAction } from '../state/types';

interface Props {
  state: LeaseFormState;
  dispatch: React.Dispatch<LeaseFormAction>;
}

export function Step1LandlordType({ state, dispatch }: Props) {
  return (
    <>
      <div className="flex flex-col gap-[8px]">
        <h2 className="text-[20px] font-semibold leading-[28px] text-[#282B2F] m-0">
          Is the landlord an individual or a company?
        </h2>
        <p className="text-[16px] font-normal leading-[24px] text-[#282B2F] tracking-[0.128px]">
          If the leased property is owned by a private person, choose "Individual". If the leased
          property is owned by a business, choose "Company".
        </p>
      </div>
      <RadioGroup
        name="landlordType"
        value={state.landlordType}
        onChange={e => dispatch({ type: 'SET_FIELD', field: 'landlordType', value: e.target.value })}
        options={[
          { value: 'individual', label: 'Individual' },
          { value: 'company', label: 'Company' },
        ]}
        error={state.errors.landlordType}
      />
    </>
  );
}
