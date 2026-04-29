import { getProgress } from './state/leaseFormReducer';

interface ProgressBlockProps {
  step: number;
}

export function ProgressBlock({ step }: ProgressBlockProps) {
  const pct = getProgress(step);

  return (
    <div className="flex flex-col gap-[8px]">
      <div className="flex items-center justify-between">
        <span className="text-[14px] font-normal leading-[20px] text-[#545D66] tracking-[0.14px]">
          California lease agreement
        </span>
        <span className="text-[14px] font-bold leading-[20px] text-[#545D66] tracking-[0.07px]"
          style={{ fontFeatureSettings: "'lnum' 1, 'tnum' 1" }}
        >
          {pct}% complete
        </span>
      </div>
      <div className="w-full h-[8px] bg-[#E4E7E9] rounded-[4px] overflow-hidden">
        <div
          className="h-full bg-[#006ECE] rounded-[4px] transition-all duration-500 ease-in-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
