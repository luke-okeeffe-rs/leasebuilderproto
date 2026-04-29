import { useState } from 'react';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: DropdownOption[];
  required?: boolean;
  error?: string;
}

export function Dropdown({ label, name, value, onChange, options, required, error }: DropdownProps) {
  const [focused, setFocused] = useState(false);
  const isFloated = focused || value.length > 0;

  return (
    <div className="relative h-[48px]">
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ color: value ? '#282B2F' : 'transparent' }}
        className={[
          'w-full h-full px-[11px] pr-[40px] bg-white rounded-[6px] border outline-none cursor-pointer',
          'text-[16px] leading-[24px] tracking-[0.128px] font-normal',
          'transition-colors duration-150',
          error ? 'border-red-500' : focused ? 'border-[#2E6DA4]' : 'border-[#A9B2B7]',
        ].join(' ')}
      >
        <option value="" style={{ color: '#282B2F' }} />
        {options.map(opt => (
          <option key={opt.value} value={opt.value} style={{ color: '#282B2F' }}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Chevron */}
      <div className="absolute right-[13px] top-1/2 -translate-y-1/2 size-[24px] pointer-events-none flex items-center justify-center">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#A9B2B7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {/* Floating label */}
      {isFloated ? (
        <div className="absolute left-[7px] top-0 -translate-y-1/2 px-[4px] bg-white pointer-events-none z-10">
          <span className={`text-[12px] leading-[16px] tracking-[0.24px] ${focused ? 'text-[#2E6DA4]' : 'text-[#545D66]'}`}>
            {label}{required ? '*' : ''}
          </span>
        </div>
      ) : (
        <div className="absolute left-[11px] top-1/2 -translate-y-1/2 pointer-events-none">
          <span className="text-[16px] leading-[24px] text-[#7E8A92] tracking-[0.128px]">
            {label}{required ? '*' : ''}
          </span>
        </div>
      )}

      {error && (
        <p className="absolute top-full mt-[4px] left-0 text-[12px] text-red-500">{error}</p>
      )}
    </div>
  );
}
