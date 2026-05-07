import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PortalLayout } from '../components/PortalLayout';
import { US_STATES } from '../features/lease-wizard/steps/usStates';

const imgAgreementsIcon = 'https://www.figma.com/api/mcp/asset/818832c4-513d-4394-aebe-13d9cbf963fe';
const imgBankIcon = 'https://www.figma.com/api/mcp/asset/2937b4a9-4467-43b5-9838-065ebd0e4fd7';
const imgWifiIcon = 'https://www.figma.com/api/mcp/asset/3715b729-b876-4aa7-9fbf-5e2768071fdf';
const imgRocketLawyer = 'https://www.figma.com/api/mcp/asset/0a8e3066-d0e7-4cce-9964-3fd038e5fb81';

export function AgreementsPage() {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState('CA');

  return (
    <PortalLayout>
      {/* Page header */}
      <div className="flex items-center gap-[16px] px-[24px] pt-[24px] pb-[0px]">
        <div className="w-[41px] h-[40px] bg-[#EFEFEF] rounded-[6px] flex items-center justify-center flex-shrink-0">
          <img src={imgAgreementsIcon} alt="" className="w-[24px] h-[24px]" />
        </div>
        <h1
          className="text-[24px] font-semibold leading-[32px] text-[#414141] m-0"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          Agreements
        </h1>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-[24px] items-center px-[24px] py-[32px] max-w-[750px] mx-auto w-full">

        {/* Card 1: Create a lawyer-vetted lease */}
        <div
          className="bg-white w-full rounded-[6px] flex flex-col gap-[32px] items-center px-[32px] py-[24px]"
          style={{ boxShadow: '0px 2px 8px rgba(23,24,24,0.05), 0px 1px 4px rgba(23,24,24,0.04)' }}
        >
          {/* Title + badge */}
          <div className="flex flex-col gap-[8px] items-center w-full">
            <div className="flex gap-[12px] items-center justify-center">
              <span
                className="text-[24px] font-semibold leading-[32px] text-[#282B2F]"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                Create a lawyer-vetted lease
              </span>
              <span
                className="text-[14px] font-bold leading-[20px] text-[#009B64] bg-[#EFFDF5] px-[6px] py-[2px] rounded-[6px]"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                New
              </span>
            </div>
            <p
              className="text-[14px] font-normal leading-[20px] text-[#545D66] tracking-[0.14px] text-center"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              Create lawyer-vetted, state-specific leases, customize your terms, and sign online or offline.
            </p>
          </div>

          {/* Feature tiles */}
          <div className="flex gap-[16px] items-stretch w-full">
            <div className="bg-[#F9F9F9] rounded-[6px] flex gap-[8px] items-start p-[16px] flex-1">
              <div className="w-[32px] h-[32px] rounded-full bg-[#F0F7FF] flex items-center justify-center flex-shrink-0">
                <img src={imgBankIcon} alt="" className="w-[16px] h-[16px]" />
              </div>
              <div className="flex flex-col gap-[4px] flex-1">
                <p
                  className="text-[14px] font-bold leading-[20px] text-[#282B2F] tracking-[0.07px]"
                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                  State-specific
                </p>
                <p
                  className="text-[14px] font-normal leading-[20px] text-[#545D66] tracking-[0.14px]"
                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                  Stay compliant with lawyer-vetted templates for every state
                </p>
              </div>
            </div>
            <div className="bg-[#F9F9F9] rounded-[6px] flex gap-[8px] items-start p-[16px] flex-1">
              <div className="w-[32px] h-[32px] rounded-full bg-[#F0F7FF] flex items-center justify-center flex-shrink-0">
                <img src={imgWifiIcon} alt="" className="w-[16px] h-[16px]" />
              </div>
              <div className="flex flex-col gap-[4px] flex-1">
                <p
                  className="text-[14px] font-bold leading-[20px] text-[#282B2F] tracking-[0.07px]"
                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                  100% online
                </p>
                <p
                  className="text-[14px] font-normal leading-[20px] text-[#545D66] tracking-[0.14px]"
                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                  Easily collect e-signatures and store your fully executed lease on Stessa
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-[24px] items-center">
            <div className="flex gap-[8px] items-center">
              {/* State dropdown */}
              <div className="relative w-[165px] h-[48px]">
                <select
                  value={selectedState}
                  onChange={e => setSelectedState(e.target.value)}
                  className="w-full h-full border border-[#A9B2B7] rounded-[6px] px-[12px] pr-[36px] text-[16px] text-[#282B2F] bg-white cursor-pointer appearance-none"
                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                  {US_STATES.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
                <svg className="absolute right-[12px] top-1/2 -translate-y-1/2 pointer-events-none" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="#545D66" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              {/* Preview button */}
              <button
                className="h-[48px] px-[16px] rounded-[6px] text-[16px] font-bold leading-[24px] text-[#2E6DA4] bg-white border border-[#2E6DA4] cursor-pointer hover:bg-[#F0F7FF] transition-colors"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                Preview
              </button>
            </div>
            {/* Create a lease CTA */}
            <button
              onClick={() => navigate('/documents/new-lease')}
              className="h-[48px] px-[16px] rounded-[6px] text-[16px] font-bold leading-[24px] text-white bg-[#2E6DA4] hover:bg-[#255a8a] transition-colors cursor-pointer border-none"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              Create a lease
            </button>
          </div>

          {/* Powered by */}
          <div className="flex gap-[8px] items-center">
            <span
              className="text-[12px] font-normal leading-[16px] text-[#545D66] tracking-[0.24px]"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              Powered by
            </span>
            <img src={imgRocketLawyer} alt="Rocket Lawyer" className="h-[17px] w-[91px] object-cover rounded-[6px]" />
          </div>
        </div>

        {/* Card 2: eSign a lease or document */}
        <div
          className="bg-white w-full rounded-[6px] flex flex-col gap-[24px] items-center p-[24px]"
          style={{ boxShadow: '0px 2px 8px rgba(23,24,24,0.05), 0px 1px 4px rgba(23,24,24,0.04)' }}
        >
          <div className="flex flex-col gap-[8px] items-center">
            <p
              className="text-[24px] font-semibold leading-[32px] text-[#282B2F]"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              eSign a lease or document
            </p>
            <p
              className="text-[14px] font-normal leading-[20px] text-[#545D66] tracking-[0.14px]"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              Upload your own lease to send for signing online.
            </p>
          </div>
          <button
            className="h-[48px] px-[16px] rounded-[6px] text-[16px] font-bold leading-[24px] text-[#2E6DA4] bg-white border border-[#2E6DA4] cursor-pointer hover:bg-[#F0F7FF] transition-colors"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            Upload & eSign
          </button>
        </div>

      </div>
    </PortalLayout>
  );
}
