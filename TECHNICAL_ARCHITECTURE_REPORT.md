# Technical Architecture Report
## AI-Powered HR Onboarding Document Assistant

**Project:** IBM Watsonx Orchestrate - LabLabAI Hackathon (November 2025)  
**Architecture:** Full-Stack Application with AI Integration  
**Generated:** November 23, 2025

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Client Directory (Frontend)](#client-directory-frontend)
3. [Server Directory (Backend)](#server-directory-backend)
4. [Orchestrate-Python Directory](#orchestrate-python-directory)
5. [Integration Architecture](#integration-architecture)
6. [Technology Stack Summary](#technology-stack-summary)

---

## Executive Summary

This project implements an AI-powered HR onboarding assistant that automates document processing, candidate tracking, and onboarding workflow management. The system consists of three main components:

- **Client (Frontend):** React-based SPA with modern UI/UX
- **Server (Backend):** Node.js/Express REST API with authentication
- **Orchestrate-Python:** Python service for IBM Watsonx Orchestrate integration

---

## Client Directory (Frontend)

### Overview
The client is a modern React single-page application (SPA) built with Vite as the build tool and bundler.

### Core Technologies

#### 1. **React 19.2.0** (Latest Version)

**Syntax & Purpose:**
```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
```

- **`React`**: Core library for building component-based UIs
- **`ReactDOM.createRoot()`**: React 18+ concurrent rendering API
- **Component Pattern**: Functional components with hooks (no class components)

**Key Features Used:**
- **Hooks**: `useState`, `useEffect`, `useContext`, `useMemo`
- **Strict Mode**: Enabled for development checks
- **Concurrent Features**: Automatic batching, transitions

#### 2. **React Router DOM 7.9.6**

**Syntax & Purpose:**
```jsx
import { BrowserRouter, Routes, Route, Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom';
```

**Components Explained:**
- **`<BrowserRouter>`**: Wraps entire app, enables HTML5 history API routing
- **`<Routes>`**: Container for route definitions (replaces Switch from v5)
- **`<Route>`**: Defines path-to-component mapping
  - `path="/"`: URL pattern
  - `element={<Component />}`: Component to render
  - `index`: Default child route
- **`<Navigate>`**: Programmatic redirect component
  - `to="/cases"`: Target path
  - `replace`: Replace history entry instead of push
- **`<Outlet>`**: Renders child routes in nested routing
- **`<NavLink>`**: Navigation link with active state styling
  - `className={({ isActive }) => ...}`: Dynamic class based on active state
- **`useNavigate()`**: Hook for programmatic navigation
  - `navigate('/cases/123')`: Navigate to path

**Routing Structure:**

```
/ (DashboardLayout)
├── /cases (CaseList)
├── /cases/:id (CaseDetailsLayout)
│   ├── /cases/:id/summary (CaseSummary)
│   ├── /cases/:id/documents (CaseDocuments)
│   ├── /cases/:id/gaps (CaseGaps)
│   └── /cases/:id/actions (CaseActions)
├── /cases/:id/documents/:docId (DocumentAnalysisPage)
└── /settings (Settings)
```

#### 3. **Tailwind CSS 4.1.17** (Latest Version)

**Syntax & Purpose:**
```jsx
className="flex items-center gap-3 px-4 py-2 bg-indigo-600 text-white rounded-md"
```

**Utility Classes Breakdown:**
- **Layout**: `flex`, `grid`, `block`, `inline-block`
- **Flexbox**: `items-center` (align-items: center), `justify-between`, `gap-3` (gap: 0.75rem)
- **Spacing**: `px-4` (padding-x: 1rem), `py-2` (padding-y: 0.5rem), `m-4` (margin: 1rem)
- **Sizing**: `w-64` (width: 16rem), `h-screen` (height: 100vh), `max-w-md`
- **Colors**: `bg-indigo-600` (background), `text-white`, `border-slate-200`
- **Typography**: `text-sm`, `font-medium`, `font-bold`, `uppercase`, `tracking-wider`
- **Borders**: `rounded-md`, `border`, `border-t`
- **Effects**: `shadow-sm`, `hover:bg-indigo-700`, `transition-colors`
- **Responsive**: `sm:flex-row` (applies at small breakpoint)

**Custom Theme Configuration:**
```css
@theme {
  --color-primary: #0f62fe;
  --color-secondary: #393939;
  --color-surface: #f4f4f4;
}
```

**Vite Plugin Integration:**
```javascript
import tailwindcss from '@tailwindcss/vite'
plugins: [tailwindcss()]
```

#### 4. **Vite 7.2.4** (Build Tool)


**Configuration (vite.config.js):**
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),        // JSX transformation, Fast Refresh
    tailwindcss(),  // Tailwind CSS processing
  ],
  base: '/OnboardFlow/',  // Base public path for GitHub Pages
})
```

**Key Features:**
- **Hot Module Replacement (HMR)**: Instant updates without full reload
- **Fast Refresh**: Preserves React component state during edits
- **ES Modules**: Native ESM in development
- **Optimized Build**: Rollup-based production bundling
- **Plugin System**: Extensible architecture

**Scripts:**
```json
"dev": "vite",              // Development server (port 5173)
"build": "vite build",      // Production build
"preview": "vite preview",  // Preview production build
"deploy": "gh-pages -d dist" // Deploy to GitHub Pages
```

#### 5. **Axios 1.13.2** (HTTP Client)

**Syntax & Purpose:**
```javascript
import axios from 'axios';

// GET request
const response = await axios.get('http://localhost:5000/api/cases', {
  headers: { 'x-role': 'hr-manager' }
});

// POST request
await axios.post('/api/auth/login', { email, password });
```

**Features Used:**
- **Promise-based**: Async/await compatible
- **Request/Response Interceptors**: Centralized error handling
- **Automatic JSON transformation**: Request/response data
- **Headers**: Custom headers for authentication


#### 6. **Lucide React 0.554.0** (Icon Library)

**Syntax & Purpose:**
```jsx
import { LayoutDashboard, Users, FileText, Settings, Search, Bell, ChevronRight } from 'lucide-react';

<LayoutDashboard size={18} />
<Search className="text-slate-400" size={18} />
```

**Features:**
- **Tree-shakeable**: Only imports used icons
- **Customizable**: Size, color, stroke-width via props
- **Consistent Design**: Modern, clean icon set
- **React Components**: Native React integration

#### 7. **Context API** (State Management)

**Syntax & Implementation:**
```jsx
// Creating Context
const CaseContext = createContext(undefined);

// Provider Component
export const CaseProvider = ({ children }) => {
  const [cases, setCases] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <CaseContext.Provider value={{ cases, searchQuery, setSearchQuery }}>
      {children}
    </CaseContext.Provider>
  );
};

