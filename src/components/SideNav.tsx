import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const imgDashboard = 'https://www.figma.com/api/mcp/asset/09cd9a5a-fbce-45f4-88d2-d37e8a3bb8ba';
const imgProperties = 'https://www.figma.com/api/mcp/asset/07acd82e-a4f1-4998-91b8-4b9bfee8b303';
const imgTransactions = 'https://www.figma.com/api/mcp/asset/2c81d7a8-9915-4598-abbd-88743df463ba';
const imgRentCollection = 'https://www.figma.com/api/mcp/asset/d9dad826-9fa1-47bd-b9a9-88ec8c449e15';
const imgCashManagement = 'https://www.figma.com/api/mcp/asset/738bb06a-62f6-4df5-af5d-dc019a9a49a8';
const imgReports = 'https://www.figma.com/api/mcp/asset/8ed85268-7081-449e-a30c-ea6534c28670';
const imgListings = 'https://www.figma.com/api/mcp/asset/59d2f3be-e70c-4e6b-90cf-24b8861e4848';
const imgScreening = 'https://www.figma.com/api/mcp/asset/2f301a33-9ef1-43dd-82d5-5aecba80673f';
const imgMaintenance = 'https://www.figma.com/api/mcp/asset/0e903b37-9be5-4dfe-8ef2-ace830d13dfb';
const imgDocuments = 'https://www.figma.com/api/mcp/asset/e630a6e3-d01e-46c4-ab01-9cf9a4095a43';
const imgResources = 'https://www.figma.com/api/mcp/asset/3142084f-f740-4356-bec9-f55488696da8';
const imgChevronLeft = 'https://www.figma.com/api/mcp/asset/ae5500b7-806c-433b-be46-41be95a8c290';

function ChevronDown() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M4 6L8 10L12 6" stroke="#545D66" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronUp() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M4 10L8 6L12 10" stroke="#545D66" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const TOP_NAV_ITEMS = [
  { label: 'Dashboard', icon: imgDashboard, path: '/', active: true },
  { label: 'Properties', icon: imgProperties, path: null },
  { label: 'Transactions', icon: imgTransactions, path: null, badge: { text: '99+', color: 'error' } as const },
  { label: 'Rent Collection', icon: imgRentCollection, path: null },
  { label: 'Cash Management', icon: imgCashManagement, path: null },
  { label: 'Reports', icon: imgReports, path: null },
  { label: 'Listings', icon: imgListings, path: null },
  { label: 'Screening', icon: imgScreening, path: null },
  { label: 'Maintenance', icon: imgMaintenance, path: null },
];

const DOCUMENTS_SUB_ITEMS = [
  { label: 'Saved Documents', path: null },
  { label: 'Agreements', path: '/documents/agreements', badge: { text: 'New', color: 'success' } as const },
  { label: 'Landlord Forms', path: null },
];

