# Walkthrough: HR Onboarding Assistant MVP

## Overview
This document outlines the steps taken to consolidate the frontend code and set up the backend for the HR Onboarding Assistant MVP.

## Accomplishments
- **Frontend Consolidation**:
  - Created a new Vite + React application in `client/`.
  - Migrated Case Management features from `onboardflow`.
  - Migrated Document Analysis features from `hr-onboarding-assistant` to `client/src/components/document-viewer` and `client/src/pages/DocumentAnalysisPage.jsx`.
  - Migrated Gap Analysis features from `sentinel-hr-onboarding` to `client/src/pages/CaseGaps.jsx` and `client/src/components/AuditModal.jsx`.
  - Integrated all features into a unified navigation structure.
  - Configured Tailwind CSS v4.

- **Backend Setup**:
  - Created a Node.js/Express server in `server/`.
  - Implemented RBAC middleware (`server/src/middleware/auth.js`).
  - Created API endpoints for fetching cases (`server/src/routes/caseRoutes.js`).
  - Migrated mock data to the backend (`server/src/data/mockData.js`).

- **Integration**:
  - Connected Frontend to Backend using Axios in `CaseContext.jsx`.
  - Implemented fallback to local mock data if the backend is unavailable.

## How to Run

### Prerequisites
- Node.js installed.

### 1. Start the Backend
```bash
cd server
npm install
node src/server.js
```
The server will start on `http://localhost:5000`.

### 2. Start the Frontend
```bash
cd client
npm install
npm run dev
```
The frontend will start on `http://localhost:5173` (or similar).

## Verification
1. Open the frontend URL.
2. You should see the **Case List**.
3. Click on a case to view **Case Details**.
4. Navigate to the **Documents** tab.
5. Click the **Analyze** icon (file text) on a document to open the **Document Analysis** view.
6. Navigate to the **Gaps & Compliance** tab to view the Gap Analysis.
7. Verify that data is being fetched from the backend (check Network tab for request to `http://localhost:5000/api/cases`).

## Next Steps
- Implement real database (e.g., MongoDB or PostgreSQL).
- Implement real authentication (e.g., JWT).
- Integrate IBM Watsonx Orchestrate APIs (stubs are ready for implementation).
