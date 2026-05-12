import { useState } from 'react';

const imgClose = 'https://www.figma.com/api/mcp/asset/d37a9f5b-2389-4e5b-8aa4-ebd8fad3b0b2';
const imgBank = 'https://www.figma.com/api/mcp/asset/48b8dece-79e9-4ef1-b17e-1420422fe5b9';
const imgAdd = 'https://www.figma.com/api/mcp/asset/7e5ec2ad-1fdc-4383-bb99-91aebe7cff3c';
const imgShare = 'https://www.figma.com/api/mcp/asset/96a3c35f-6edf-473d-865f-715c8e850eea';
const imgHistory = 'https://www.figma.com/api/mcp/asset/f86d150b-579f-4acb-8b19-afee00b75660';
const imgSync = 'https://www.figma.com/api/mcp/asset/d5a143ac-6ffa-4ff7-8fca-8a888fcedc60';
const imgPrint = 'https://www.figma.com/api/mcp/asset/216552fd-24ca-4eaf-a8c6-453224d83d44';
const imgExport = 'https://www.figma.com/api/mcp/asset/d284e2b6-85cc-4972-b9d1-a9c7679b95de';

function ChevronRight() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M9 6L15 12L9 18" stroke="#A9B2B7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
      <path d="M5 7.5L10 12.5L15 7.5" stroke="#006ECE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronUp() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
      <path d="M5 12.5L10 7.5L15 12.5" stroke="#006ECE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface Props {
  onClose: () => void;
  onStartSigning?: () => void;
  onEditDocument?: () => void;
}

function ActionRow({ icon, label, topBorder, onClick }: { icon: string; label: string; topBorder?: boolean; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className={[
        'flex h-[64px] items-center justify-between px-[8px] w-full border-b border-[#CCD1D5] cursor-pointer hover:bg-[#F9FAFB] transition-colors',
        topBorder ? 'border-t' : '',
      ].join(' ')}
    >
      <div className="flex gap-[16px] items-center">
        <div className="w-[48px] h-[48px] rounded-full bg-[#F9F9F9] flex items-center justify-center flex-shrink-0">
          <img src={icon} alt="" className="w-[24px] h-[24px] object-contain" />
        </div>
        <span
          className="text-[16px] font-normal leading-[24px] text-black tracking-[0.128px]"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          {label}
        </span>
      </div>
      <ChevronRight />
    </div>
  );
}

function ExportView({ onBack, onClose }: { onBack: () => void; onClose: () => void }) {
  return (
    <div className="flex flex-col gap-[32px] px-[32px] pb-[24px]">
      <div className="flex flex-col gap-[8px]">
        <h2
          className="text-[24px] font-semibold leading-[32px] text-[#282B2F] m-0"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          Export
        </h2>
        <p
          className="text-[16px] font-normal leading-[24px] text-[#282B2F] tracking-[0.128px] m-0"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          Choose an option
        </p>
      </div>

      <div className="flex flex-col gap-[16px]">
        <button
          onClick={onClose}
          className="w-full h-[48px] bg-[#2E6DA4] hover:bg-[#255a8a] rounded-[6px] text-white text-[16px] font-bold leading-[24px] tracking-[0.2px] border-none cursor-pointer transition-colors"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          Word
        </button>
        <button
          onClick={onClose}
          className="w-full h-[48px] bg-[#2E6DA4] hover:bg-[#255a8a] rounded-[6px] text-white text-[16px] font-bold leading-[24px] tracking-[0.2px] border-none cursor-pointer transition-colors"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          PDF
        </button>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onBack}
          className="h-[48px] px-[16px] border border-[#A9B2B7] rounded-[6px] text-[16px] font-bold leading-[24px] text-[#282B2F] bg-white cursor-pointer hover:bg-[#F9FAFB] transition-colors"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export function PostLeaseModal({ onClose, onStartSigning, onEditDocument }: Props) {
  const [showAll, setShowAll] = useState(false);
  const [view, setView] = useState<'main' | 'export'>('main');

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(40,43,47,0.4)' }}
    >
      <div
        className="bg-white rounded-[8px] w-[457px] flex flex-col overflow-hidden"
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

        {view === 'export' ? (
          <ExportView onBack={() => setView('main')} onClose={onClose} />
        ) : (
          /* Main view */
          <div className="flex flex-col gap-[32px] px-[32px] pb-[24px]">
            <div className="flex flex-col gap-[8px]">
              <h2
                className="text-[24px] font-semibold leading-[32px] text-[#282B2F] m-0"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                Get it signed now
              </h2>
              <p
                className="text-[16px] font-normal leading-[24px] text-[#282B2F] tracking-[0.128px] m-0"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                Make it official with signatures. Not ready? Find more options below.
              </p>
            </div>

            <div className="flex flex-col gap-[32px] items-center">
              <button
                onClick={onStartSigning ?? onClose}
                className="w-full h-[48px] bg-[#2E6DA4] hover:bg-[#255a8a] rounded-[6px] text-white text-[16px] font-bold leading-[24px] tracking-[0.2px] border-none cursor-pointer transition-colors"
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                Start signing
              </button>

              <div className="flex flex-col items-center w-full gap-[16px]">
                <div className="w-full">
                  <ActionRow icon={imgBank} label="View document" topBorder onClick={onClose} />
                  {showAll && (
                    <>
                      <ActionRow icon={imgAdd} label="Add another signer" />
                      <ActionRow icon={imgBank} label="Edit document" onClick={onEditDocument} />
                      <ActionRow icon={imgShare} label="Share document" />
                      <ActionRow icon={imgHistory} label="View history" />
                      <ActionRow icon={imgSync} label="Rename document" />
                      <ActionRow icon={imgPrint} label="Print document" />
                      <ActionRow icon={imgExport} label="Export document" onClick={() => setView('export')} />
                    </>
                  )}
                </div>
                <button
                  onClick={() => setShowAll(s => !s)}
                  className="flex items-center gap-[4px] bg-transparent border-none cursor-pointer p-0"
                >
                  <span
                    className="text-[16px] font-normal leading-[24px] text-[#006ECE] tracking-[0.128px]"
                    style={{ fontFamily: "'Open Sans', sans-serif" }}
                  >
                    {showAll ? 'Fewer options' : 'Other options'}
                  </span>
                  {showAll ? <ChevronUp /> : <ChevronDown />}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
