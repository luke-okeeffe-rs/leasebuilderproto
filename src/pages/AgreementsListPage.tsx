import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { PortalLayout } from '../components/PortalLayout';

const imgAgreementsIcon = 'https://www.figma.com/api/mcp/asset/818832c4-513d-4394-aebe-13d9cbf963fe';

interface LeaseRecord {
  leaseName?: string;
  propertyAddress?: string;
  dateAdded?: string;
  isDraft?: boolean;
  isReadyToSign?: boolean;
  showSigningModal?: boolean;
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
      <path d="M17.5 17.5L12.917 12.917M14.583 8.333a6.25 6.25 0 1 1-12.5 0 6.25 6.25 0 0 1 12.5 0Z" stroke="#7E8A92" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDown({ color = '#545D66' }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M4 6L8 10L12 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
      <path d="M7.5 5L12.5 10L7.5 15" stroke="#006ECE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ThreeDots() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="4" r="1.5" fill="#545D66" />
      <circle cx="10" cy="10" r="1.5" fill="#545D66" />
      <circle cx="10" cy="16" r="1.5" fill="#545D66" />
    </svg>
  );
}

function BankIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M4 10v7h3v-7H4zm6.5 0v7h3v-7h-3zM2 22h20v-3H2v3zm13-12v7h3v-7h-3zM12 1L2 6v2h20V6L12 1z" fill="#006ECE" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z" fill="#006ECE" />
    </svg>
  );
}

const STORAGE_KEY = 'lease-agreement-record';

function loadRecord(): LeaseRecord {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return {};
}

function saveRecord(record: LeaseRecord) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
}

function SigningSuccessModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const t = setTimeout(onClose, 5000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(40,43,47,0.5)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[16px] flex flex-col items-center gap-[28px] px-[56px] py-[48px] w-[480px]"
        style={{ boxShadow: '0px 32px 48px rgba(32,42,53,0.18), 0px 4px 16px rgba(32,42,54,0.08)' }}
        onClick={e => e.stopPropagation()}
      >
        <style>{`
          @keyframes rl-circle-draw { to { stroke-dashoffset: 0; } }
          @keyframes rl-check-draw  { to { stroke-dashoffset: 0; } }
          @keyframes rl-pop { 0%{transform:scale(0.6);opacity:0} 70%{transform:scale(1.08)} 100%{transform:scale(1);opacity:1} }
          .rl-anim-wrap { animation: rl-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards; }
          .rl-circle { stroke-dasharray: 166; stroke-dashoffset: 166; animation: rl-circle-draw 0.7s cubic-bezier(0.65,0,0.45,1) 0.1s forwards; }
          .rl-check  { stroke-dasharray: 60;  stroke-dashoffset: 60;  animation: rl-check-draw  0.4s cubic-bezier(0.65,0,0.45,1) 0.75s forwards; }
        `}</style>

        <div className="rl-anim-wrap w-[88px] h-[88px]">
          <svg viewBox="0 0 52 52" width="88" height="88">
            <circle className="rl-circle" cx="26" cy="26" r="25" fill="none" stroke="#2E6DA4" strokeWidth="2.5" />
            <path  className="rl-check"  fill="none" stroke="#2E6DA4" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" d="M13 27l9 9 17-17" />
          </svg>
        </div>

        <div className="flex flex-col gap-[10px] items-center text-center">
          <h2
            className="text-[24px] font-semibold leading-[32px] text-[#282B2F] m-0"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            Lease sent for signature
          </h2>
          <p
            className="text-[16px] leading-[24px] text-[#545D66] tracking-[0.128px] m-0"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            Your lease has been sent to your tenant for a signature.
          </p>
        </div>

        <button
          onClick={onClose}
          className="h-[48px] px-[32px] bg-[#2E6DA4] hover:bg-[#255a8a] rounded-[6px] text-white text-[16px] font-bold leading-[24px] border-none cursor-pointer transition-colors"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          Done
        </button>
      </div>
    </div>
  );
}

