import { useNavigate } from 'react-router-dom';

const dealAgentUrl = 'https://www.figma.com/api/mcp/asset/13463174-dfdc-459c-a08b-a445efcd894c';

interface WizardHeaderProps {
  title?: string;
  subtitle?: string;
  onSave?: () => void;
}

export function WizardHeader({ title, subtitle, onSave }: WizardHeaderProps) {
  const navigate = useNavigate();
  const viewLease = !!title;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-[100px] bg-white"
      style={{ boxShadow: '0px 1px 4px 0px rgba(22,29,37,0.05)' }}
    >
      {/* Pictogram */}
      <div className="absolute left-[24px] top-[calc(50%-1px)] -translate-y-1/2 w-[64px] h-[64px] overflow-hidden">
        <div className="absolute left-1/2 -translate-x-1/2 top-[8px] w-[48px] h-[48px]">
          <div className="absolute inset-[0_0.94%_0_3.13%]">
            <div className="absolute inset-[-2.34%_-1.21%_-2.35%_-2.44%]">
              <img src={dealAgentUrl} alt="" className="block w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </div>

      {viewLease ? (
        <div className="absolute left-[105px] top-1/2 -translate-y-1/2 flex flex-col gap-[4px] max-w-[500px]">
          <p
            className="text-[20px] font-semibold leading-[28px] text-[#282B2F] whitespace-nowrap overflow-hidden text-ellipsis m-0"
            style={{ fontFamily: "'Open Sans', sans-serif" }}
          >
            {title}
          </p>
          {subtitle && (
            <p
              className="text-[16px] font-normal leading-[24px] text-[#545D66] tracking-[0.128px] whitespace-nowrap overflow-hidden text-ellipsis m-0"
              style={{ fontFamily: "'Open Sans', sans-serif" }}
            >
              {subtitle}
            </p>
          )}
        </div>
      ) : (
        <p
          className="absolute left-[105px] top-[calc(50%-18px)] text-[24px] font-semibold leading-[32px] text-[#282B2F] whitespace-nowrap"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          Create lease agreement
        </p>
      )}

      <button
        onClick={onSave ?? (() => navigate('/documents'))}
        className="absolute right-[24px] top-1/2 -translate-y-1/2 text-[16px] font-normal leading-[24px] tracking-[0.128px] text-[#006ECE] bg-transparent border-none cursor-pointer p-0 hover:underline"
        style={{ fontFamily: "'Open Sans', sans-serif" }}
      >
        {viewLease ? 'Finish later' : 'Save and finish later'}
      </button>
    </div>
  );
}
