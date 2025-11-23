import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CaseProvider } from './context/CaseContext';
import DashboardLayout from './layouts/DashboardLayout';
import CaseList from './pages/CaseList';
import CaseDetailsLayout from './pages/CaseDetailsLayout';
import CaseSummary from './pages/CaseSummary';
import CaseDocuments from './pages/CaseDocuments';
import CaseActions from './pages/CaseActions';
import Settings from './pages/Settings';
import DocumentAnalysisPage from './pages/DocumentAnalysisPage';
import CaseGaps from './pages/CaseGaps';

const App = () => {
  return (
    <CaseProvider>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/cases" replace />} />
          <Route path="cases" element={<CaseList />} />
          <Route path="cases/:id" element={<CaseDetailsLayout />}>
            <Route index element={<Navigate to="summary" replace />} />
            <Route path="summary" element={<CaseSummary />} />
            <Route path="documents" element={<CaseDocuments />} />
            <Route path="gaps" element={<CaseGaps />} />
            <Route path="actions" element={<CaseActions />} />
          </Route>
          <Route path="cases/:id/documents/:docId" element={<DocumentAnalysisPage />} />
          <Route path="settings" element={<Settings />} />
          {/* Catch all for easier dev nav */}
          <Route path="*" element={<Navigate to="/cases" replace />} />
        </Route>
      </Routes>
    </CaseProvider>
  );
};

export default App;