export function AgreementsListPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const routerRecord = (location.state ?? {}) as LeaseRecord;

  // If router state carries a new record, persist it; otherwise restore from storage
  const record: LeaseRecord = routerRecord.leaseName
    ? (saveRecord(routerRecord), routerRecord)
    : loadRecord();

  const leaseName = record.leaseName || 'Lease Agreement';
  const propertyAddress = record.propertyAddress || '—';
  const dateAdded = record.dateAdded || new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' });
  const isDraft = !!record.isDraft;
  const isReadyToSign = !!record.isReadyToSign;

  const [showSigningModal, setShowSigningModal] = useState(!!routerRecord.showSigningModal);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [newAgreementOpen, setNewAgreementOpen] = useState(false);
  const newAgreementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  useEffect(() => {
    if (!newAgreementOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (newAgreementRef.current && !newAgreementRef.current.contains(e.target as Node)) {
        setNewAgreementOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [newAgreementOpen]);

  function handleViewDocument() {
    setDropdownOpen(false);
    navigate('/documents/new-lease', {
      state: { viewLease: true, openModal: isReadyToSign, leaseName, propertyAddress },
    });
  }

  function handleEditDraft() {
    setDropdownOpen(false);
    navigate('/documents/new-lease');
  }

  const dropdownItems = isDraft
    ? [
        { label: 'Rename', onClick: () => setDropdownOpen(false), color: '#282B2F' },
        { label: 'Edit draft', onClick: handleEditDraft, color: '#282B2F' },
        { label: 'Delete', onClick: () => setDropdownOpen(false), color: '#D82C0D' },
      ]
    : [
        { label: 'Rename', onClick: () => setDropdownOpen(false), color: '#282B2F' },
        { label: 'View document', onClick: handleViewDocument, color: '#282B2F' },
        { label: 'Delete', onClick: () => setDropdownOpen(false), color: '#D82C0D' },
      ];

  return (
    <PortalLayout>
      {showSigningModal && <SigningSuccessModal onClose={() => setShowSigningModal(false)} />}
      {/* Page header */}
      <div className="flex items-center justify-between px-[24px] pt-[24px]">
        <div className="flex items-center gap-[16px]">
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
        <div className="flex items-center gap-[8px] h-[48px] px-[12px] border border-[#A7ACB2] rounded-[6px] bg-white cursor-default">
          <span
            className="text-[16px] leading-[24px] text-[#70767D] tracking-[0.128px]"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            All Properties
          </span>
          <ChevronDown />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-[32px] px-[24px] py-[32px]">

        {/* Filter bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[16px]">
            {/* Search */}
            <div className="flex items-center gap-[8px] h-[48px] w-[300px] px-[11px] border border-[#A9B2B7] rounded-[6px] bg-white">
              <SearchIcon />
              <span
                className="text-[16px] leading-[24px] text-[#7E8A92] tracking-[0.128px]"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                Search for...
              </span>
            </div>
            {/* Status dropdown */}
            <div className="relative h-[48px] w-[300px] border border-[#A9B2B7] rounded-[6px] bg-white flex items-center px-[11px] pr-[40px]">
              <div className="absolute left-[7px] top-0 -translate-y-1/2 px-[4px] bg-white">
                <span
                  className="text-[12px] leading-[16px] text-[#545D66] tracking-[0.24px]"
                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                  Status
                </span>
              </div>
              <span
                className="text-[16px] leading-[24px] text-[#282B2F] tracking-[0.128px]"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                All statuses
              </span>
              <div className="absolute right-[13px] top-1/2 -translate-y-1/2">
                <ChevronDown />
              </div>
            </div>
          </div>

          {/* New agreement button + dropdown */}
          <div className="relative" ref={newAgreementRef}>
            <button
              onClick={() => setNewAgreementOpen(o => !o)}
              className="flex items-center gap-[8px] h-[48px] px-[16px] bg-[#2E6DA4] hover:bg-[#255a8a] rounded-[6px] border-none cursor-pointer transition-colors"
            >
              <span
                className="text-[16px] font-bold leading-[24px] text-white tracking-[0.2px]"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                New agreement
              </span>
              <div style={{ transform: newAgreementOpen ? 'rotate(180deg)' : undefined, transition: 'transform 0.15s' }}>
                <ChevronDown color="white" />
              </div>
            </button>
            {newAgreementOpen && (
              <div
                className="absolute right-0 top-[52px] z-50 bg-white rounded-[6px] w-[480px] overflow-hidden"
                style={{ boxShadow: '0px 8px 24px -4px rgba(23,24,24,0.12), 0px 3px 6px -3px rgba(23,24,24,0.08)' }}
              >
                {/* Create a new lawyer-vetted lease */}
                <button
                  onClick={() => setNewAgreementOpen(false)}
                  className="w-full flex gap-[16px] items-start px-[32px] py-[24px] border-b border-[#CCD1D5] hover:bg-[#F9FAFB] transition-colors bg-transparent cursor-pointer text-left"
                >
                  <div className="w-[40px] h-[40px] bg-[#F0F7FF] rounded-full flex items-center justify-center flex-shrink-0">
                    <BankIcon />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col gap-[8px]">
                    <div className="flex items-center gap-[8px] flex-wrap">
                      <span
                        className="text-[16px] font-bold leading-[24px] text-[#282B2F]"
                        style={{ fontFamily: "'Open Sans', sans-serif" }}
                      >
                        Create a new lawyer-vetted lease
                      </span>
                      <span
                        className="text-[12px] font-extrabold leading-[18px] text-[#009B64] bg-[#EFFDF5] px-[6px] py-[2px] rounded-[12px] tracking-[1.8px] uppercase flex-shrink-0"
                        style={{ fontFamily: "'Open Sans', sans-serif" }}
                      >
                        New
                      </span>
                    </div>
                    <p
                      className="text-[14px] leading-[20px] text-[#545D66] m-0 tracking-[0.14px]"
                      style={{ fontFamily: "'Open Sans', sans-serif" }}
                    >
                      Create lawyer-vetted, state-specific leases, customize your terms and sign online or offline.
                    </p>
                  </div>
                  <ChevronRight />
                </button>

                {/* Upload and eSign */}
                <button
                  onClick={() => setNewAgreementOpen(false)}
                  className="w-full flex gap-[16px] items-start px-[32px] py-[24px] hover:bg-[#F9FAFB] transition-colors bg-transparent cursor-pointer text-left"
                >
                  <div className="w-[40px] h-[40px] bg-[#F0F7FF] rounded-full flex items-center justify-center flex-shrink-0">
                    <UploadIcon />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col gap-[8px]">
                    <span
                      className="text-[16px] font-bold leading-[24px] text-[#282B2F]"
                      style={{ fontFamily: "'Open Sans', sans-serif" }}
                    >
                      Upload and eSign a lease or document
                    </span>
                    <p
                      className="text-[14px] leading-[20px] text-[#545D66] m-0 tracking-[0.14px]"
                      style={{ fontFamily: "'Open Sans', sans-serif" }}
                    >
                      Upload, configure, and send documents in minutes with e-signing on any device, while Stessa automates signature reminders.
                    </p>
                  </div>
                  <ChevronRight />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div
          className="bg-white rounded-[6px]"
          style={{ boxShadow: '0px 2px 8px rgba(23,24,24,0.05), 0px 1px 2px rgba(23,24,24,0.04)' }}
        >
          {/* Header row */}
          <div className="flex items-center border-b border-[#CCD1D5] h-[56px]">
            {[
              'Document name', 'Added', 'Property', 'Type', 'Status',
            ].map(label => (
              <div key={label} className="flex-1 px-[16px] flex items-center">
                <span
                  className="text-[14px] font-bold leading-[20px] text-[#4C5158] tracking-[0.07px]"
                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                  {label}
                </span>
              </div>
            ))}
            <div className="flex-1" />
            <div className="w-[56px]" />
          </div>

          {/* Data row */}
          <div className="flex items-center hover:bg-[#F9FAFB] transition-colors">
            <div className="flex-1 px-[16px] py-[20px]">
              <span
                className="text-[16px] font-normal leading-[24px] text-[#282B2F] tracking-[0.128px]"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                {leaseName}
              </span>
            </div>
            <div className="flex-1 px-[16px] py-[20px]">
              <span
                className="text-[16px] font-normal leading-[24px] text-[#282B2F] tracking-[0.128px]"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                {dateAdded}
              </span>
            </div>
            <div className="flex-1 px-[16px] py-[20px]">
              <span
                className="text-[16px] font-normal leading-[24px] text-[#282B2F] tracking-[0.128px]"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                {propertyAddress}
              </span>
            </div>
            <div className="flex-1 px-[16px] py-[20px]">
              <span
                className="text-[16px] font-normal leading-[24px] text-[#282B2F] tracking-[0.128px]"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                Lease
              </span>
            </div>

            {/* Status badge */}
            <div className="flex-1 px-[16px] py-[20px]">
              {isDraft ? (
                <span
                  className="text-[14px] font-bold leading-[20px] text-[#545D66] bg-[#F9F9F9] px-[6px] py-[2px] rounded-[6px]"
                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                  Draft
                </span>
              ) : isReadyToSign ? (
                <span
                  className="text-[14px] font-bold leading-[20px] text-[#9F6209] bg-[#FEFCE8] px-[6px] py-[2px] rounded-[6px]"
                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                  Ready to sign
                </span>
              ) : (
                <span
                  className="text-[14px] font-bold leading-[20px] text-[#9F6209] bg-[#FEFCE8] px-[6px] py-[2px] rounded-[6px]"
                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                  Awaiting signature
                </span>
              )}
            </div>

            {/* Edit draft CTA (draft only) */}
            <div className="flex-1 px-[16px] py-[20px]">
              {isDraft && (
                <button
                  onClick={handleEditDraft}
                  className="flex items-center gap-[4px] bg-transparent border-none cursor-pointer p-0"
                >
                  <span
                    className="text-[16px] font-normal leading-[24px] text-[#006ECE] tracking-[0.128px]"
                    style={{ fontFamily: "'Open Sans', sans-serif" }}
                  >
                    Edit draft
                  </span>
                  <ChevronRight />
                </button>
              )}
            </div>

            {/* 3-dot menu */}
            <div className="w-[56px] flex items-center justify-center py-[16px] relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(o => !o)}
                className="w-[32px] h-[32px] flex items-center justify-center bg-transparent border-none cursor-pointer rounded-[4px] hover:bg-[#F0F0F0] transition-colors"
              >
                <ThreeDots />
              </button>
              {dropdownOpen && (
                <div
                  className="absolute right-[4px] top-[44px] z-50 bg-white rounded-[8px] py-[8px] min-w-[200px]"
                  style={{ boxShadow: '0px 8px 24px rgba(23,24,24,0.12), 0px 2px 6px rgba(23,24,24,0.08)' }}
                >
                  {dropdownItems.map(item => (
                    <button
                      key={item.label}
                      onClick={item.onClick}
                      className="w-full text-left px-[16px] py-[10px] text-[16px] leading-[24px] bg-transparent border-none cursor-pointer hover:bg-[#F9FAFB] transition-colors"
                      style={{ fontFamily: "'Open Sans', sans-serif", color: item.color }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