// Custom Hook for Consuming Context
export const useCases = () => {
  const context = useContext(CaseContext);
  if (!context) {
    throw new Error('useCases must be used within a CaseProvider');
  }
  return context;
};

// Usage in Components
const { cases, searchQuery, setSearchQuery } = useCases();
```

**State Management Pattern:**
- **Global State**: Cases, search query, loading, error
- **Actions**: `getCase()`, `toggleAction()`, `deleteDocument()`, `addDocument()`, `updateSummaryStatus()`
- **Data Flow**: Unidirectional (top-down)


#### 8. **React Hooks** (Advanced Patterns)

**useState:**
```jsx
const [cases, setCases] = useState([]);
const [loading, setLoading] = useState(true);
```
- Manages component-local state
- Returns `[value, setter]` tuple
- Triggers re-render on state change

**useEffect:**
```jsx
useEffect(() => {
  const fetchCases = async () => {
    const response = await axios.get('http://localhost:5000/api/cases');
    setCases(response.data);
  };
  fetchCases();
}, []); // Empty dependency array = run once on mount
```
- Side effects (data fetching, subscriptions)
- Dependency array controls when effect runs
- Cleanup function for unmounting

**useMemo:**
```jsx
const filteredCases = useMemo(() => {
  let result = cases;
  if (searchQuery) {
    result = result.filter(c => 
      c.candidateName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  return result;
}, [cases, searchQuery]); // Recompute only when dependencies change
```
- Performance optimization
- Memoizes expensive computations
- Prevents unnecessary recalculations

**useContext:**
```jsx
const context = useContext(CaseContext);
```
- Consumes context values
- Alternative to Context.Consumer
- Cleaner syntax for accessing context

#### 9. **ESLint** (Code Quality)

**Configuration (eslint.config.js):**

```javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
  },
]
```

**Plugins:**
- **react-hooks**: Enforces Rules of Hooks
- **react-refresh**: Ensures Fast Refresh compatibility

### Frontend Architecture Patterns

#### Component Structure
```
src/
├── components/        # Reusable UI components
│   ├── StatusBadge.jsx
│   ├── AuditModal.jsx
│   └── document-viewer/
├── pages/            # Route-level components
│   ├── CaseList.jsx
│   ├── CaseSummary.jsx
│   └── DocumentAnalysisPage.jsx
├── layouts/          # Layout wrappers
│   └── DashboardLayout.jsx
├── context/          # Global state management
│   └── CaseContext.jsx
├── constants/        # Static data and configs
│   └── index.js
└── assets/           # Images, fonts, etc.
```

#### Data Flow Pattern

```
1. User Action (e.g., click, input)
   ↓
2. Event Handler in Component
   ↓
3. Context Action (e.g., toggleAction, addDocument)
   ↓
4. State Update (setCases)
   ↓
5. Re-render Components consuming context
   ↓
6. UI Update
```

#### Styling Approach
- **Utility-First**: Tailwind CSS classes directly in JSX
- **Responsive Design**: Mobile-first with breakpoint modifiers (`sm:`, `md:`, `lg:`)
- **Dark Mode Ready**: Slate color palette for professional look
- **Component Variants**: Dynamic classes based on props/state

---

## Server Directory (Backend)

### Overview
Node.js/Express REST API providing authentication, case management, and document processing endpoints.

### Core Technologies

#### 1. **Express 5.1.0** (Web Framework)

**Syntax & Purpose:**
```javascript
const express = require('express');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/cases', authenticateToken, getCases);
app.post('/api/auth/login', login);

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

**Key Concepts:**
- **Middleware**: Functions with access to `req`, `res`, `next`
  - `cors()`: Enable Cross-Origin Resource Sharing
  - `express.json()`: Parse JSON request bodies
  - Custom middleware: `authenticateToken`, `authorizeRole`

- **Routing**: HTTP method + path → handler function
- **Request Object (`req`)**: Contains params, query, body, headers
- **Response Object (`res`)**: Methods like `json()`, `status()`, `send()`
- **Next Function (`next`)**: Pass control to next middleware

**Middleware Chain Example:**
```javascript
router.get('/', 
  authenticateToken,           // 1. Verify JWT token
  authorizeRole(['admin', 'hr']), // 2. Check user role
  getCases                     // 3. Execute controller
);
```

#### 2. **CORS 2.8.5** (Cross-Origin Resource Sharing)

**Syntax & Purpose:**
```javascript
const cors = require('cors');
app.use(cors());
```

**What it does:**
- Adds CORS headers to responses
- Allows frontend (localhost:5173) to call backend (localhost:5000)
- Prevents browser security errors

**Headers Added:**
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
```

#### 3. **JSON Web Tokens (JWT) 9.0.2** (Authentication)

**Syntax & Purpose:**
```javascript
const jwt = require('jsonwebtoken');

// Sign (Create) Token
const token = jwt.sign(
  { id: user.id, email: user.email, role: user.role }, // Payload
  process.env.JWT_SECRET || 'secret',                  // Secret key
  { expiresIn: '1h' }                                  // Options
);

