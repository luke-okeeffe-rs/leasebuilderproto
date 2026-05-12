interface Props {
  onClose: () => void;
  onContinue: () => void;
}

function HouseGearIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      {/* House */}
      <path d="M28 8L50 26H44V50H12V26H6L28 8Z" fill="#DBEAFE" stroke="#4B7FCC" strokeWidth="2" strokeLinejoin="round" />
      {/* Door */}
      <rect x="21" y="34" width="14" height="16" rx="1" fill="white" stroke="#4B7FCC" strokeWidth="1.5" />
      {/* Gear — white backing so it sits on top of house corner */}
      <circle cx="41" cy="43" r="13" fill="white" />
      {/* Gear ring */}
      <circle cx="41" cy="43" r="10" fill="#EFF6FF" stroke="#4B7FCC" strokeWidth="2" />
      {/* Gear teeth — 4 cardinal tick marks */}
      <line x1="41" y1="29" x2="41" y2="33" stroke="#4B7FCC" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="41" y1="53" x2="41" y2="57" stroke="#4B7FCC" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="27" y1="43" x2="31" y2="43" stroke="#4B7FCC" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="51" y1="43" x2="55" y2="43" stroke="#4B7FCC" strokeWidth="3.5" strokeLinecap="round" />
      {/* Gear centre hole */}
      <circle cx="41" cy="43" r="4" fill="white" stroke="#4B7FCC" strokeWidth="1.5" />
    </svg>
  );
}

function HandshakeIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      {/* Document */}
      <rect x="16" y="4" width="24" height="28" rx="2" fill="#DBEAFE" stroke="#4B7FCC" strokeWidth="1.5" />
      <line x1="22" y1="13" x2="34" y2="13" stroke="#4B7FCC" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22" y1="19" x2="34" y2="19" stroke="#4B7FCC" strokeWidth="1.5" strokeLinecap="round" />
      {/* Checkmark on document */}
      <path d="M22 26l4 4 9-10" stroke="#4B7FCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Left arm → clasped centre */}
      <path d="M4 52L16 40H24L28 44" stroke="#4B7FCC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Right arm → clasped centre */}
      <path d="M52 52L40 40H32L28 44" stroke="#4B7FCC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Clasped hands */}
      <ellipse cx="28" cy="45" rx="6" ry="4" fill="#DBEAFE" stroke="#4B7FCC" strokeWidth="1.5" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="#8F48FF">
      <polygon points="8,1 9.8,6.2 15.5,6.2 11,9.5 12.8,15 8,11.8 3.2,15 5,9.5 0.5,6.2 6.2,6.2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="10" fill="#EFF6FF" />
      <path d="M7 12.5l3.5 3.5L17 9" stroke="#4B7FCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex gap-[8px] items-start">
      <CheckIcon />
      <p
        className="flex-1 text-[16px] leading-[24px] text-[#282B2F] tracking-[0.128px]"
        style={{ fontFamily: "'Open Sans', sans-serif" }}
      >
        {text}
      </p>
    </div>
  );
}

export function PaywallModal({ onClose, onContinue }: Props) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(40,43,47,0.5)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[8px] w-[900px] flex flex-col overflow-hidden"
        style={{ boxShadow: '0px 31px 41px rgba(32,42,53,0.1), 0px 2px 16px rgba(32,42,54,0.06)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-end p-[24px]">
          <button
            onClick={onClose}
            className="w-[24px] h-[24px] bg-transparent border-none cursor-pointer p-0 flex items-center justify-center text-[#545D66] hover:text-[#282B2F] transition-colors"
            aria-label="Close"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-[32px] items-center px-[68px] pb-[40px]">
          <h2
            className="text-[24px] font-semibold leading-[32px] text-[#282B2F] m-0 text-center"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            Unlock lease creation
          </h2>

          <div className="flex gap-[16px] w-full">

            {/* Card 1 — Subscribe */}
            <div
              className="flex-1 bg-white rounded-[6px] flex flex-col gap-[24px] p-[24px]"
              style={{ boxShadow: '0px 2px 8px rgba(23,24,24,0.05), 0px 1px 2px rgba(23,24,24,0.04)' }}
            >
              <div className="flex flex-col gap-[16px]">
                <div className="flex items-start justify-between">
                  <HouseGearIcon />
                  <div className="flex items-center gap-[4px] bg-[#F5F1FF] px-[6px] py-[2px] rounded-[6px]">
                    <StarIcon />
                    <span
                      className="text-[14px] font-bold leading-[20px] text-[#8F48FF] tracking-[0.07px]"
                      style={{ fontFamily: "'Open Sans', sans-serif" }}
                    >
                      Most popular
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-[8px]">
                  <p className="text-[20px] leading-[28px] m-0" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                    <span className="font-semibold text-[#282B2F]">Subscribe</span>
                    <span className="font-semibold text-[#545D66]"> | from $12/month</span>
                  </p>
                  <div className="flex flex-col gap-[8px]">
                    <CheckItem text="Unlimited lawyer-vetted, state-specific leases" />
                    <CheckItem text="Unlimited lawyer consultations (Pro only)" />
                    <CheckItem text="Everything to run your rentals" />
                  </div>
                </div>
              </div>

              <button
                className="h-[48px] px-[16px] bg-[#2E6DA4] rounded-[6px] text-white text-[16px] font-bold leading-[24px] border-none cursor-pointer self-start"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                View plans
              </button>
            </div>

            {/* Card 2 — One time fee */}
            <div
              className="flex-1 bg-white rounded-[6px] flex flex-col justify-between p-[24px]"
              style={{ boxShadow: '0px 2px 8px rgba(23,24,24,0.05), 0px 1px 2px rgba(23,24,24,0.04)' }}
            >
              <div className="flex flex-col gap-[16px]">
                <div className="flex items-start justify-between">
                  <HandshakeIcon />
                  <div className="bg-[#FFF7F5] px-[6px] py-[2px] rounded-[6px]">
                    <span
                      className="text-[14px] font-bold leading-[20px] text-[#EB4117] tracking-[0.07px]"
                      style={{ fontFamily: "'Open Sans', sans-serif" }}
                    >
                      Save $5 until 9/1/26
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-[8px]">
                  <p className="text-[20px] leading-[28px] m-0" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                    <span className="font-semibold text-[#282B2F]">One time fee</span>
                    <span className="font-semibold text-[#545D66]"> | $10</span>
                  </p>
                  <div className="flex flex-col gap-[8px]">
                    <CheckItem text="Create one lawyer-vetted, state-specific lease" />
                    <CheckItem text="Pay once, no subscription" />
                    <CheckItem text="Best for one-off use" />
                  </div>
                </div>
              </div>

              <button
                onClick={onContinue}
                className="h-[48px] px-[16px] bg-white hover:bg-[#F0F7FF] rounded-[6px] text-[#2E6DA4] text-[16px] font-bold leading-[24px] border border-[#2E6DA4] cursor-pointer transition-colors self-start mt-[24px]"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                Continue for $10
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
