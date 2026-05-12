import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PlanContext } from './context/PlanContext.tsx'

const basename = '/leasebuilderproto';
const freePath = basename + '/free';

// Detect free-user entry point before rewriting URL
const isFreeUser = window.location.pathname.startsWith(freePath);

localStorage.removeItem('lease-wizard-draft');
localStorage.removeItem('lease-agreement-record');

// On every page load/refresh, redirect to the dashboard root
if (window.location.pathname !== basename && window.location.pathname !== basename + '/') {
  window.history.replaceState(null, '', basename + '/');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PlanContext.Provider value={isFreeUser ? 'free' : 'paid'}>
      <App />
    </PlanContext.Provider>
  </StrictMode>,
)