// Verify Token
jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  if (err) return res.status(403).json({ message: 'Invalid token' });
  req.user = decoded; // Attach user data to request
  next();
});
```


**JWT Structure:**
```
header.payload.signature
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBjb21wYW55LmNvbSJ9.signature
```

**Authentication Flow:**
```
1. User sends credentials → POST /api/auth/login
2. Server validates → Creates JWT token
3. Client stores token → localStorage/sessionStorage
4. Client sends token in header → Authorization: Bearer <token>
5. Server verifies token → Grants/denies access
```

#### 4. **Multer 2.0.2** (File Upload)

**Syntax & Purpose:**
```javascript
const multer = require('multer');

// Configure storage
const upload = multer({ 
  storage: multer.memoryStorage() // Store in memory as Buffer
});

// Use as middleware
router.post('/:id/documents', 
  upload.single('file'),  // Expect single file with field name 'file'
  uploadDocument
);

// Access file in controller
const uploadDocument = (req, res) => {
  const file = req.file;
  console.log(file.originalname);  // Original filename
  console.log(file.size);          // File size in bytes
  console.log(file.buffer);        // File content as Buffer
  console.log(file.mimetype);      // MIME type (e.g., 'application/pdf')
};
```

**Storage Options:**
- **memoryStorage()**: Store in RAM (for processing/uploading to cloud)
- **diskStorage()**: Save to disk with custom filename/path

**File Object Properties:**
- `originalname`: User's filename
- `mimetype`: File type (application/pdf, image/jpeg)
- `size`: Bytes
- `buffer`: File content (memoryStorage)
- `path`: File path (diskStorage)


#### 5. **Axios 1.13.2** (HTTP Client - Server Side)

**Syntax & Purpose:**
```javascript
const axios = require('axios');

// POST request to external API
const response = await axios.post(
  `${WATSONX_API_URL}/agents/${agentId}/run`,
  payload,
  {
    headers: {
      'Authorization': `Bearer ${WATSONX_API_KEY}`,
      'Content-Type': 'application/json'
    }
  }
);
```

**Use Case:** Server-to-server communication with IBM Watsonx Orchestrate API

#### 6. **Dotenv 17.2.3** (Environment Variables)

**Syntax & Purpose:**
```javascript
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;
const WATSONX_API_KEY = process.env.WATSONX_API_KEY;
```

**Environment File (.env):**
```env
PORT=5000
JWT_SECRET=your_secret_key_here
WATSONX_API_URL=https://api.watsonx.ibm.com
WATSONX_API_KEY=your_api_key
MILVUS_ADDRESS=localhost:19530
```

**Security:** `.env` file is gitignored, never committed to version control

#### 7. **Milvus SDK 2.6.5** (Vector Database)

**Syntax & Purpose:**
```javascript
const { MilvusClient } = require('@zilliz/milvus2-sdk-node');

const connectMilvus = async () => {
  const client = new MilvusClient({
    address: MILVUS_ADDRESS,      // 'localhost:19530'
    username: MILVUS_USERNAME,
    password: MILVUS_PASSWORD,
  });
  return client;
};
```


**Purpose:**
- **Vector Database**: Store and search document embeddings
- **Semantic Search**: Find similar documents based on meaning
- **AI Integration**: Store embeddings from Watsonx models

**Use Cases:**
- Document similarity search
- Semantic candidate matching
- Knowledge base retrieval

### Backend Architecture Patterns

#### MVC-Like Structure
```
src/
├── config/           # Configuration files
│   └── milvus.js     # Database connection
├── controllers/      # Request handlers (business logic)
│   ├── authController.js
│   └── caseController.js
├── middleware/       # Custom middleware
│   └── auth.js       # JWT authentication
├── routes/           # Route definitions
│   ├── authRoutes.js
│   └── caseRoutes.js
├── services/         # External service integrations
│   └── watsonxService.js
├── data/             # Mock data (MVP)
│   └── mockData.js
├── app.js            # Express app setup
└── server.js         # Server entry point
```

#### Request Flow
```
1. HTTP Request → Express Server
   ↓
2. CORS Middleware → Add headers
   ↓
3. express.json() → Parse JSON body
   ↓
4. Router → Match route
   ↓
5. authenticateToken → Verify JWT
   ↓
6. authorizeRole → Check permissions
   ↓
7. Controller → Business logic
   ↓
8. Service (optional) → External API calls
   ↓
9. Response → JSON data
```


#### API Endpoints

**Authentication Routes:**
```javascript
POST /api/auth/login
  Body: { email, password }
  Response: { token, user }

POST /api/auth/register
  Status: 501 Not Implemented (MVP)
```

**Case Routes:**
```javascript
GET /api/cases
  Headers: Authorization: Bearer <token>
  Permissions: admin, hr
  Response: Array of case objects

GET /api/cases/:id
  Headers: Authorization: Bearer <token>
  Permissions: admin, hr, candidate
  Response: Single case object

POST /api/cases/:id/documents
  Headers: Authorization: Bearer <token>
  Permissions: admin, hr
  Body: multipart/form-data with 'file' field
  Response: { message, document, analysis }
