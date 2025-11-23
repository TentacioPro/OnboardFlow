# Implementation Plan: AI-Powered HR Onboarding Document Assistant (MVP)

## Goal
Build an MVP for an AI-Powered HR Onboarding Document Assistant using IBM Watsonx Orchestrate. The system will streamline the onboarding process by automating document collection, verification, and compliance checks.

## Architecture

### Frontend (Client)
- **Tech Stack**: React, Vite, JSX, Tailwind CSS.
- **Structure**: Consolidated application.
    - **Shell/Navigation**: Based on `onboardflow` (React Router, Dashboard Layout).
    - **Document Viewer**: Integrated from `hr-onboarding-assistant`.
    - **Analysis & Reporting**: Integrated from `sentinel-hr-onboarding`.
- **Key Features**:
    - Dashboard for Case Management.
    - Interactive Document Viewer with Extraction Highlights.
    - Gap Analysis & Compliance Reporting.
    - RBAC-based Views (HR vs. Employee).

### Backend (Server)
- **Tech Stack**: Node.js, Express, Axios.
- **Database**: 
    - IBM Milvus (for Vector Search/RAG).
    - In-memory/File-based (for MVP metadata storage).
- **Integration**:
    - IBM Watsonx Orchestrate APIs (Agentic Layer).
    - IBM Cloud Services.

### Core Components
1.  **Orchestrator Agent**: Manages the onboarding workflow.
2.  **Document Agent**: Handles upload, OCR, and extraction.
3.  **Compliance Agent**: Checks against requirements and identifies gaps.

## Roadmap

### Phase 1: Foundation & Consolidation
- [ ] Initialize `client` (React/Vite) and `server` (Node/Express) directories.
- [ ] Migrate and refactor frontend components from TSX to JSX.
- [ ] Establish a unified design system (Tailwind CSS).

### Phase 2: Backend & API
- [ ] Setup Express server with RBAC middleware.
- [ ] Implement API endpoints for Document Upload and Case Management.
- [ ] Connect Frontend to Backend.

### Phase 3: IBM Watsonx Integration
- [ ] Configure IBM Watsonx Orchestrate Agents.
- [ ] Implement API calls to trigger agents.
- [ ] Store and retrieve results from Milvus (if applicable).

### Phase 4: Verification & Polish
- [ ] End-to-end testing of the onboarding flow.
- [ ] UI/UX Polish (Animations, Responsive Design).
- [ ] Final Deployment/Demo preparation.
