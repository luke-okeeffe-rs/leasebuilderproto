import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WizardHeader } from '../features/lease-wizard/WizardHeader';

const PROPERTIES = [
  '123 Main St, San Francisco, CA 94102',
  '456 Oak Ave, Austin, TX 78701',
  '789 Elm St, Denver, CO 80202',
  '321 Pine Rd, Nashville, TN 37201',
  '654 Maple Ave, Phoenix, AZ 85001',
];

export function PropertySelectionPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('');
  const [open, setOpen] = useState(false);

  function handleContinue() {
    if (selected) navigate('/documents/new-lease', { state: { selectedProperty: selected } });
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col">
      <WizardHeader />

      {/* Content */}
      <div className="flex-1 flex items-start justify-center pt-[156px] pb-[88px]">
        <div
          className="bg-white rounded-[6px] w-[550px] flex flex-col gap-[32px] p-[24px]"
          style={{ boxShadow: '0px 2px 8px rgba(23,24,24,0.05), 0px 1px 2px rgba(23,24,24,0.04)' }}
        >
          {/* Title */}
          <div className="flex flex-col gap-[8px]">
            <p
              className="text-[20px] font-semibold leading-[28px] text-[#282B2F] m-0"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              Which property is this lease for?
            </p>
            <p
              className="text-[16px] font-normal leading-[24px] text-[#282B2F] tracking-[0.128px] m-0"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              Select the property this lease covers. We'll pull in the address and any details you've already saved.
            </p>
          </div>

          {/* Dropdown */}
          <div className="flex flex-col gap-[16px]">
            <div className="relative w-[335px]">
              <button
                onClick={() => setOpen(o => !o)}
                className="w-full h-[48px] px-[11px] bg-white rounded-[6px] border border-[#A9B2B7] flex items-center justify-between text-left outline-none cursor-pointer"
              >
                <span
                  className={`text-[16px] leading-[24px] tracking-[0.128px] truncate ${selected ? 'text-[#282B2F]' : 'text-[#7E8A92]'}`}
                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                  {selected || 'Select property'}
                </span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 ml-[8px]">
                  <path d="M6 9l6 6 6-6" stroke="#545D66" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {open && (
                <div
                  className="absolute top-[52px] left-0 w-full bg-white rounded-[6px] border border-[#A9B2B7] z-10 overflow-hidden"
                  style={{ boxShadow: '0px 4px 12px rgba(23,24,24,0.12)' }}
                >
                  {PROPERTIES.map(p => (
                    <button
                      key={p}
                      onClick={() => { setSelected(p); setOpen(false); }}
                      className="w-full px-[12px] py-[12px] text-left text-[16px] leading-[24px] text-[#282B2F] tracking-[0.128px] hover:bg-[#F0F7FF] border-none bg-white cursor-pointer"
                      style={{ fontFamily: "'Open Sans', sans-serif" }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Add a property */}
            <button
              className="flex items-center gap-[4px] bg-transparent border-none cursor-pointer p-0 h-[48px]"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 4v12M4 10h12" stroke="#006ECE" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span
                className="text-[16px] leading-[24px] text-[#006ECE] tracking-[0.128px]"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                Add a property
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        className="fixed bottom-0 left-0 right-0 h-[88px] bg-white flex items-center justify-between px-[24px]"
        style={{ boxShadow: '0px -1px 4px rgba(22,29,37,0.05)' }}
      >
        <button
          onClick={() => navigate('/documents/agreements')}
          className="h-[48px] px-[16px] border border-[#A9B2B7] rounded-[6px] text-[16px] font-bold leading-[24px] text-[#282B2F] bg-white cursor-pointer hover:bg-[#F9FAFB] transition-colors"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          Cancel
        </button>
        <button
          onClick={handleContinue}
          disabled={!selected}
          className={`h-[48px] px-[16px] rounded-[6px] text-[16px] font-bold leading-[24px] text-white transition-colors ${selected ? 'bg-[#2E6DA4] hover:bg-[#255a8a] cursor-pointer' : 'bg-[#A9B2B7] cursor-not-allowed'}`}
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