```

#### Authentication Middleware

**authenticateToken:**
```javascript
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN"
  
  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user; // Attach decoded user to request
    next();
  });
};
```

**authorizeRole:**
```javascript
const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }
    next();
  };
};
```


#### Watsonx Service Integration

**triggerOrchestrateAgent Function:**
```javascript
const triggerOrchestrateAgent = async (agentId, payload) => {
  try {
    console.log(`Triggering Watsonx Agent ${agentId} with payload:`, payload);
    
    // Actual API call (commented for MVP)
    // const response = await axios.post(
    //   `${WATSONX_API_URL}/agents/${agentId}/run`,
    //   payload,
    //   {
    //     headers: {
    //       'Authorization': `Bearer ${WATSONX_API_KEY}`,
    //       'Content-Type': 'application/json'
    //     }
    //   }
    // );
    
    // Mock response for development
    return {
      status: 'success',
      message: 'Agent triggered successfully (MOCK)',
      data: {
        analysis: 'Mock analysis result',
        confidence: 0.95
      }
    };
  } catch (error) {
    console.error('Error triggering Watsonx Agent:', error);
    throw error;
  }
};
```

**Usage in Controller:**
```javascript
const uploadDocument = async (req, res) => {
  const file = req.file;
  
  // Trigger AI analysis
  const analysisResult = await triggerOrchestrateAgent('document-analyzer', {
    filename: file.originalname,
    content: file.buffer.toString('base64'),
    caseId: req.params.id
  });
  
  res.json({
    message: 'Document uploaded and analyzed successfully',
    analysis: analysisResult
  });
};
```

---

## Orchestrate-Python Directory

### Overview
Python service for IBM Watsonx Orchestrate SDK integration. Currently minimal implementation with placeholder for future development.


### Core Technologies

#### 1. **Python 3.12+** (Runtime)

**Version Management:**
```
.python-version file contains: 3.12
```

**Purpose:** Specifies Python version for tools like `pyenv`

#### 2. **UV Package Manager** (Modern Python Tooling)

**Project Configuration (pyproject.toml):**
```toml
[project]
name = "orchestrate-python"
version = "0.1.0"
description = "Add your description here"
readme = "README.md"
requires-python = ">=3.12"
dependencies = [
    "ibm-watsonx-orchestrate>=1.15.0",
]
```

**Key Concepts:**
- **pyproject.toml**: Modern Python project metadata (PEP 518)
- **uv.lock**: Lock file for reproducible installs (like package-lock.json)
- **UV**: Fast Rust-based package installer (alternative to pip)

**Commands:**
```bash
uv sync          # Install dependencies
uv add <package> # Add new dependency
uv run main.py   # Run with virtual environment
```

#### 3. **IBM Watsonx Orchestrate SDK 1.15.0**

**Purpose:**
- Official Python SDK for IBM Watsonx Orchestrate
- Agent orchestration and workflow automation
- AI model integration

**Expected Usage Pattern:**
```python
from ibm_watsonx_orchestrate import Client, Authenticator

# Initialize client
authenticator = Authenticator(api_key=API_KEY)
client = Client(authenticator=authenticator, url=ORCHESTRATE_URL)

# Trigger agent
response = client.agents.run(
    agent_id='document-analyzer',
    input_data={'document': document_content}
)
```


#### 4. **Virtual Environment (.venv)**

**Structure:**
```
.venv/
├── Lib/          # Installed packages
├── Scripts/      # Executables (python.exe, pip.exe)
├── pyvenv.cfg    # Configuration
└── .gitignore    # Exclude from git
```

**Purpose:**
- Isolated Python environment
- Project-specific dependencies
- Prevents global package conflicts

**Activation:**
```bash
# Windows
.venv\Scripts\activate

# Unix/Mac
source .venv/bin/activate
```

### Current Implementation

**main.py:**
```python
def main():
    print("Hello from orchestrate-python!")

if __name__ == "__main__":
    main()
```

**Status:** Placeholder implementation. Ready for Watsonx SDK integration.

### Intended Architecture

**Future Implementation Pattern:**
```python
# main.py (proposed)
import os
from ibm_watsonx_orchestrate import Client, Authenticator

class OrchestrateService:
    def __init__(self):
        self.api_key = os.getenv('API_KEY')
        self.url = os.getenv('ORCHESTRATE_URL')
        self.client = self._initialize_client()
    
    def _initialize_client(self):
        auth = Authenticator(api_key=self.api_key)
        return Client(authenticator=auth, url=self.url)
    
    def analyze_document(self, document_data):
        """Analyze HR onboarding document"""
        return self.client.agents.run(
            agent_id='document-analyzer',
            input_data=document_data
        )
    
    def extract_candidate_info(self, document):
        """Extract structured data from document"""
        return self.client.agents.run(
            agent_id='info-extractor',
            input_data={'document': document}
        )
```


---

## Integration Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         User Browser                            │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │              React Frontend (Vite)                        │ │
│  │  - React Router (SPA Navigation)                          │ │
│  │  - Context API (State Management)                         │ │
│  │  - Tailwind CSS (Styling)                                 │ │
│  │  - Axios (HTTP Client)                                    │ │
│  └───────────────────────────────────────────────────────────┘ │
│                            ↓ HTTP/REST                          │
└─────────────────────────────────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│                    Node.js Backend (Express)                    │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │   Routes     │→ │  Middleware  │→ │ Controllers  │        │
│  │              │  │              │  │              │        │
│  │ - Auth       │  │ - CORS       │  │ - Auth       │        │
│  │ - Cases      │  │ - JWT Auth   │  │ - Cases      │        │
│  │ - Documents  │  │ - Multer     │  │ - Documents  │        │
│  └──────────────┘  └──────────────┘  └──────────────┘        │
│                                              ↓                  │
│                                    ┌──────────────┐            │
│                                    │   Services   │            │
│                                    │              │            │
│                                    │ - Watsonx    │            │
│                                    │ - Milvus     │            │
│                                    └──────────────┘            │
└─────────────────────────────────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│              External Services & Databases                      │
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐                   │
│  │  IBM Watsonx     │  │  Milvus Vector   │                   │
│  │  Orchestrate     │  │  Database        │                   │
│  │                  │  │                  │                   │
│  │ - AI Agents      │  │ - Embeddings     │                   │
│  │ - Document       │  │ - Semantic       │                   │
│  │   Analysis       │  │   Search         │                   │
│  └──────────────────┘  └──────────────────┘                   │
│           ↑                                                     │
│  ┌──────────────────┐                                          │
│  │  Python Service  │                                          │
│  │  (orchestrate-   │                                          │
│  │   python)        │                                          │
│  │                  │                                          │
│  │ - Watsonx SDK    │                                          │
│  └──────────────────┘                                          │
└─────────────────────────────────────────────────────────────────┘
```


### Data Flow: Document Upload & Analysis

