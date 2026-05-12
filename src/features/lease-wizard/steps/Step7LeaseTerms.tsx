import { Input } from '../components/Input';
import type { LeaseFormState, LeaseFormAction } from '../state/types';

interface Props {
  state: LeaseFormState;
  dispatch: React.Dispatch<LeaseFormAction>;
}

export function Step7LeaseTerms({ state, dispatch }: Props) {
  const field =
    (f: keyof Omit<LeaseFormState, 'errors' | 'minorNames' | 'currentStep'>) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({ type: 'SET_FIELD', field: f, value: e.target.value });

  return (
    <>
      <div className="flex flex-col gap-[8px]">
        <h2 className="text-[20px] font-semibold leading-[28px] text-[#282B2F] m-0">
          Tell us about the lease terms.
        </h2>
        <p className="text-[16px] font-normal leading-[24px] text-[#282B2F] tracking-[0.128px]">
          Enter the key dates and financial details for this lease.
        </p>
      </div>
      <div className="flex flex-col gap-[16px] w-[335px]">
        <Input
          label="Lease start date"
          name="startDate"
          type="date"
          value={state.startDate}
          onChange={field('startDate')}
          required
          error={state.errors.startDate}
        />
        <Input
          label="Lease end date"
          name="endDate"
          type="date"
          value={state.endDate}
          onChange={field('endDate')}
          required
          error={state.errors.endDate}
        />
        <Input
          label="Monthly rent ($)"
          name="rentAmount"
          value={state.rentAmount}
          onChange={field('rentAmount')}
          required
          error={state.errors.rentAmount}
        />
        <Input
          label="Rent due day of month (e.g. 1)"
          name="rentDueDay"
          value={state.rentDueDay}
          onChange={field('rentDueDay')}
          error={state.errors.rentDueDay}
        />

        <Input
          label="Security deposit ($)"
          name="securityDeposit"
          value={state.securityDeposit}
          onChange={field('securityDeposit')}
          error={state.errors.securityDeposit}
        />
        <Input
          label="Electronic payment method (e.g. Venmo, Zelle)"
          name="paymentMethod"
          value={state.paymentMethod}
          onChange={field('paymentMethod')}
          error={state.errors.paymentMethod}
        />
      </div>
    </>
  );
}
