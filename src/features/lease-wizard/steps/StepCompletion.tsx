interface Props {
  onScrollToDocument: () => void;
}

export function StepCompletion({ onScrollToDocument }: Props) {
  return (
    <div className="flex flex-col items-center gap-[24px] py-[40px]">
      <div className="w-[64px] h-[64px] bg-[#006ECE] rounded-full flex items-center justify-center">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M6 16l7 7L26 9" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="flex flex-col gap-[8px] text-center">
        <h2 className="text-[20px] font-semibold leading-[28px] text-[#282B2F] m-0">
          Lease agreement generated!
        </h2>
        <p className="text-[16px] font-normal leading-[24px] text-[#545D66] tracking-[0.128px]">
          Your California lease agreement is ready. Review it below.
        </p>
      </div>
      <button
        onClick={onScrollToDocument}
        className="text-[16px] font-bold leading-[24px] text-[#006ECE] bg-transparent border-none cursor-pointer hover:underline p-0"
      >
        View lease document ↓
      </button>
    </div>
  );
}