```
1. User uploads document in React UI
   ↓
2. Frontend sends multipart/form-data POST request
   POST /api/cases/:id/documents
   Headers: Authorization: Bearer <token>
   Body: FormData with file
   ↓
3. Express receives request
   ↓
4. CORS middleware adds headers
   ↓
5. express.json() parses body (skipped for multipart)
   ↓
6. authenticateToken verifies JWT
   ↓
7. authorizeRole checks permissions
   ↓
8. Multer middleware processes file upload
   - Stores file in memory as Buffer
   - Attaches to req.file
   ↓
9. uploadDocument controller executes
   - Extracts file data
   - Converts to base64
   ↓
10. triggerOrchestrateAgent service call
    - Sends to Watsonx API (or Python service)
    - Receives AI analysis
    ↓
11. Response sent back to frontend
    { message, document, analysis }
    ↓
12. React updates UI with analysis results
```

### Authentication Flow

```
┌──────────┐                 ┌──────────┐                 ┌──────────┐
│  Client  │                 │  Server  │                 │   JWT    │
└──────────┘                 └──────────┘                 └──────────┘
     │                            │                            │
     │  POST /api/auth/login      │                            │
     │  { email, password }       │                            │
     │───────────────────────────>│                            │
     │                            │                            │
     │                            │  Validate credentials      │
     │                            │  Generate token            │
     │                            │───────────────────────────>│
     │                            │                            │
     │                            │  Return signed JWT         │
     │                            │<───────────────────────────│
     │  { token, user }           │                            │
     │<───────────────────────────│                            │
     │                            │                            │
     │  Store token in memory     │                            │
     │                            │                            │
     │  GET /api/cases            │                            │
     │  Authorization: Bearer JWT │                            │
     │───────────────────────────>│                            │
     │                            │                            │
     │                            │  Verify token              │
     │                            │───────────────────────────>│
     │                            │                            │
     │                            │  Decoded payload           │
     │                            │<───────────────────────────│
     │                            │                            │
     │  { cases: [...] }          │                            │
     │<───────────────────────────│                            │
```


### State Management Flow

```
┌─────────────────────────────────────────────────────────────┐
│                      CaseProvider                           │
│                                                             │
│  State:                                                     │
│  - cases: Array<Case>                                       │
│  - searchQuery: string                                      │
│  - loading: boolean                                         │
│  - error: Error | null                                      │
│                                                             │
│  Actions:                                                   │
│  - getCase(id)                                              │
│  - toggleAction(caseId, actionId)                           │
│  - deleteDocument(caseId, documentId)                       │
│  - addDocument(caseId, file)                                │
│  - updateSummaryStatus(caseId, summaryId, status, value)    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                          ↓ Context
┌─────────────────────────────────────────────────────────────┐
│                    Child Components                         │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │  CaseList    │  │ CaseSummary  │  │ CaseActions  │    │
│  │              │  │              │  │              │    │
│  │ useCases()   │  │ useCases()   │  │ useCases()   │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Benefits:**
- **Single Source of Truth**: All case data in one place
- **Automatic Re-renders**: Components update when state changes
- **Prop Drilling Avoided**: Direct access via `useCases()` hook
- **Type Safety**: Custom hook enforces provider usage

---

## Technology Stack Summary

### Frontend Stack

| Technology | Version | Purpose | Key Features |
|------------|---------|---------|--------------|
| **React** | 19.2.0 | UI Library | Hooks, Concurrent Mode, Fast Refresh |
| **React Router** | 7.9.6 | Routing | Nested routes, Lazy loading, Navigation |
| **Tailwind CSS** | 4.1.17 | Styling | Utility-first, Responsive, Custom theme |
| **Vite** | 7.2.4 | Build Tool | HMR, Fast builds, ES modules |
| **Axios** | 1.13.2 | HTTP Client | Promise-based, Interceptors, Auto JSON |
| **Lucide React** | 0.554.0 | Icons | Tree-shakeable, Customizable, Modern |
| **ESLint** | 9.39.1 | Linting | Code quality, React rules, Hooks rules |


### Backend Stack

| Technology | Version | Purpose | Key Features |
|------------|---------|---------|--------------|
| **Node.js** | Latest | Runtime | Event-driven, Non-blocking I/O |
| **Express** | 5.1.0 | Web Framework | Middleware, Routing, REST API |
| **JWT** | 9.0.2 | Authentication | Stateless auth, Token-based, Secure |
| **Multer** | 2.0.2 | File Upload | Multipart parsing, Memory/disk storage |
| **CORS** | 2.8.5 | Security | Cross-origin requests, Header management |
| **Axios** | 1.13.2 | HTTP Client | External API calls, Promise-based |
| **Dotenv** | 17.2.3 | Config | Environment variables, Security |
| **Milvus SDK** | 2.6.5 | Vector DB | Embeddings, Semantic search, AI integration |

### Python Stack

| Technology | Version | Purpose | Key Features |
|------------|---------|---------|--------------|
| **Python** | 3.12+ | Runtime | Modern syntax, Type hints, Performance |
| **UV** | Latest | Package Manager | Fast installs, Lock files, Modern tooling |
| **Watsonx SDK** | 1.15.0 | AI Integration | Agent orchestration, IBM AI services |

### Development Tools

| Tool | Purpose |
|------|---------|
| **Git** | Version control |
| **GitHub Pages** | Frontend deployment |
| **gh-pages** | Automated deployment |
| **ESLint** | Code quality |
| **Vite DevServer** | Development server with HMR |

### External Services

| Service | Purpose | Integration |
|---------|---------|-------------|
| **IBM Watsonx Orchestrate** | AI agents, Document analysis | REST API / Python SDK |
| **Milvus** | Vector database, Semantic search | Node.js SDK |

---

## Key Architectural Decisions

### 1. **Separation of Concerns**
- **Frontend**: Pure UI/UX, no business logic
- **Backend**: API layer, authentication, orchestration
- **Python Service**: AI/ML integration, Watsonx SDK

### 2. **Authentication Strategy**
- **JWT-based**: Stateless, scalable
- **Role-based Access Control (RBAC)**: admin, hr, candidate roles
- **Middleware Pattern**: Reusable auth logic


### 3. **State Management**
- **Context API**: Sufficient for MVP scope
- **No Redux**: Avoids complexity for small app
- **Custom Hooks**: Clean API for components

### 4. **Styling Approach**
- **Tailwind CSS**: Rapid development, consistent design
- **Utility-first**: No CSS files to manage
- **Custom Theme**: Brand colors via CSS variables

### 5. **File Upload Strategy**
- **Memory Storage**: Files processed in-memory
- **Base64 Encoding**: For API transmission
- **Future**: S3/Cloud storage for production

### 6. **API Design**
- **RESTful**: Standard HTTP methods
- **JSON**: Request/response format
- **Versioning**: `/api/` prefix for future versions

### 7. **Error Handling**
- **HTTP Status Codes**: 200, 401, 403, 404, 500
- **Consistent Format**: `{ message: "..." }`
- **Try-Catch**: Async error handling

### 8. **Development Workflow**
- **Mock Data**: Rapid frontend development
- **Environment Variables**: Configuration management
- **Hot Reload**: Vite HMR for instant feedback

---

## Code Examples & Patterns

### React Component Pattern

```jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCases } from '../context/CaseContext';

