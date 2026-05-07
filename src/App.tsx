import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardPage } from './pages/DashboardPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { AgreementsPage } from './pages/AgreementsPage';
import { LeaseWizard } from './features/lease-wizard/LeaseWizard';

export default function App() {
  return (
    <BrowserRouter basename="/leasebuilderproto">
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/documents" element={<Navigate to="/documents/agreements" replace />} />
        <Route path="/documents/agreements" element={<AgreementsPage />} />
        <Route path="/documents/saved" element={<DocumentsPage />} />
        <Route path="/documents/landlord-forms" element={<DocumentsPage />} />
        <Route path="/documents/new-lease" element={<LeaseWizard />} />
      </Routes>
    </BrowserRouter>
  );
}
