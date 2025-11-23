# Task Tracker

- [x] Project Initialization & Planning
    - [x] Explore existing directories
    - [x] Analyze App.tsx files
    - [x] Create plan.md
    - [x] Create tracker.md (this file)

- [x] Frontend Consolidation (Client)
    - [x] Initialize new Vite + React (JSX) project in `client` directory
    - [x] Install dependencies (Tailwind, React Router, Lucide, etc.)
    - [x] Migrate `onboardflow` structure (Router, Layouts)
    - [x] Migrate `hr-onboarding-assistant` components (Document Viewer, Extraction)
    - [x] Migrate `sentinel-hr-onboarding` components (Gap Analysis, Audit)
    - [x] Refactor to use JSX and consolidate styles (Fix Grids & Theme)

- [x] Backend Setup (Server)
    - [x] Initialize Node/Express project in `server` directory
    - [x] Setup basic API structure
    - [x] Implement RBAC middleware (Basic)
    - [x] Install additional dependencies (Milvus, JWT, Multer)
    - [x] **[NEW]** Implemented JSON Store (`server/data/cases.json`) for persistence, replacing mock memory.
    - [x] **[NEW]** Configured `nodemon` for development server management.

- [x] AI Service Integration (Python)
    - [x] **[NEW]** Created `orchestrate-python` FastAPI service.
    - [x] Implemented `/pipeline/onboarding-analyze` endpoint.
    - [x] Mocked Watsonx Orchestrate Agent pipeline (Reader -> Compliance -> Suggester -> Communication).
    - [x] Connected Node.js backend to Python service via Axios.

- [x] Integration & MVP Features
    - [x] Connect Frontend to Backend (Basic Mock API)
    - [x] **[NEW]** Implemented `AuthContext` and JWT handling in Frontend.
    - [x] **[NEW]** Implemented Auto-Login for Development convenience.
    - [x] Implemented Document Upload API (Frontend -> Node -> Python).
    - [x] Display AI Analysis results in UI.

- [/] Verification
    - [x] Verify UI flows
    - [x] Verify API endpoints (Mock)
    - [x] Verify Watsonx Integration (Simulated)
    - [ ] Create walkthrough.md

- [x] Git & Deployment
    - [x] Initialize Git and create `OnboardFlow` branch
    - [x] Push to remote `TentacioPro/OnboardFlow`
    - [x] Merge to `main`
    - [x] Configure `gh-pages` deployment
    - [x] Deploy to GitHub Pages

## Architectural Decisions & Changes (Nov 23)

### 1. Hybrid Backend Architecture
We moved from a pure Node.js backend to a hybrid architecture to leverage Python's ecosystem for AI orchestration.
- **Node.js (Express)**: Handles the API Gateway, Authentication, File Uploads, and Persistence (JSON Store). It acts as the primary interface for the Frontend.
- **Python (FastAPI)**: Dedicated microservice (`orchestrate-python`) for running the AI Agent Pipeline. It mimics the IBM Watsonx Orchestrate flow.

### 2. Data Persistence
- **Decision**: Replaced in-memory mock data with a file-based JSON Store (`cases.json`).
- **Reasoning**: Allows for data persistence across server restarts without the complexity of setting up a full database (MongoDB/Postgres) for the MVP phase.

### 3. Authentication Flow
- **Decision**: Implemented a JWT-based authentication flow.
- **Implementation**:
    - **Frontend**: Added `AuthContext` to manage user state and an Axios interceptor to automatically attach the `Authorization` header to requests.
    - **Backend**: `authMiddleware` verifies the token on protected routes.
    - **Dev Experience**: Added an "Auto-Login" feature in `AuthContext` to streamline development testing.

### 4. AI Pipeline Integration
- **Flow**: Upload -> Node.js (Multer) -> Base64 Encode -> Python Service -> Agent Pipeline -> JSON Response -> Update Store.
- **Benefit**: Decouples the heavy AI processing from the main application server and prepares the system for real Watsonx SDK integration.
