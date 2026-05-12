import { useReducer, useRef, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { leaseFormReducer, initialState, validateStep } from './state/leaseFormReducer';
import { US_STATES } from './steps/usStates';
import { WizardHeader } from './WizardHeader';
import { WizardFooter } from './WizardFooter';
import { ProgressBlock } from './ProgressBlock';
import { LegalNameModal } from './components/LegalNameModal';
import { PostLeaseModal } from './components/PostLeaseModal';
import { Step1LandlordType } from './steps/Step1LandlordType';
import { Step2LandlordInfo } from './steps/Step2LandlordInfo';
import { Step3TenantInfo } from './steps/Step3TenantInfo';
import { Step5PropertyType } from './steps/Step5PropertyType';
import { Step6PropertyAddress } from './steps/Step6PropertyAddress';
import { Step7LeaseTerms } from './steps/Step7LeaseTerms';
import { LeaseDocumentPreview } from './preview/LeaseDocumentPreview';

interface RouterState {
  viewLease?: boolean;
  openModal?: boolean;
  leaseName?: string;
  propertyAddress?: string;
  selectedProperty?: string;
}

export function LeaseWizard() {
  const navigate = useNavigate();
  const location = useLocation();
  const routerState = (location.state ?? {}) as RouterState;

  const [state, dispatch] = useReducer(leaseFormReducer, initialState, (init) => {
    try {
      const saved = localStorage.getItem('lease-wizard-draft');
      if (saved) return JSON.parse(saved);
    } catch {}
    if (routerState.selectedProperty) {
      const parts = routerState.selectedProperty.split(', ');
      const street = parts[0] ?? '';
      const city = parts[1] ?? '';
      const stateZip = (parts[2] ?? '').split(' ');
      const st = stateZip[0] ?? '';
      const zip = stateZip[1] ?? '';
      return { ...init, propertyStreet: street, propertyCity: city, propertyState: st, propertyZip: zip };
    }
    return init;
  });
  const [showModal, setShowModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(!!routerState.openModal);
  const [viewLeaseMode, setViewLeaseMode] = useState(!!routerState.viewLease);
  const documentRef = useRef<HTMLDivElement>(null);
  const wizardRef = useRef<HTMLDivElement>(null);
  const { currentStep } = state;
  const HEADER_HEIGHT = 100;

  const hasErrors = Object.values(state.errors).some(Boolean);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  // When validation errors appear, scroll to and focus the first errored field
  useEffect(() => {
    if (!hasErrors) return;
    requestAnimationFrame(() => {
      const firstField = Object.keys(state.errors).find(k => state.errors[k]);
      if (!firstField) return;
      const el = document.getElementById(firstField);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.focus();
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasErrors, currentStep]);

  function scrollToWizard() {
    if (wizardRef.current) {
      window.scrollTo({ top: wizardRef.current.offsetTop - HEADER_HEIGHT, behavior: 'smooth' });
    }
  }

  function handleContinue() {
    if (currentStep === 6) {
      for (let step = 1; step <= 6; step++) {
        const errors = validateStep(step, state);
        if (Object.keys(errors).length > 0) {
          dispatch({ type: 'GOTO_STEP', step });
          dispatch({ type: 'SET_ERRORS', errors });
          return;
        }
      }
      window.scrollTo({ top: 0 });
      setShowModal(true);
      return;
    }

    dispatch({ type: 'NEXT_STEP' });
  }

  function handleModalSave() {
    localStorage.setItem('lease-wizard-draft', JSON.stringify(state));
    setShowModal(false);
    setViewLeaseMode(true);
    setShowPostModal(true);
  }

  function handlePostModalClose() {
    setShowPostModal(false);
  }

  function handleEditDocument() {
    setShowPostModal(false);
    setViewLeaseMode(false);
    dispatch({ type: 'GOTO_STEP', step: 1 });
    window.scrollTo({ top: 0 });
  }

  function handleStartSigning() {
    navigate('/documents/agreements/list', {
      state: {
        leaseName: propertyStateLabel ? `${propertyStateLabel} lease agreement` : 'Lease agreement',
        propertyAddress: state.propertyStreet || '—',
        dateAdded: new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' }),
        showSigningModal: true,
      },
    });
  }

  function handleSaveDraft() {
    localStorage.setItem('lease-wizard-draft', JSON.stringify(state));
    const leaseName = propertyStateLabel ? `${propertyStateLabel} lease agreement` : 'Lease agreement';
    const propertyAddress = state.propertyStreet || '—';
    const dateAdded = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' });
    navigate('/documents/agreements/list', {
      state: viewLeaseMode
        ? { isReadyToSign: true, leaseName, propertyAddress, dateAdded }
        : { isDraft: true, leaseName, propertyAddress, dateAdded },
    });
  }

  function handleBack() {
    dispatch({ type: 'PREV_STEP' });
    scrollToWizard();
  }

  function goToStep(step: number) {
    dispatch({ type: 'GOTO_STEP', step });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToWizard();
      });
    });
  }

  const propertyStateLabel = US_STATES.find(s => s.value === state.propertyState)?.label;

  const viewLeaseTitle = routerState.leaseName
    ?? (propertyStateLabel ? `${propertyStateLabel} lease agreement` : 'Lease agreement');
  const viewLeaseSubtitle = routerState.propertyAddress
    ?? [state.propertyStreet, state.propertyCity, propertyStateLabel].filter(Boolean).join(', ');

  return (
    <div className={viewLeaseMode ? 'bg-[#F9FAFB]' : 'bg-white'}>
      {showModal && (
        <LegalNameModal
          onSave={handleModalSave}
          onClose={() => setShowModal(false)}
        />
      )}
      {showPostModal && (
        <PostLeaseModal onClose={handlePostModalClose} onStartSigning={handleStartSigning} onEditDocument={handleEditDocument} />
      )}
      <WizardHeader
        title={viewLeaseMode ? viewLeaseTitle : undefined}
        subtitle={viewLeaseMode ? viewLeaseSubtitle : undefined}
        onSave={handleSaveDraft}
      />
      <div className="h-[100px]" />

      {!viewLeaseMode && (
        <div
          ref={wizardRef}
          className="flex flex-col items-center bg-white py-[32px] gap-[32px]"
        >
          <div className="w-[650px] flex flex-col gap-[40px]">
            <ProgressBlock step={currentStep} propertyState={propertyStateLabel} />

            {hasErrors && (
              <div className="bg-red-50 border border-red-200 rounded-[6px] px-[16px] py-[12px]">
                <p className="text-[14px] font-semibold text-red-700 leading-[20px] m-0"
                  style={{ fontFamily: "'Open Sans', sans-serif" }}>
                  Please complete the required fields highlighted below.
                </p>
              </div>
            )}

            {currentStep === 1 && <Step1LandlordType state={state} dispatch={dispatch} />}
            {currentStep === 2 && <Step2LandlordInfo state={state} dispatch={dispatch} />}
            {currentStep === 3 && <Step3TenantInfo state={state} dispatch={dispatch} />}
            {currentStep === 4 && <Step5PropertyType state={state} dispatch={dispatch} />}
            {currentStep === 5 && <Step6PropertyAddress state={state} dispatch={dispatch} />}
            {currentStep === 6 && <Step7LeaseTerms state={state} dispatch={dispatch} />}
          </div>

          <WizardFooter
            step={currentStep}
            onBack={handleBack}
            onContinue={handleContinue}
          />
        </div>
      )}

      {viewLeaseMode && !showPostModal && (
        <button
          onClick={() => setShowPostModal(true)}
          className="fixed top-[116px] right-[24px] z-40 h-[48px] px-[16px] rounded-[6px] text-[16px] font-bold leading-[24px] text-white bg-[#2E6DA4] hover:bg-[#255a8a] transition-colors border-none cursor-pointer"
          style={{
            fontFamily: "'Open Sans', sans-serif",
            boxShadow: '0px 8px 12px rgba(23,24,24,0.12), 0px 3px 3px rgba(23,24,24,0.08)',
          }}
        >
          Lease options
        </button>
      )}

      <div ref={documentRef}>
        <LeaseDocumentPreview state={state} goToStep={viewLeaseMode ? () => {} : goToStep} />
      </div>
    </div>
  );
}
