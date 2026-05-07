import { useNavigate } from 'react-router-dom';
import { PortalLayout } from '../components/PortalLayout';

export function DocumentsPage() {
  const navigate = useNavigate();

  return (
    <PortalLayout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-48px)]">
        <div className="flex flex-col items-center gap-[16px] text-center max-w-[400px]">
          <p
            className="text-[20px] font-semibold leading-[28px] text-[#282B2F]"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            No documents yet
          </p>
          <p
            className="text-[16px] font-normal leading-[24px] text-[#545D66]"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            Create a lease agreement to get started.
          </p>
          <button
            onClick={() => navigate('/documents/new-lease')}
            className="h-[48px] px-[24px] rounded-[6px] text-[16px] font-bold leading-[24px] text-white bg-[#2E6DA4] hover:bg-[#255a8a] transition-colors cursor-pointer border-none mt-[8px]"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            Create lease agreement
          </button>
        </div>
      </div>
    </PortalLayout>
  );
}
