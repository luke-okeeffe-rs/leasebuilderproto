import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PortalLayout } from '../components/PortalLayout';
import { usePlan } from '../context/PlanContext';
import { PaywallModal } from '../features/lease-wizard/components/PaywallModal';

const imgAgreementsIcon = 'https://www.figma.com/api/mcp/asset/818832c4-513d-4394-aebe-13d9cbf963fe';
const imgBankIcon = 'https://www.figma.com/api/mcp/asset/2937b4a9-4467-43b5-9838-065ebd0e4fd7';
const imgWifiIcon = 'https://www.figma.com/api/mcp/asset/3715b729-b876-4aa7-9fbf-5e2768071fdf';
const imgRocketLawyer = 'https://www.figma.com/api/mcp/asset/0a8e3066-d0e7-4cce-9964-3fd038e5fb81';
const imgEsignBankIcon = 'https://www.figma.com/api/mcp/asset/0248e463-e1f7-4a57-a754-f49d641778eb';
const imgEsignWifiIcon = 'https://www.figma.com/api/mcp/asset/a6056fc3-a496-45a4-bda8-c8a352452433';
const imgStarIcon      = 'https://www.figma.com/api/mcp/asset/d355bf67-dd17-450f-b4e7-e6a833e3c8c0';
const imgDocusign      = 'https://www.figma.com/api/mcp/asset/0b362a8b-af9d-4746-8181-b533f0c69b63';

export function AgreementsPage() {
  const navigate = useNavigate();
  const plan = usePlan();
  const isFree = plan === 'free';
  const [showPaywall, setShowPaywall] = useState(false);

  function handleCreateLease() {
    if (isFree) {
      setShowPaywall(true);
    } else {
      navigate('/documents/new-lease/select-property');
    }
  }

  return (
    <PortalLayout>
      {showPaywall && (
        <PaywallModal
          onClose={() => setShowPaywall(false)}
          onContinue={() => { setShowPaywall(false); navigate('/documents/new-lease/select-property'); }}
        />
      )}
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
          <div className="flex gap-[16px] items-center">
            {/* Preview button */}
            <a
              href="/leasebuilderproto/lease-preview.html"
              target="_blank"
              rel="noopener noreferrer"
              className="h-[48px] px-[16px] rounded-[6px] text-[16px] font-bold leading-[24px] text-[#2E6DA4] bg-white border border-[#2E6DA4] cursor-pointer hover:bg-[#F0F7FF] transition-colors no-underline flex items-center"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              Preview
            </a>
            {/* Create a lease CTA */}
            <button
              onClick={handleCreateLease}
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
          {/* Title */}
          <div className="flex flex-col gap-[8px] items-center">
            <div className="flex items-center gap-[16px]">
              <p
                className="text-[24px] font-semibold leading-[32px] text-[#282B2F]"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                Upload and eSign a lease or document
              </p>
              {isFree && (
                <div className="flex items-center gap-[4px] bg-[#F5F1FF] px-[6px] py-[2px] rounded-[6px] flex-shrink-0">
                  <img src={imgStarIcon} alt="" className="w-[16px] h-[16px] object-contain" />
                  <span
                    className="text-[14px] font-bold leading-[20px] text-[#8F48FF] tracking-[0.07px]"
                    style={{ fontFamily: "'Open Sans', sans-serif" }}
                  >
                    Pro
                  </span>
                </div>
              )}
            </div>
            <p
              className="text-[14px] font-normal leading-[20px] text-[#545D66] tracking-[0.14px]"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              Upload your own lease to send for signing online.
            </p>
          </div>

          {/* Feature tiles — free only */}
          {isFree && (
            <div className="flex gap-[16px] items-stretch w-full">
              <div className="bg-[#F9F9F9] rounded-[6px] flex gap-[8px] items-start p-[16px] flex-1">
                <div className="w-[32px] h-[32px] rounded-full bg-[#F0F7FF] flex items-center justify-center flex-shrink-0">
                  <img src={imgEsignBankIcon} alt="" className="w-[16px] h-[16px] object-contain" />
                </div>
                <div className="flex flex-col gap-[4px] flex-1">
                  <p className="text-[14px] font-bold leading-[20px] text-[#282B2F] tracking-[0.07px]" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                    Legally binding
                  </p>
                  <p className="text-[14px] font-normal leading-[20px] text-[#545D66] tracking-[0.14px]" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                    Court-admissible e-signatures accepted in all 50 states
                  </p>
                </div>
              </div>
              <div className="bg-[#F9F9F9] rounded-[6px] flex gap-[8px] items-start p-[16px] flex-1">
                <div className="w-[32px] h-[32px] rounded-full bg-[#F0F7FF] flex items-center justify-center flex-shrink-0">
                  <img src={imgEsignWifiIcon} alt="" className="w-[16px] h-[16px] object-contain" />
                </div>
                <div className="flex flex-col gap-[4px] flex-1">
                  <p className="text-[14px] font-bold leading-[20px] text-[#282B2F] tracking-[0.07px]" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                    Sign anywhere
                  </p>
                  <p className="text-[14px] font-normal leading-[20px] text-[#545D66] tracking-[0.14px]" style={{ fontFamily: "'Open Sans', sans-serif" }}>
                    Tenants can sign on any device, with automated reminders
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CTA button */}
          {isFree ? (
            <button
              className="h-[48px] px-[16px] rounded-[6px] text-[16px] font-bold leading-[24px] text-white bg-[#2E6DA4] hover:bg-[#255a8a] border-none cursor-pointer transition-colors"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              Upgrade to pro
            </button>
          ) : (
            <button
              className="h-[48px] px-[16px] rounded-[6px] text-[16px] font-bold leading-[24px] text-[#2E6DA4] bg-white border border-[#2E6DA4] cursor-pointer hover:bg-[#F0F7FF] transition-colors"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              Upload & eSign
            </button>
          )}

          {/* Powered by Docusign — free only */}
          {isFree && (
            <div className="flex gap-[8px] items-center">
              <span
                className="text-[12px] font-normal leading-[16px] text-[#545D66] tracking-[0.24px]"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                Powered by
              </span>
              <img src={imgDocusign} alt="Docusign" className="h-[24px] w-[91px] object-cover rounded-[6px]" />
            </div>
          )}
        </div>

      </div>
    </PortalLayout>
  );
}
