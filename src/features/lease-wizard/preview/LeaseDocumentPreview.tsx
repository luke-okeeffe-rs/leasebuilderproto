import type { LeaseFormState } from '../state/types';
import { US_STATES } from '../steps/usStates';

const helpBubbleUrl = 'https://www.figma.com/api/mcp/asset/6fbf6b4b-0765-4601-b3cf-8db03cf613be';

interface Props {
  state: LeaseFormState;
  goToStep: (step: number) => void;
}

const PROPERTY_TYPE_LABELS: Record<string, string> = {
  'single-family': 'Single family home',
  'condo': 'Condo',
  'townhouse': 'Townhouse',
  'apartment': 'Apartment',
  'duplex': 'Duplex',
  'other': 'Other',
};

function stateLabel(abbr: string) {
  return US_STATES.find(s => s.value === abbr)?.label || abbr;
}

export function LeaseDocumentPreview({ state, goToStep }: Props) {
  const s = state;
  const propertyTypeLabel = PROPERTY_TYPE_LABELS[s.propertyType] || s.propertyType;

  function Pill({ value, step }: { value?: string; step?: number }) {
    const isEmpty = !value;
    const isClickable = !!step;
    return (
      <span
        onClick={isClickable ? () => goToStep(step!) : undefined}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        style={{
          display: 'inline-block',
          border: `1px solid ${isEmpty && isClickable ? '#2E6DA4' : '#c8cdd0'}`,
          borderRadius: '3px',
          padding: '0 5px',
          margin: '0 2px',
          lineHeight: '1.5',
          backgroundColor: '#fff',
          minWidth: isEmpty ? '60px' : undefined,
          color: '#282B2F',
          fontWeight: 'inherit',
          cursor: isClickable ? 'pointer' : 'default',
        }}
      >
        {value || ' '}
      </span>
    );
  }

  return (
    <div className="relative bg-[#F9FAFB] px-[24px] pt-[22px] pb-[40px]">
      {/* Paper */}
      <div
        className="max-w-[968px] mx-auto bg-white rounded-[4px] px-[72px] py-[64px]"
        style={{ boxShadow: '0 2px 16px rgba(23,24,24,0.05), 0 1px 4px rgba(23,24,24,0.04)' }}
      >
        <h1
          style={{
            fontFamily: "'Open Sans', sans-serif",
            fontSize: '22px',
            fontWeight: 700,
            textAlign: 'center',
            marginBottom: '48px',
            color: '#282B2F',
          }}
        >
          California Lease Agreement
        </h1>

        <div style={{ fontFamily: "'Open Sans', sans-serif", fontSize: '13.5px', lineHeight: '1.85', color: '#282B2F' }}>

          <p style={{ marginBottom: '20px' }}>
            This Lease Agreement ("Lease") is entered into on
            <Pill value={s.leaseDate} step={7} />, by and between
            <Pill value={s.landlordName} step={2} /> ("Landlord"), and
            <Pill value={s.tenantName} step={3} /> ("Tenant").
          </p>

          <p style={{ marginBottom: '20px' }}>
            <strong>Leased Property.</strong> The Landlord hereby leases to the Tenant the{' '}
            {propertyTypeLabel ? propertyTypeLabel.toLowerCase() : 'property'} located at
            <Pill value={s.propertyStreet} step={6} />,
            <Pill value={s.propertyCity} step={6} />, California
            <Pill value={s.propertyZip} step={6} />
            {' '}("Leased Property").
          </p>

          <p style={{ marginBottom: '20px' }}>
            <strong>Term.</strong> This Lease shall be for a fixed term, starting on
            <Pill value={s.startDate} step={7} /> ("Start Date") and ending on
            <Pill value={s.endDate} step={7} /> ("Termination Date"). The Tenant will be
            entitled to possession of the Leased Property beginning on the Start Date and shall
            maintain possession of the Leased Property until the Termination Date unless
            terminated through approved methods outlined in this Lease or under California law.
          </p>

          <p style={{ marginBottom: '8px' }}>
            <strong>Rent.</strong> The Tenant agrees to pay to the Landlord as rent for the use
            and occupancy of the Leased Property the sum of $<Pill value={s.rentAmount} step={7} /> due on
            the <Pill value={s.rentDueDay} step={7} /> day of each month ("Rent").
            The first month's Rent, ranging from <Pill /> to <Pill />, will be pro-rated at a
            rate of $<Pill />.
          </p>

          <p style={{ marginBottom: '8px' }}>The Rent shall be paid by the following method(s):</p>
          <ul style={{ marginLeft: '32px', marginBottom: '20px' }}>
            <li>- Electronic Payment Methods</li>
            <li>- Personal Check</li>
            <li>- Cashier's Check</li>
            <li>- Money Order</li>
            <li>- Cash</li>
          </ul>

          <p style={{ marginBottom: '8px' }}>
            The following electronic payment methods will be accepted:
          </p>
          <p style={{ marginLeft: '32px', marginBottom: '20px' }}>
            - <Pill value={s.paymentMethod} step={7} />
          </p>

          <p style={{ marginBottom: '20px' }}>
            The Rent shall be payable to the Landlord, located at
            <Pill value={s.landlordName} step={2} />,
            <Pill value={s.landlordCity} step={2} />,
            <Pill value={stateLabel(s.landlordState)} step={2} />
            <Pill value={s.landlordZip} step={2} />.
            The Landlord can be reached by phone at
            <Pill value={s.landlordPhone} step={2} /> or by email at
            <Pill value={s.landlordEmail} step={2} />.
          </p>

          <p style={{ marginBottom: '20px' }}>
            If any payment is returned for non-sufficient funds or because the Tenant stops
            payments, then, after that, the Landlord may, in writing, require the Tenant to pay
            future Rent payments by cash, cashier's check, or money order.
          </p>

          <p style={{ marginBottom: '20px' }}>
            <strong>Non-Sufficient Funds.</strong> The Tenant will be charged a monetary fee of
            $25.00 as reimbursement of the expenses incurred by the Landlord for the first check
            that is returned to the Landlord for lack of non-sufficient funds, and $35.00 for
            each subsequent check returned for lack of non-sufficient funds. This Paragraph is in
            accordance with California Civil Code § 1719.
          </p>

          <p style={{ marginBottom: '20px' }}>
            <strong>Security Deposit.</strong> Upon the execution of this Lease, the Tenant shall
            deposit with the Landlord the sum of $<Pill value={s.securityDeposit} step={7} /> as a security
            deposit. This security deposit shall be returned to the Tenant within twenty-one (21)
            days after the Tenant vacates the Leased Property, less any amounts withheld by the
            Landlord for unpaid rent or damage beyond normal wear and tear.
          </p>

          <p style={{ marginBottom: '20px' }}>
            <strong>Occupants.</strong> The Leased Property shall be occupied only by the Tenant
            {s.minors === 'yes' && s.minorNames.filter(Boolean).length > 0 && (
              <> and the following minor occupants: {s.minorNames.filter(Boolean).map((n, i) => (
                <Pill key={i} value={n} step={4} />
              ))}</>
            )}.
            No other persons shall reside in or occupy the Leased Property without the prior
            written consent of the Landlord.
          </p>

          <p style={{ marginBottom: '20px' }}>
            <strong>Governing Law.</strong> This Lease shall be governed by and construed in
            accordance with the laws of the State of California.
          </p>

          <div style={{ marginTop: '48px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
            <div>
              <div style={{ borderBottom: '1px solid #282B2F', marginBottom: '8px', paddingBottom: '40px' }} />
              <p style={{ marginBottom: '4px' }}>
                <Pill value={s.landlordName} step={2} />
              </p>
              <p style={{ color: '#545D66', fontSize: '12px' }}>Landlord Signature</p>
              <p style={{ color: '#545D66', fontSize: '12px', marginTop: '8px' }}>Date: <Pill value={s.leaseDate} step={7} /></p>
            </div>
            <div>
              <div style={{ borderBottom: '1px solid #282B2F', marginBottom: '8px', paddingBottom: '40px' }} />
              <p style={{ marginBottom: '4px' }}>
                <Pill value={s.tenantName} step={3} />
              </p>
              <p style={{ color: '#545D66', fontSize: '12px' }}>Tenant Signature</p>
              <p style={{ color: '#545D66', fontSize: '12px', marginTop: '8px' }}>Date: <Pill value={s.leaseDate} step={7} /></p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating help bubble */}
      <div className="fixed bottom-[30px] right-[30px] w-[64px] h-[64px] pointer-events-none">
        <img src={helpBubbleUrl} alt="" className="w-full h-full object-cover rounded-full" />
      </div>
    </div>
  );
}
