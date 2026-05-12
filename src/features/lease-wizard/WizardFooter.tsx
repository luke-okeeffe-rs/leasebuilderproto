interface WizardFooterProps {
  step: number;
  onBack: () => void;
  onContinue: () => void;
}

export function WizardFooter({ step, onBack, onContinue }: WizardFooterProps) {
  const isLastStep = step === 6;

  return (
    <div className="w-full h-[88px] bg-white shadow-elev-1-rev flex items-center justify-between px-[24px] flex-shrink-0">
      {step > 1 ? (
        <button
          onClick={onBack}
          className="h-[48px] px-[16px] py-[12px] border border-[#A9B2B7] rounded-[6px] text-[16px] font-bold leading-[24px] text-[#282B2F] bg-white cursor-pointer hover:bg-[#F9FAFB] transition-colors"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          Back
        </button>
      ) : (
        <div />
      )}

      <button
        onClick={onContinue}
        className="h-[48px] px-[16px] py-[12px] rounded-[6px] text-[16px] font-bold leading-[24px] text-white bg-[#2E6DA4] cursor-pointer hover:bg-[#255a8a] transition-colors"
        style={{ fontFamily: "'Open Sans', sans-serif" }}
      >
        {isLastStep ? 'Generate lease' : 'Continue'}
      </button>
    </div>
  );
}
