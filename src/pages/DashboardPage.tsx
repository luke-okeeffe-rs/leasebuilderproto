import { PortalLayout } from '../components/PortalLayout';

const imgDashboardIcon = 'https://www.figma.com/api/mcp/asset/3d6fd001-5bea-43c1-840f-780a00abf519';

export function DashboardPage() {
  return (
    <PortalLayout>
      <div className="p-[24px]">
        <div className="flex items-center gap-[16px]">
          <div className="w-[41px] h-[40px] bg-[#EFEFEF] rounded-[6px] flex items-center justify-center flex-shrink-0">
            <img src={imgDashboardIcon} alt="" className="w-[24px] h-[24px]" />
          </div>
          <h1
            className="text-[24px] font-semibold leading-[32px] text-[#414141] m-0"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            Dashboard
          </h1>
        </div>
      </div>
    </PortalLayout>
  );
}
