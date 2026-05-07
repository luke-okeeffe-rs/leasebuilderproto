import { TopNav } from './TopNav';
import { SideNav } from './SideNav';

interface PortalLayoutProps {
  children: React.ReactNode;
}

export function PortalLayout({ children }: PortalLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <TopNav />
      <SideNav />
      {/* Offset for fixed top nav + side nav */}
      <div className="pt-[48px] pl-[216px]">
        {children}
      </div>
    </div>
  );
}
