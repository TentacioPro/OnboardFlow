export const INITIAL_DATA = [
  {
    id: 'c-101',
    candidateName: 'Alice Johnson',
    role: 'Senior Backend Engineer',
    department: 'Engineering',
    startDate: '2023-11-15',
    status: 'Ready',
    readinessScore: 95,
    avatarUrl: 'https://picsum.photos/id/64/200/200',
    documents: [
      { id: 'd1', name: 'Offer_Letter_Signed.pdf', size: '1.2MB', uploadDate: '2023-10-20', type: 'application/pdf' },
      { id: 'd2', name: 'ID_Passport.jpg', size: '2.4MB', uploadDate: '2023-10-21', type: 'image/jpeg' },
      { id: 'd3', name: 'NDA_Signed.pdf', size: '0.8MB', uploadDate: '2023-10-22', type: 'application/pdf' },
    ],
    summary: [
      { id: 's1', field: 'Salary', value: '$160,000', status: 'accepted' },
      { id: 's2', field: 'Relocation', value: 'Yes (Tier 2)', status: 'accepted' },
      { id: 's3', field: 'Visa Status', value: 'H1B Transfer Required', status: 'pending' },
    ],
    actions: [
      { id: 'a1', text: 'Order MacBook Pro M3', completed: true },
      { id: 'a2', text: 'Create AWS IAM User', completed: true },
      { id: 'a3', text: 'Schedule Team Lunch', completed: true },
      { id: 'a4', text: 'Assign Onboarding Buddy', completed: false },
    ],
    auditLogs: [
      { id: 'l1', timestamp: '2023-11-01 09:00:00', user: 'System', action: 'Case Created', field: '-', oldValue: '-', newValue: '-', source: 'Automated' },
      { id: 'l2', timestamp: '2023-11-01 09:05:00', user: 'System', action: 'Document Uploaded', field: 'Documents', oldValue: '-', newValue: 'Offer_Letter_Signed.pdf', source: 'Portal' },
      { id: 'l3', timestamp: '2023-11-01 09:10:00', user: 'AI Agent', action: 'Data Extracted', field: 'Salary', oldValue: '-', newValue: '$160,000', source: 'Watsonx' },
      { id: 'l4', timestamp: '2023-11-01 10:30:00', user: 'HR Manager', action: 'Verified', field: 'Salary', oldValue: 'Pending', newValue: 'Accepted', source: 'Dashboard' },
    ],
  },
  {
    id: 'c-102',
    candidateName: 'Robert Smith',
    role: 'Account Executive',
    department: 'Sales',
    startDate: '2023-11-20',
    status: 'Action Required',
    readinessScore: 45,
    avatarUrl: 'https://picsum.photos/id/91/200/200',
    documents: [
      { id: 'd4', name: 'Resume_Final.pdf', size: '0.5MB', uploadDate: '2023-10-25', type: 'application/pdf' },
    ],
    summary: [
      { id: 's4', field: 'Commission Rate', value: '15%', status: 'pending' },
      { id: 's5', field: 'Territory', value: 'North East', status: 'pending' },
    ],
    actions: [
      { id: 'a5', text: 'Configure Salesforce Account', completed: false },
      { id: 'a6', text: 'Order Corporate Phone', completed: false },
      { id: 'a7', text: 'Book Sales Training', completed: false },
    ],
  },
  {
    id: 'c-103',
    candidateName: 'Elena Rodriguez',
    role: 'Product Designer',
    department: 'Product',
    startDate: '2023-12-01',
    status: 'Processing',
    readinessScore: 70,
    avatarUrl: 'https://picsum.photos/id/129/200/200',
    documents: [
      { id: 'd5', name: 'Portfolio_Link.pdf', size: '0.1MB', uploadDate: '2023-10-28', type: 'application/pdf' },
      { id: 'd6', name: 'Offer_Letter.pdf', size: '1.2MB', uploadDate: '2023-10-29', type: 'application/pdf' },
    ],
    summary: [
      { id: 's6', field: 'Equipment', value: 'Standard Design Setup', status: 'accepted' },
      { id: 's7', field: 'Start Date', value: '2023-12-01', status: 'accepted' },
    ],
    actions: [
      { id: 'a8', text: 'Install Figma Enterprise', completed: true },
      { id: 'a9', text: 'Grant Jira Access', completed: true },
      { id: 'a10', text: 'Welcome Email', completed: false },
    ],
  },
];