const CaseList = () => {
  // Hooks at top
  const { cases, searchQuery } = useCases();
  const navigate = useNavigate();
  const [filterActive, setFilterActive] = useState(false);
  
  // Computed values
  const filteredCases = cases.filter(c => 
    c.candidateName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Event handlers
  const handleCaseClick = (id) => {
    navigate(`/cases/${id}`);
  };
  
  // Render
  return (
    <div className="space-y-6">
      {filteredCases.map(c => (
        <div key={c.id} onClick={() => handleCaseClick(c.id)}>
          {c.candidateName}
        </div>
      ))}
    </div>
  );
};

export default CaseList;
```


### Express Route Pattern

```javascript
// routes/caseRoutes.js
const express = require('express');
const router = express.Router();
const { getCases, getCaseById, uploadDocument, upload } = require('../controllers/caseController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

// GET all cases - requires authentication and hr/admin role
router.get('/', 
  authenticateToken, 
  authorizeRole(['admin', 'hr']), 
  getCases
);

// GET single case - requires authentication
router.get('/:id', 
  authenticateToken, 
  authorizeRole(['admin', 'hr', 'candidate']), 
  getCaseById
);

// POST document upload - requires authentication, file upload, and hr/admin role
router.post('/:id/documents', 
  authenticateToken, 
  authorizeRole(['admin', 'hr']), 
  upload.single('file'), 
  uploadDocument
);

module.exports = router;
```

### Controller Pattern

```javascript
// controllers/caseController.js
const { cases } = require('../data/mockData');
const { triggerOrchestrateAgent } = require('../services/watsonxService');

const getCases = (req, res) => {
  // Simple: return all cases
  res.json(cases);
};

const getCaseById = (req, res) => {
  // Extract param, find case, handle not found
  const caseItem = cases.find(c => c.id === req.params.id);
  if (!caseItem) {
    return res.status(404).json({ message: 'Case not found' });
  }
  res.json(caseItem);
};

const uploadDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.file;
    
    // Validation
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    // Business logic: trigger AI analysis
    const analysisResult = await triggerOrchestrateAgent('document-analyzer', {
      filename: file.originalname,
      content: file.buffer.toString('base64'),
      caseId: id
    });
    
    // Success response
    res.json({
      message: 'Document uploaded and analyzed successfully',
      document: {
        name: file.originalname,
        size: file.size,
        uploadedAt: new Date().toISOString()
      },
      analysis: analysisResult
    });
  } catch (error) {
    // Error handling
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Failed to process document' });
  }
};

module.exports = { getCases, getCaseById, uploadDocument };
```


### Context Provider Pattern

```jsx
// context/CaseContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// 1. Create Context
const CaseContext = createContext(undefined);

// 2. Provider Component
export const CaseProvider = ({ children }) => {
  // State
  const [cases, setCases] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Effects
  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cases', {
          headers: { 'x-role': 'hr-manager' }
        });
        setCases(response.data);
      } catch (err) {
        console.error("Failed to fetch cases:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCases();
  }, []);
  
  // Actions
  const getCase = (id) => cases.find(c => c.id === id);
  
  const toggleAction = (caseId, actionId) => {
    setCases(prev => prev.map(c => {
      if (c.id !== caseId) return c;
      const updatedActions = c.actions.map(a =>
        a.id === actionId ? { ...a, completed: !a.completed } : a
      );
      return { ...c, actions: updatedActions };
    }));
  };
  
  // 3. Provide value
  return (
    <CaseContext.Provider value={{
      cases,
      searchQuery,
      setSearchQuery,
      getCase,
      toggleAction,
      loading
    }}>
      {children}
    </CaseContext.Provider>
  );
};

// 4. Custom Hook
export const useCases = () => {
  const context = useContext(CaseContext);
  if (!context) {
    throw new Error('useCases must be used within a CaseProvider');
  }
  return context;
};
```

### Tailwind Responsive Design Pattern

```jsx
<div className="
  flex flex-col          /* Mobile: stack vertically */
  sm:flex-row            /* Small screens+: horizontal */
  gap-4                  /* Consistent spacing */
  p-4 sm:p-6 lg:p-8      /* Responsive padding */
">
  <div className="
    w-full                /* Mobile: full width */
    sm:w-1/2              /* Small screens: half width */
    lg:w-1/3              /* Large screens: third width */
  ">
    Content
  </div>
