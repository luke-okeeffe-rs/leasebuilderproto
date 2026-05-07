import { useReducer, useRef, useEffect, useState } from 'react';
import { leaseFormReducer, initialState, validateStep } from './state/leaseFormReducer';
import { US_STATES } from './steps/usStates';
import { WizardHeader } from './WizardHeader';
import { WizardFooter } from './WizardFooter';
import { ProgressBlock } from './ProgressBlock';
import { LegalNameModal } from './components/LegalNameModal';
import { Step1LandlordType } from './steps/Step1LandlordType';
import { Step2LandlordInfo } from './steps/Step2LandlordInfo';
import { Step3TenantInfo } from './steps/Step3TenantInfo';
import { Step4MinorOccupants } from './steps/Step4MinorOccupants';
import { Step5PropertyType } from './steps/Step5PropertyType';
import { Step6PropertyAddress } from './steps/Step6PropertyAddress';
import { Step7LeaseTerms } from './steps/Step7LeaseTerms';
import { StepCompletion } from './steps/StepCompletion';
import { LeaseDocumentPreview } from './preview/LeaseDocumentPreview';

export function LeaseWizard() {
  const [state, dispatch] = useReducer(leaseFormReducer, initialState);
  const [showModal, setShowModal] = useState(false);
  const documentRef = useRef<HTMLDivElement>(null);
  const wizardRef = useRef<HTMLDivElement>(null);
  const { currentStep } = state;
  const HEADER_HEIGHT = 100;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  function scrollToDocument() {
    if (documentRef.current) {
      window.scrollTo({ top: documentRef.current.offsetTop - HEADER_HEIGHT, behavior: 'smooth' });
    }
  }

  function scrollToWizard() {
    if (wizardRef.current) {
      window.scrollTo({ top: wizardRef.current.offsetTop - HEADER_HEIGHT, behavior: 'smooth' });
    }
  }

  function handleContinue() {
    if (currentStep === 7) {
      for (let step = 1; step <= 7; step++) {
        const errors = validateStep(step, state);
        if (Object.keys(errors).length > 0) {
          dispatch({ type: 'GOTO_STEP_WITH_ERRORS', step, errors });
          requestAnimationFrame(() => { requestAnimationFrame(() => { scrollToWizard(); }); });
          return;
        }
      }
      setShowModal(true);
      return;
    }

    dispatch({ type: 'NEXT_STEP' });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToDocument();
      });
    });
  }

  function handleModalSave() {
    setShowModal(false);
    dispatch({ type: 'NEXT_STEP' });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToDocument();
      });
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

  const isCompletion = currentStep === 8;
  const propertyStateLabel = US_STATES.find(s => s.value === state.propertyState)?.label;

  return (
    <div className="bg-white">
      {showModal && (
        <LegalNameModal
          onSave={handleModalSave}
          onClose={() => setShowModal(false)}
        />
      )}
      <WizardHeader />
      {/* Spacer so page content starts below the fixed header */}
      <div className="h-[100px]" />

      {/* Wizard area — hugs its content */}
      <div
        ref={wizardRef}
        className="flex flex-col items-center bg-white py-[32px] gap-[32px]"
      >
        <div className="w-[650px] flex flex-col gap-[40px]">
          {!isCompletion && <ProgressBlock step={currentStep} propertyState={propertyStateLabel} />}

          {currentStep === 1 && <Step1LandlordType state={state} dispatch={dispatch} />}
          {currentStep === 2 && <Step2LandlordInfo state={state} dispatch={dispatch} />}
          {currentStep === 3 && <Step3TenantInfo state={state} dispatch={dispatch} />}
          {currentStep === 4 && <Step4MinorOccupants state={state} dispatch={dispatch} />}
          {currentStep === 5 && <Step5PropertyType state={state} dispatch={dispatch} />}
          {currentStep === 6 && <Step6PropertyAddress state={state} dispatch={dispatch} />}
          {currentStep === 7 && <Step7LeaseTerms state={state} dispatch={dispatch} />}
          {isCompletion && <StepCompletion onScrollToDocument={scrollToDocument} />}
        </div>

        <WizardFooter
          step={currentStep}
          onBack={handleBack}
          onContinue={handleContinue}
        />
      </div>

      {/* Document preview */}
      <div ref={documentRef}>
        <LeaseDocumentPreview state={state} goToStep={goToStep} />
      </div>
    </div>
  );
}
