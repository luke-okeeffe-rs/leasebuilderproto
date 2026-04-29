interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options: RadioOption[];
  error?: string;
}

export function RadioGroup({ name, value, onChange, options, error }: RadioGroupProps) {
  return (
    <div className="flex flex-col gap-[16px]">
      {options.map(opt => (
        <label
          key={opt.value}
          className="flex items-center gap-[10px] h-[24px] cursor-pointer w-[240px]"
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={onChange}
            className="w-[20px] h-[20px] cursor-pointer flex-shrink-0"
            style={{ accentColor: '#2E6DA4' }}
          />
          <span className="text-[16px] leading-[24px] text-[#282B2F] tracking-[0.128px] font-normal">
            {opt.label}
          </span>
        </label>
      ))}
      {error && (
        <p className="text-[12px] text-red-500 mt-[4px]">{error}</p>
      )}
    </div>
  );
}