</div>
```

**Breakpoints:**
- `sm:` 640px
- `md:` 768px
- `lg:` 1024px
- `xl:` 1280px
- `2xl:` 1536px


---

## Security Considerations

### 1. **Authentication**
- JWT tokens with expiration (1 hour)
- Secure secret key (environment variable)
- Token verification on protected routes

### 2. **Authorization**
- Role-based access control
- Middleware checks user permissions
- Principle of least privilege

### 3. **CORS**
- Configured for specific origins (production)
- Prevents unauthorized cross-origin requests

### 4. **Environment Variables**
- Sensitive data in .env files
- Never committed to version control
- Different configs for dev/prod

### 5. **Input Validation**
- File type checking (future enhancement)
- File size limits (future enhancement)
- SQL injection prevention (when DB added)

### 6. **Error Handling**
- Generic error messages to clients
- Detailed logs server-side only
- No stack traces in production

---

## Performance Optimizations

### Frontend

1. **React.memo**: Prevent unnecessary re-renders
2. **useMemo**: Cache expensive computations
3. **Code Splitting**: Lazy load routes
4. **Vite Optimization**: Fast HMR, optimized builds
5. **Tailwind Purging**: Remove unused CSS

### Backend

1. **Async/Await**: Non-blocking operations
2. **Connection Pooling**: Database connections (future)
3. **Caching**: Redis for frequent queries (future)
4. **Compression**: Gzip responses (future)
5. **Rate Limiting**: Prevent abuse (future)

---

## Deployment Architecture

### Frontend Deployment (GitHub Pages)

```bash
# Build process
npm run build
  ↓
Vite builds optimized production bundle
  ↓
Output to dist/ directory
  ↓
gh-pages deploys dist/ to GitHub Pages
  ↓
Accessible at: https://TentacioPro.github.io/OnboardFlow
```

**Configuration:**
```json
{
  "homepage": "https://TentacioPro.github.io/OnboardFlow",
  "base": "/OnboardFlow/"
}
```


### Backend Deployment (Recommended)

**Options:**
1. **Heroku**: Simple deployment, free tier
2. **AWS EC2**: Full control, scalable
3. **DigitalOcean**: Cost-effective, easy setup
4. **IBM Cloud**: Integration with Watsonx

**Environment Variables Required:**
```env
PORT=5000
JWT_SECRET=<secure_random_string>
WATSONX_API_URL=<ibm_watsonx_url>
WATSONX_API_KEY=<your_api_key>
MILVUS_ADDRESS=<milvus_host:port>
MILVUS_USERNAME=<username>
MILVUS_PASSWORD=<password>
```

### Python Service Deployment

**Options:**
1. **Docker Container**: Isolated environment
2. **AWS Lambda**: Serverless, event-driven
3. **IBM Cloud Functions**: Native Watsonx integration

---

## Future Enhancements

### Short-term (MVP+)

1. **Database Integration**
   - PostgreSQL for relational data
   - Milvus for vector embeddings
   - Replace mock data

2. **Real Watsonx Integration**
   - Complete Python service implementation
   - Document analysis agents
   - Candidate matching algorithms

3. **File Storage**
   - AWS S3 or IBM Cloud Object Storage
   - Secure document storage
   - Pre-signed URLs for access

4. **Enhanced Authentication**
   - Refresh tokens
   - Password reset flow
   - OAuth integration

### Long-term

1. **Real-time Updates**
   - WebSocket integration
   - Live notifications
   - Collaborative editing

2. **Advanced Analytics**
   - Dashboard metrics
   - Reporting tools
   - Predictive analytics

3. **Mobile App**
   - React Native
   - Native iOS/Android
   - Offline support

4. **Internationalization**
   - Multi-language support
   - Localization
   - Regional compliance

---

## Development Setup

### Prerequisites

```bash
# Node.js (v18+)
node --version

# Python (3.12+)
python --version

# UV (Python package manager)
uv --version

# Git
git --version
```


### Installation Steps

**1. Clone Repository**
```bash
git clone <repository-url>
cd <project-directory>
```

**2. Setup Client**
```bash
cd client
npm install
npm run dev
# Runs on http://localhost:5173
```

**3. Setup Server**
```bash
cd server
npm install
# Create .env file with required variables
node src/server.js
# Runs on http://localhost:5000
```

**4. Setup Python Service**
```bash
cd orchestrate-python
uv sync
uv run main.py
```

### Environment Configuration

**client/.env (optional):**
```env
VITE_API_URL=http://localhost:5000
```

**server/.env:**
```env
PORT=5000
JWT_SECRET=your_secret_key_here
WATSONX_API_URL=https://api.watsonx.ibm.com
WATSONX_API_KEY=your_api_key
MILVUS_ADDRESS=localhost:19530
MILVUS_USERNAME=username
MILVUS_PASSWORD=password
```

**orchestrate-python/.env.local:**
```env
API_KEY=your_watsonx_api_key
ORCHESTRATE_URL=https://api.watsonx.ibm.com
ADK_MOCK=1
```

---

## Testing Strategy

### Frontend Testing (Future)

**Tools:**
- **Vitest**: Unit testing
- **React Testing Library**: Component testing
- **Playwright**: E2E testing

**Example:**
```javascript
import { render, screen } from '@testing-library/react';
import CaseList from './CaseList';

test('renders case list', () => {
  render(<CaseList />);
  expect(screen.getByText('Active Onboarding Cases')).toBeInTheDocument();
});
```

### Backend Testing (Future)

**Tools:**
- **Jest**: Unit testing
- **Supertest**: API testing

**Example:**
```javascript
const request = require('supertest');
const app = require('./app');

