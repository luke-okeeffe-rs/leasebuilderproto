import { Input } from '../components/Input';
import type { LeaseFormState, LeaseFormAction } from '../state/types';

interface Props {
  state: LeaseFormState;
  dispatch: React.Dispatch<LeaseFormAction>;
}

export function Step3TenantInfo({ state, dispatch }: Props) {
  const field =
    (f: keyof Omit<LeaseFormState, 'errors' | 'minorNames' | 'currentStep'>) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      dispatch({ type: 'SET_FIELD', field: f, value: e.target.value });

  return (
    <>
      <div className="flex flex-col gap-[8px]">
        <h2 className="text-[20px] font-semibold leading-[28px] text-[#282B2F] m-0">
          Who is the tenant?
        </h2>
        <p className="text-[16px] font-normal leading-[24px] text-[#282B2F] tracking-[0.128px]">
          Enter the full name and contact information of the tenant.
        </p>
      </div>
      <div className="flex flex-col gap-[16px] w-[335px]">
        <Input
          label="Name"
          name="tenantName"
          value={state.tenantName}
          onChange={field('tenantName')}
          required
          error={state.errors.tenantName}
        />
        <Input
          label="Phone number"
          name="tenantPhone"
          value={state.tenantPhone}
          onChange={field('tenantPhone')}
          type="tel"
          required
          error={state.errors.tenantPhone}
        />
        <Input
          label="Email address"
          name="tenantEmail"
          value={state.tenantEmail}
          onChange={field('tenantEmail')}
          type="email"
          required
          error={state.errors.tenantEmail}
        />
      </div>
    </>
  );
}
