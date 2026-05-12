import { useState } from 'react';

interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  error?: string;
}

export function Input({ label, name, value, onChange, type = 'text', required, error }: InputProps) {
  const [focused, setFocused] = useState(false);
  const isFloated = focused || value.length > 0 || type === 'date';

  return (
    <div className="flex flex-col">
      <div className="relative h-[48px]">
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={[
            'w-full h-full px-[11px] bg-white rounded-[6px] border outline-none',
            'text-[16px] leading-[24px] text-[#282B2F] tracking-[0.128px] font-normal',
            'transition-colors duration-150',
            error ? 'border-red-500' : focused ? 'border-[#2E6DA4]' : 'border-[#A9B2B7]',
          ].join(' ')}
        />
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
      </div>
      {error && (
        <p className="text-[12px] text-red-500 mt-[4px]">{error}</p>
      )}
    </div>
  );
}
