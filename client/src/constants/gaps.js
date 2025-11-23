export const MOCK_GAPS = [
  { 
    id: 'g1', 
    priority: 'High', 
    title: 'Signed Non-Disclosure Agreement', 
    description: 'Required for all employees with access to confidential information. Must be signed before first day. Legal Risk: High.', 
    status: 'Open', 
    dueDate: '2025-01-12', 
    assignedTo: 'HR Admin' 
  },
  { 
    id: 'g2', 
    priority: 'High', 
    title: 'Work Location Verification', 
    description: 'Employment contract does not specify a primary work location. Tax compliance risk.', 
    status: 'Open', 
    dueDate: '2025-01-10', 
    assignedTo: 'Legal Dept' 
  },
   { 
    id: 'g3', 
    priority: 'Medium', 
    title: 'Emergency Contact Details', 
    description: 'Missing from initial data collection form.', 
    status: 'Open', 
    dueDate: '2025-01-15', 
    assignedTo: 'HR Admin' 
  }
];

export const MOCK_LOGS = [
  { id: 'l1', timestamp: '22/11/2025 14:15:00', user: 'System', action: 'Case Created', field: '-', oldValue: '-', newValue: 'Active', source: 'System' }
];