describe('GET /api/cases', () => {
  it('returns 401 without token', async () => {
    const res = await request(app).get('/api/cases');
    expect(res.statusCode).toBe(401);
  });
});
```


---

## Troubleshooting Guide

### Common Issues

**1. CORS Errors**
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:** Ensure CORS is enabled in server and correct origin is allowed

**2. JWT Token Errors**
```
Invalid or expired token
```
**Solution:** Check token expiration, verify JWT_SECRET matches

**3. File Upload Fails**
```
No file uploaded
```
**Solution:** Ensure Content-Type is multipart/form-data, field name is 'file'

**4. Vite Build Errors**
```
Module not found
```
**Solution:** Run `npm install`, check import paths

**5. Python Import Errors**
```
ModuleNotFoundError: No module named 'ibm_watsonx_orchestrate'
```
**Solution:** Run `uv sync` to install dependencies

---

## API Reference

### Authentication Endpoints

#### POST /api/auth/login
**Description:** Authenticate user and receive JWT token

**Request:**
```json
{
  "email": "admin@company.com",
  "password": "password"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@company.com",
    "role": "admin",
    "name": "Admin User"
  }
}
```

**Response (401):**
```json
{
  "message": "Invalid credentials"
}
```

### Case Endpoints

#### GET /api/cases
**Description:** Get all onboarding cases

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
[
  {
    "id": "c-101",
    "candidateName": "Alice Johnson",
    "role": "Senior Backend Engineer",
    "department": "Engineering",
    "startDate": "2023-11-15",
    "status": "Ready",
    "readinessScore": 95,
    "documents": [...],
    "summary": [...],
    "actions": [...]
  }
]
```


#### GET /api/cases/:id
**Description:** Get single case by ID

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "id": "c-101",
  "candidateName": "Alice Johnson",
  "role": "Senior Backend Engineer",
  ...
}
```

**Response (404):**
```json
{
  "message": "Case not found"
}
```

#### POST /api/cases/:id/documents
**Description:** Upload document for case

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Body:**
```
file: <binary data>
```

**Response (200):**
```json
{
  "message": "Document uploaded and analyzed successfully",
  "document": {
    "name": "offer_letter.pdf",
    "size": 1234567,
    "uploadedAt": "2023-11-23T10:30:00.000Z"
  },
  "analysis": {
    "status": "success",
    "data": {
      "analysis": "Mock analysis result",
      "confidence": 0.95
    }
  }
}
```

---

## Data Models

### Case Model

```typescript
interface Case {
  id: string;                    // Unique identifier
  candidateName: string;         // Full name
  role: string;                  // Job title
  department: string;            // Department name
  startDate: string;             // ISO date string
  status: 'Ready' | 'Processing' | 'Action Required';
  readinessScore: number;        // 0-100
  avatarUrl: string;             // Profile image URL
  documents: Document[];         // Array of documents
  summary: SummaryItem[];        // Employment summary
  actions: Action[];             // Onboarding actions
  auditLogs?: AuditLog[];        // Optional audit trail
}
```

### Document Model

```typescript
interface Document {
  id: string;                    // Unique identifier
  name: string;                  // Filename
  size: string;                  // Human-readable size
  uploadDate: string;            // ISO date string
  type: string;                  // MIME type
}
```

### Summary Item Model

```typescript
interface SummaryItem {
  id: string;                    // Unique identifier
  field: string;                 // Field name (e.g., 'Salary')
  value: string;                 // Field value
  status: 'accepted' | 'pending' | 'rejected';
}
```

### Action Model

```typescript
interface Action {
  id: string;                    // Unique identifier
  text: string;                  // Action description
  completed: boolean;            // Completion status
}
```

### User Model

```typescript
interface User {
  id: number;                    // Unique identifier
  email: string;                 // Email address
  password: string;              // Hashed password (server only)
  role: 'admin' | 'hr' | 'candidate';
  name: string;                  // Full name
}
```


---

## Glossary

### Frontend Terms

- **SPA (Single Page Application)**: Web app that loads once and dynamically updates
- **HMR (Hot Module Replacement)**: Update modules without full page reload
- **JSX**: JavaScript XML syntax for React components
- **Hook**: React function for state/lifecycle in functional components
- **Context**: React pattern for global state management
- **Utility-first CSS**: Styling approach using small, single-purpose classes

### Backend Terms

- **REST (Representational State Transfer)**: Architectural style for APIs
- **Middleware**: Function that processes requests before reaching route handler
- **JWT (JSON Web Token)**: Compact token format for authentication
- **CORS (Cross-Origin Resource Sharing)**: Security mechanism for cross-domain requests
- **Multipart/form-data**: Encoding type for file uploads
- **Base64**: Binary-to-text encoding scheme

### AI/ML Terms

- **Vector Database**: Database optimized for similarity search on embeddings
- **Embedding**: Numerical representation of data (text, images)
- **Semantic Search**: Search based on meaning rather than keywords
- **Agent**: AI system that performs tasks autonomously
- **Orchestration**: Coordination of multiple AI services/agents

### Development Terms

- **MVP (Minimum Viable Product)**: Basic version with core features
- **Mock Data**: Fake data for development/testing
- **Environment Variable**: Configuration value stored outside code
- **Dependency**: External package/library required by project
- **Build Tool**: Software that compiles/bundles source code

---

## Conclusion

This technical architecture report provides a comprehensive overview of the AI-Powered HR Onboarding Document Assistant built for the IBM Watsonx Orchestrate LabLabAI Hackathon. The system demonstrates modern full-stack development practices with:

### Key Strengths

1. **Modern Tech Stack**: Latest versions of React, Express, and Python tools
2. **Clean Architecture**: Separation of concerns, modular design
3. **Scalable Foundation**: Ready for database, cloud storage, and production deployment
4. **Security-First**: JWT authentication, RBAC, environment variables
5. **Developer Experience**: Fast builds, HMR, clear code structure
6. **AI-Ready**: Integration points for IBM Watsonx Orchestrate

### Current Status

- **Frontend**: Fully functional React SPA with routing, state management, and UI
- **Backend**: REST API with authentication, file upload, and mock data
- **Python Service**: Skeleton implementation ready for Watsonx SDK integration
- **Deployment**: Frontend deployable to GitHub Pages

### Next Steps

1. Complete Watsonx Orchestrate integration
2. Implement database layer (PostgreSQL + Milvus)
3. Add cloud storage for documents
4. Deploy backend to production
5. Implement real-time features
6. Add comprehensive testing

---

**Document Version:** 1.0  
**Last Updated:** November 23, 2025  
**Author:** Technical Architecture Team  
**Project:** OnboardFlow - AI-Powered HR Onboarding Assistant
