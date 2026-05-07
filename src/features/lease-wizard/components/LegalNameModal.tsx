import { useState } from 'react';

const imgClose = 'https://www.figma.com/api/mcp/asset/3579b33b-9ace-4cba-bf2c-a9ddefe6dd18';

interface Props {
  onSave: (firstName: string, lastName: string) => void;
  onClose: () => void;
}

export function LegalNameModal({ onSave, onClose }: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  function handleSave() {
    if (firstName.trim() && lastName.trim()) {
      onSave(firstName.trim(), lastName.trim());
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(40,43,47,0.4)' }}
    >
      <div
        className="bg-white rounded-[8px] w-[500px] flex flex-col overflow-hidden"
        style={{ boxShadow: '0px 31px 41px rgba(32,42,53,0.1), 0px 2px 16px rgba(32,42,54,0.06)' }}
      >
        {/* Close button row */}
        <div className="flex items-start justify-end p-[24px]">
          <button
            onClick={onClose}
            className="w-[24px] h-[24px] bg-transparent border-none cursor-pointer p-0 flex items-center justify-center"
          >
            <img src={imgClose} alt="Close" className="w-full h-full object-contain" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-[32px] pb-[16px]">
          <div className="flex flex-col gap-[8px] px-[24px]">
            <h2
              className="text-[24px] font-semibold leading-[32px] text-[#282B2F] m-0"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              Add your legal name
            </h2>
            <p
              className="text-[16px] font-normal leading-[24px] text-[#282B2F] tracking-[0.128px] m-0"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              It will be used for your signature and when emailing other signers.
            </p>
          </div>

          {/* Inputs */}
          <div className="flex flex-col gap-[16px] px-[24px]">
            <FloatingInput
              label="First name*"
              value={firstName}
              onChange={setFirstName}
            />
            <FloatingInput
              label="Last name*"
              value={lastName}
              onChange={setLastName}
            />
          </div>
        </div>

        {/* Action bar */}
        <div className="flex items-center justify-end p-[24px]">
          <button
            onClick={handleSave}
            disabled={!firstName.trim() || !lastName.trim()}
            className={[
              'h-[48px] px-[16px] rounded-[6px] text-[16px] font-bold leading-[24px] text-white border-none transition-colors',
              firstName.trim() && lastName.trim()
                ? 'bg-[#2E6DA4] hover:bg-[#255a8a] cursor-pointer'
                : 'bg-[#2E6DA4] opacity-40 cursor-not-allowed',
            ].join(' ')}
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function FloatingInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const isFilled = value.length > 0;
  return (
    <div className="relative h-[48px]">
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full h-full border rounded-[6px] px-[11px] text-[16px] text-[#282B2F] bg-white outline-none tracking-[0.128px]"
        style={{
          fontFamily: "'Open Sans', sans-serif",
          borderColor: isFilled ? '#A9B2B7' : '#2E6DA4',
        }}
      />
      {/* Floating label */}
      <span
        className="absolute left-[7px] top-[-10px] px-[4px] bg-white text-[12px] leading-[16px] tracking-[0.24px]"
        style={{
          fontFamily: "'Open Sans', sans-serif",
          color: isFilled ? '#545D66' : '#2E6DA4',
        }}
      >
        {label}
      </span>
    </div>
  );
}
