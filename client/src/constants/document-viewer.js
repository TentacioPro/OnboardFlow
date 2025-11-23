export const MOCK_DOCUMENTS = [
  {
    id: 'doc-1',
    name: 'Contract.pdf',
    type: 'pdf',
    status: 'verified',
    pageCount: 5,
    pages: [
      {
        pageNumber: 1,
        content: [
          "EMPLOYMENT AGREEMENT",
          "This Employment Agreement (the 'Agreement') is made and entered into as of January 2, 2025,",
          "by and between TechCorp Solutions Inc. (the 'Company') and John Smith (the 'Employee').",
          "",
          "1. POSITION AND DUTIES",
          "The Company agrees to employ the Employee as Senior Software Engineer.",
          "The Employee agrees to perform such duties as are customarily performed by one holding such position.",
          "",
          "2. TERM",
          "The Employee's employment with the Company shall commence on January 15, 2025 (the 'Start Date').",
          "This employment is at-will and may be terminated by either party."
        ]
      },
      {
        pageNumber: 2,
        content: [
          "3. COMPENSATION",
          "Base Salary: The Company shall pay the Employee a base salary of $160,000 per annum.",
          "Probation Period: The first 6 months of employment shall constitute a probationary period.",
          "",
          "4. BENEFITS",
          "The Employee shall be entitled to participate in all benefit plans generally available.",
          "Vacation: The Employee is entitled to 25 days of paid time off per year.",
          "",
          "5. LOCATION",
          "The primary work location shall be the Company's London Headquarters.",
          "Remote work is permitted up to 2 days per week."
        ]
      },
      {
        pageNumber: 3,
        content: [
          "6. CONFIDENTIALITY",
          "The Employee agrees to sign the Company's standard Non-Disclosure Agreement.",
          "",
          "7. EQUIPMENT",
          "The Company will provide a MacBook Pro 16 and necessary peripherals.",
          "A corporate email account (john.smith@techcorp.com) will be provisioned."
        ]
      },
      {
        pageNumber: 4,
        content: [
          "8. NOTICE PERIOD",
          "Either party may terminate this Agreement with 30 days written notice.",
          "",
          "9. GOVERNING LAW",
          "This Agreement shall be governed by the laws of the United Kingdom."
        ]
      },
       {
        pageNumber: 5,
        content: [
          "IN WITNESS WHEREOF, the parties have executed this Agreement.",
          "",
          "Signed: ____________________",
          "        Company Representative",
          "",
          "Signed: ____________________",
          "        John Smith"
        ]
      }
    ]
  },
  {
    id: 'doc-2',
    name: 'CV.docx',
    type: 'docx',
    status: 'verified',
    pageCount: 2,
    pages: []
  },
  {
    id: 'doc-3',
    name: 'ID_Scan.pdf',
    type: 'pdf',
    status: 'warning',
    pageCount: 1,
    pages: []
  }
];

export const MOCK_EXTRACTIONS = [
  {
    id: 'field-name',
    label: 'Full Name',
    value: 'John Smith',
    confidence: 92,
    level: 'high',
    source: { page: 1, rect: { x: 55, y: 12, w: 20, h: 2 } },
    isVerified: false,
    section: 'summary'
  },
  {
    id: 'field-title',
    label: 'Job Title',
    value: 'Senior Software Engineer',
    confidence: 88,
    level: 'high',
    source: { page: 1, rect: { x: 45, y: 25, w: 40, h: 2 } },
    isVerified: false,
    section: 'summary'
  },
  {
    id: 'field-start',
    label: 'Start Date',
    value: '15 January 2025',
    confidence: 74,
    level: 'medium',
    source: { page: 1, rect: { x: 65, y: 40, w: 25, h: 2 } },
    isVerified: false,
    section: 'summary'
  },
  {
    id: 'field-probation',
    label: 'Probation Period',
    value: '6 months',
    confidence: 95,
    level: 'high',
    source: { page: 2, rect: { x: 30, y: 15, w: 15, h: 2 } },
    isVerified: false,
    section: 'summary'
  },
  {
    id: 'field-notice',
    label: 'Notice Period',
    value: '30 days',
    confidence: 91,
    level: 'high',
    source: { page: 4, rect: { x: 50, y: 12, w: 15, h: 2 } },
    isVerified: false,
    section: 'summary'
  },
  {
    id: 'field-location',
    label: 'Work Location',
    value: '',
    confidence: 0,
    level: 'missing',
    isVerified: false,
    section: 'summary'
  }
];

export const MOCK_CHECKLIST = [
  { id: 'item-1', label: 'Laptop Computer', description: 'MacBook Pro 16" (detected)', status: 'ordered', confidence: 85, sourcePage: 3 },
  { id: 'item-2', label: 'Email Account', description: 'john.smith@techcorp.com', status: 'provisioned', confidence: 92, sourcePage: 3 },
  { id: 'item-3', label: 'Building Access', description: 'Office access required', status: 'pending', confidence: 78, sourcePage: 2 },
  { id: 'item-4', label: 'VPN Access', description: 'Remote work capability', status: 'pending', confidence: 45, sourcePage: 2 }
];

export const MOCK_COMPLIANCE = [
  { id: 'comp-1', title: 'Signed NDA', priority: 'high', status: 'missing', description: 'Required for all employees handling confidential data.' },
  { id: 'comp-2', title: 'Right to Work Check', priority: 'high', status: 'resolved', description: 'Passport scan verified.' },
  { id: 'comp-3', title: 'Bank Details', priority: 'medium', status: 'attention', description: 'Form detected but account number unclear.' }
];

export const MOCK_TASKS = [
  { id: 't1', text: 'Send welcome email package', completed: false, timeEstimate: '5m', category: 'pre-boarding' },
  { id: 't2', text: 'Confirm equipment order with IT', completed: true, timeEstimate: '10m', category: 'pre-boarding' },
  { id: 't3', text: 'Manager welcome meeting', completed: false, timeEstimate: '1h', category: 'day-1' },
  { id: 't4', text: 'HR orientation', completed: false, timeEstimate: '2h', category: 'day-1' }
];

export const TAGS = ['Full-time', 'Engineering', 'UK', 'Remote', 'Immediate'];
