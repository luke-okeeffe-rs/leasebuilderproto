import { RadioGroup } from '../components/RadioGroup';
import { Input } from '../components/Input';
import type { LeaseFormState, LeaseFormAction } from '../state/types';

interface Props {
  state: LeaseFormState;
  dispatch: React.Dispatch<LeaseFormAction>;
}

export function Step4MinorOccupants({ state, dispatch }: Props) {
  return (
    <>
      <div className="flex flex-col gap-[8px]">
        <h2 className="text-[20px] font-semibold leading-[28px] text-[#282B2F] m-0">
          Will any occupants under the age of 18 reside in the property and not be signing the lease?
        </h2>
      </div>
      <div className="flex flex-col gap-[32px]">
        <RadioGroup
          name="minors"
          value={state.minors}
          onChange={e => dispatch({ type: 'SET_FIELD', field: 'minors', value: e.target.value })}
          options={[
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ]}
          error={state.errors.minors}
        />

        {state.minors === 'yes' && (
          <div className="flex flex-col gap-[16px] w-[335px]">
            <p className="text-[14px] font-semibold leading-[20px] text-[#545D66]">
              Minor occupant names
            </p>
            {state.minorNames.map((name, i) => (
              <Input
                key={i}
                label={`Minor ${i + 1} full name`}
                name={`minorName_${i}`}
                value={name}
                onChange={e => dispatch({ type: 'SET_MINOR_NAME', index: i, value: e.target.value })}
              />
            ))}
            <button
              onClick={() => dispatch({ type: 'ADD_MINOR' })}
              className="text-[14px] font-semibold leading-[20px] text-[#2E6DA4] bg-transparent border border-dashed border-[#2E6DA4] rounded-[6px] px-[16px] py-[10px] cursor-pointer hover:bg-[#f0f6fc] transition-colors self-start"
            >
              + Add another minor
            </button>
          </div>
        )}
      </div>
    </>
  );
}