export function SideNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isUnderDocuments = location.pathname.startsWith('/documents');
  const [docsOpen, setDocsOpen] = useState(isUnderDocuments);
  const [resourcesOpen] = useState(false);

  function NavItem({ label, icon, path, badge }: { label: string; icon: string; path: string | null; badge?: { text: string; color: 'error' | 'success' } }) {
    const isActive = path === '/' ? location.pathname === '/' : false;
    return (
      <button
        onClick={path ? () => navigate(path) : undefined}
        className={[
          'w-full h-[34px] flex items-center gap-[8px] px-[8px] rounded-[6px] border-none text-left flex-shrink-0',
          path ? 'cursor-pointer' : 'cursor-default',
          isActive ? 'bg-[#F0F7FF]' : 'bg-transparent hover:bg-[#F9FAFB]',
        ].join(' ')}
      >
        <img src={icon} alt="" className="w-[18px] h-[18px] flex-shrink-0" />
        <span
          className={['text-[14px] font-semibold leading-[16px] tracking-[0.21px] flex-1 whitespace-nowrap', isActive ? 'text-[#006ECE]' : 'text-[#282B2F]'].join(' ')}
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          {label}
        </span>
        {badge && (
          <span
            className={['text-[8px] font-extrabold tracking-[1.2px] uppercase px-[6px] py-[2px] rounded-[12px]', badge.color === 'error' ? 'text-[#EB4117] bg-[#FFF7F5]' : 'text-[#009B64] bg-[#EFFDF5]'].join(' ')}
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            {badge.text}
          </span>
        )}
      </button>
    );
  }

  return (
    <div
      className="fixed top-[48px] left-0 bottom-0 w-[216px] bg-white flex flex-col justify-between overflow-y-auto"
      style={{ borderRight: '1px solid #E4E7E9' }}
    >
      <div className="flex flex-col gap-[4px] p-[8px]">
        {TOP_NAV_ITEMS.map(item => (
          <NavItem key={item.label} {...item} />
        ))}

        {/* Documents — expandable */}
        <button
          onClick={() => setDocsOpen(o => !o)}
          className={[
            'w-full h-[34px] flex items-center gap-[8px] px-[8px] rounded-[6px] border-none cursor-pointer text-left flex-shrink-0',
            isUnderDocuments ? 'bg-[#F0F7FF]' : 'bg-transparent hover:bg-[#F9FAFB]',
          ].join(' ')}
        >
          <img src={imgDocuments} alt="" className="w-[18px] h-[18px] flex-shrink-0" />
          <span
            className={['text-[14px] font-semibold leading-[16px] tracking-[0.21px] flex-1 whitespace-nowrap', isUnderDocuments ? 'text-[#006ECE]' : 'text-[#282B2F]'].join(' ')}
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            Documents
          </span>
          {!docsOpen && (
            <span
              className="text-[8px] font-extrabold tracking-[1.2px] uppercase px-[6px] py-[2px] rounded-[12px] text-[#009B64] bg-[#EFFDF5]"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              New
            </span>
          )}
          {docsOpen ? <ChevronUp /> : <ChevronDown />}
        </button>

        {/* Documents sub-items */}
        {docsOpen && DOCUMENTS_SUB_ITEMS.map(sub => {
          const isActive = sub.path ? location.pathname === sub.path || location.pathname.startsWith(sub.path + '/') : false;
          return (
            <button
              key={sub.label}
              onClick={sub.path ? () => navigate(sub.path!) : undefined}
              className={[
                'w-full h-[34px] flex items-center gap-[8px] pl-[32px] pr-[8px] rounded-[6px] border-none text-left flex-shrink-0',
                sub.path ? 'cursor-pointer' : 'cursor-default',
                isActive ? 'bg-[#F0F7FF]' : 'bg-transparent hover:bg-[#F9FAFB]',
              ].join(' ')}
            >
              <span
                className={['text-[14px] font-semibold leading-[16px] tracking-[0.21px] flex-1 whitespace-nowrap', isActive ? 'text-[#006ECE]' : 'text-[#282B2F]'].join(' ')}
                style={{ fontFamily: "'Open Sans', sans-serif" }}
              >
                {sub.label}
              </span>
              {'badge' in sub && sub.badge && (
                <span
                  className="text-[8px] font-extrabold tracking-[1.2px] uppercase px-[6px] py-[2px] rounded-[12px] text-[#009B64] bg-[#EFFDF5]"
                  style={{ fontFamily: "'Open Sans', sans-serif" }}
                >
                  {sub.badge.text}
                </span>
              )}
            </button>
          );
        })}

        {/* Resources — display only */}
        <button
          className="w-full h-[34px] flex items-center gap-[8px] px-[8px] rounded-[6px] border-none cursor-default text-left bg-transparent flex-shrink-0"
        >
          <img src={imgResources} alt="" className="w-[18px] h-[18px] flex-shrink-0" />
          <span
            className="text-[14px] font-semibold leading-[16px] tracking-[0.21px] flex-1 text-[#282B2F] whitespace-nowrap"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            Resources
          </span>
          {resourcesOpen ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>

      {/* Collapse button */}
      <div className="flex items-center justify-end p-[16px] border-t border-[#E4E7E9] flex-shrink-0">
        <img src={imgChevronLeft} alt="Collapse" className="w-[24px] h-[24px] cursor-pointer" />
      </div>
    </div>
  );
}
