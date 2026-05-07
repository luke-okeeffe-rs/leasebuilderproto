const imgLogo = 'https://www.figma.com/api/mcp/asset/4844e5bf-38ec-4e43-ac3a-85aa4a7fc7f9';
const imgHelp = 'https://www.figma.com/api/mcp/asset/05a27ecf-eebe-4fd7-8f50-23169def76a5';
const imgBookmark = 'https://www.figma.com/api/mcp/asset/d1cbeaef-d9ba-4b31-8438-433d7fe1a783';

interface TopNavProps {
  activeTab?: 'manage' | 'buy';
}

export function TopNav({ activeTab = 'manage' }: TopNavProps) {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-[48px] bg-white flex items-center justify-between px-[16px]"
      style={{
        borderBottom: '1px solid #E4E7E9',
        boxShadow: '0px 1px 2px rgba(22,29,37,0.05)',
      }}
    >
      {/* Left: logo + nav tabs */}
      <div className="flex items-center h-full gap-[16px]">
        <div className="w-[91px] h-[20px] flex-shrink-0">
          <img src={imgLogo} alt="Tessa" className="w-full h-full object-contain" />
        </div>

        {/* Divider */}
        <div className="w-px h-[24px] bg-[#E4E7E9]" />

        <div className="flex items-center h-full gap-[16px]">
          <button
            className={[
              'flex items-center h-full border-b-2 text-[14px] font-semibold leading-[20px] tracking-[0.07px] bg-transparent border-x-0 border-t-0 cursor-pointer px-0',
              activeTab === 'manage'
                ? 'border-[#006ECE] text-[#006ECE]'
                : 'border-transparent text-[#282B2F]',
            ].join(' ')}
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            Manage Rentals
          </button>
          <button
            className={[
              'flex items-center h-full border-b-2 text-[14px] font-semibold leading-[20px] tracking-[0.07px] bg-transparent border-x-0 border-t-0 cursor-pointer px-0',
              activeTab === 'buy'
                ? 'border-[#006ECE] text-[#006ECE]'
                : 'border-transparent text-[#282B2F]',
            ].join(' ')}
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            Buy
          </button>
        </div>
      </div>

      {/* Right: icons + avatar */}
      <div className="flex items-center gap-[16px]">
        <img src={imgHelp} alt="Help" className="w-[20px] h-[20px]" />
        <img src={imgBookmark} alt="Saved" className="w-[20px] h-[20px]" />
        <div className="w-[24px] h-[24px] rounded-full bg-[#7E8A92] flex items-center justify-center">
          <span
            className="text-white text-[10px] font-semibold tracking-[0.075px]"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            AB
          </span>
        </div>
      </div>
    </div>
  );
}
