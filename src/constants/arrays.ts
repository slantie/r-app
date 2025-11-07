export const  territories = [
    {
        "_id": "685e8383f60f15fb7e0742eb",
        "title": "Ognaj",
        "status": "ACTIVE",
        "isDeleted": false,
        "createdAt": "2025-06-27T11:41:55.952Z",
        "updatedAt": "2025-06-27T11:41:55.952Z",
        "__v": 0
    },
    {
        "_id": "685e8379f60f15fb7e0742e8",
        "title": "Shilaj",
        "status": "ACTIVE",
        "isDeleted": false,
        "createdAt": "2025-06-27T11:41:45.752Z",
        "updatedAt": "2025-06-27T11:41:45.752Z",
        "__v": 0
    },
    {
        "_id": "685e8372f60f15fb7e0742e5",
        "title": "Satellite",
        "status": "ACTIVE",
        "isDeleted": false,
        "createdAt": "2025-06-27T11:41:38.392Z",
        "updatedAt": "2025-06-27T11:41:38.392Z",
        "__v": 0
    },
    {
        "_id": "685e8367f60f15fb7e0742e2",
        "title": "Bodakdev",
        "status": "ACTIVE",
        "isDeleted": false,
        "createdAt": "2025-06-27T11:41:27.103Z",
        "updatedAt": "2025-06-27T11:41:27.103Z",
        "__v": 0
    },
    {
        "_id": "685e835cf60f15fb7e0742df",
        "title": "Panjrapole",
        "status": "ACTIVE",
        "isDeleted": false,
        "createdAt": "2025-06-27T11:41:16.469Z",
        "updatedAt": "2025-06-27T11:41:16.469Z",
        "__v": 0
    },
    {
        "_id": "685e8343f60f15fb7e0742dc",
        "title": "Gift City",
        "status": "ACTIVE",
        "isDeleted": false,
        "createdAt": "2025-06-27T11:40:51.477Z",
        "updatedAt": "2025-06-27T11:40:51.477Z",
        "__v": 0
    },
    {
        "_id": "685e8335f60f15fb7e0742d9",
        "title": "Ambli",
        "status": "ACTIVE",
        "isDeleted": false,
        "createdAt": "2025-06-27T11:40:37.036Z",
        "updatedAt": "2025-06-27T11:40:37.036Z",
        "__v": 0
    },
    {
        "_id": "685e8287f60f15fb7e0742d6",
        "title": "Vaishno Devi",
        "status": "ACTIVE",
        "isDeleted": false,
        "createdAt": "2025-06-27T11:37:43.650Z",
        "updatedAt": "2025-06-27T11:37:43.650Z",
        "__v": 0
    },
    {
        "_id": "685e81dcf60f15fb7e0742d3",
        "title": "Shela",
        "status": "ACTIVE",
        "isDeleted": false,
        "createdAt": "2025-06-27T11:34:52.707Z",
        "updatedAt": "2025-06-27T11:34:52.707Z",
        "__v": 0
    }
]

 const BLOOD_GROUPS = [
  { label: "A+", value: "A+" },
  { label: "A-", value: "A-" },
  { label: "B+", value: "B+" },
  { label: "B-", value: "B-" },
  { label: "AB+", value: "AB+" },
  { label: "AB-", value: "AB-" },
  { label: "O+", value: "O+" },
  { label: "O-", value: "O-" },
];

const SOURCE_OPTIONS = [
  { label: 'Event', value: 'Event' },
  { label: 'Digital', value: 'Digital' },
  { label: 'Walkin', value: 'Walkin' },
  { label: 'Print Media', value: 'Print Media' },
  { label: 'Channel Sales', value: 'Channel Sales' },
];

const SUB_SOURCE_MAP: Record<string, Array<{ label: string; value: string }>> = {
  Event: [
      { label: 'GIHED', value: 'GIHED' },
      { label: 'Property Event', value: 'Property Event' },
      { label: 'Investor Meet', value: 'Investor Meet' },
      { label: 'Channel Partner Event', value: 'Channel Partner Event' },
  ],
  Digital: [
      { label: 'Website', value: 'Website' },
      { label: 'Facebook', value: 'Facebook' },
      { label: 'Instagram', value: 'Instagram' },
      { label: 'Linkedin', value: 'Linkedin' },
      { label: 'SMS', value: 'SMS' },
      { label: 'Youtube', value: 'Youtube' },
      { label: 'IVRS', value: 'IVRS' },
      { label: 'Google', value: 'Google' },
      { label: 'Email', value: 'Email' },
      { label: 'Whatsapp', value: 'Whatsapp' },
  ],
  Walkin: [
      { label: 'Website', value: 'Website' },
      { label: 'Facebook', value: 'Facebook' },
      { label: 'Instagram', value: 'Instagram' },
      { label: 'Linkedin', value: 'Linkedin' },
      { label: 'SMS', value: 'SMS' },
      { label: 'Youtube', value: 'Youtube' },
      { label: 'IVRS', value: 'IVRS' },
      { label: 'Google', value: 'Google' },
      { label: 'Email', value: 'Email' },
      { label: 'Whatsapp', value: 'Whatsapp' },
      { label: 'Direct-Walkin', value: 'Direct-Walkin' },
  ],
  'Print Media': [
      { label: 'News Paper', value: 'News Paper' },
      { label: 'Hoardings', value: 'Hoardings' },
      { label: 'Leaflets', value: 'Leaflets' },
  ],
  'Channel Sales': [
      { label: 'Channel Partner', value: 'Channel Partner' },
      { label: 'ACP', value: 'ACP' },
  ],
};

const PRIORITY_OPTIONS = [
  { label: 'Hot', value: 'Hot' },
  { label: 'Cold', value: 'Cold' },
  { label: 'Warm', value: 'Warm' },
];

const BUDGET_OPTIONS = [
  { label: 'Below 50 Lakh', value: 'Below 50 Lakh' },
  { label: '50 Lakh to 1 Cr', value: '50 Lakh to 1 Cr' },
  { label: '1 Cr to 2 Cr', value: '1 Cr to 2 Cr' },
  { label: '2 Cr to 5 Cr', value: '2 Cr to 5 Cr' },
  { label: '5 Cr to 10 Cr', value: '5 Cr to 10 Cr' },
  { label: '10 Cr to 15 Cr', value: '10 Cr to 15 Cr' },
];

const PROJECT_CATEGORIES = [
  { label: 'Residential', value: 'Residential' },
  { label: 'Commercial', value: 'Commercial' },
];

const UNIT_TYPES = [
  { label: '2 BHK', value: '2 BHK' },
  { label: '3 BHK', value: '3 BHK' },
  { label: '4 BHK', value: '4 BHK' },
  { label: '5 BHK', value: '5 BHK' },
  { label: 'Office', value: 'Office' },
  { label: 'Showroom', value: 'Showroom' },
  { label: 'Shop', value: 'Shop' },
  { label: 'Weekend Villa', value: 'Weekend Villa' },
];

const LEAD_TYPES = [
  { label: 'Buy', value: 'Buy' },
  { label: 'Invest', value: 'Invest' },
  { label: 'Lease', value: 'Lease' },
  { label: 'Pre-Lease', value: 'Pre-Lease' },
];

 const COMMERCIAL_TYPES = [
  { label: 'Office', value: 'Office' },
  { label: 'Showroom', value: 'Showroom' },
  { label: 'Shop', value: 'Shop' },
];
const REFERRAL_TYPES = [
  { label: 'CP', value: 'CP' },
  { label: 'Member', value: 'Member' },
  { label: 'Employee', value: 'Employee' },
  { label: 'Vendor', value: 'Vendor' },
  { label: 'Investor', value: 'Investor' },
  { label: 'Lead', value: 'Lead' },
];
const BUYING_TIME = [
  { label: 'Immediate', value: 'Immediate' },
  { label: 'In 3 Months', value: 'In 3 Months' },
  { label: 'In 6 Months', value: 'In 6 Months' },
  { label: 'In 1 Year +', value: 'In 1 Year +' },
];

const LEAD_STAGE_OPTIONS = [
  { label: 'New Inquiry', value: 'New Inquiry' },
  { label: 'Not Connected', value: 'Not Connected' },
  { label: 'Qualified', value: 'Qualified' },
  { label: 'Meeting Planned', value: 'Meeting Planned' },
  { label: 'Meeting Done', value: 'Meeting Done' },
  { label: 'Block', value: 'Block' },
  { label: 'Booked', value: 'Booked' },
  { label: 'Lost', value: 'Lost' }
];

const FUND_LEAD_STAGE_OPTIONS = [
  { label: 'New Inquiry', value: 'New Inquiry' },
  { label: 'Not Connected', value: 'Not Connected' },
  { label: 'Qualified', value: 'Qualified' },
  { label: 'Meeting Planned', value: 'Meeting Planned' },
  { label: 'Meeting Done', value: 'Meeting Done' },
  { label: 'Outcome', value: 'Outcome' },
  { label: 'Commited', value: 'Commited' },
  { label: 'Lost', value: 'Lost' }
];

const PHONE_STATUS_OPTIONS = [
  { label: 'Not Responding', value: 'Not Responding' },
  { label: 'Not Reachable', value: 'Not Reachable' },
  { label: 'Switch off', value: 'Switch off' },
  { label: 'Busy', value: 'Busy' },
];

const ATTENDANCE_STATUS_OPTIONS = [
  { label: 'Attended', value: 'Attended' },
  { label: 'Not Attended', value: 'Not Attended' },
];

const MEETING_STATUS_OPTIONS = [
  { label: 'Committed', value: 'Committed' },
  { label: 'Follow-up Meeting', value: 'Follow-up Meeting' },
  { label: 'Lost', value: 'Lost' },
];
const INITIAL_MEETING_OPTIONS = [
  { label: 'Project details shared', value: 'Project details shared' },
  { label: 'Site Meeting Planned', value: 'Site Meeting Planned' },
  { label: 'Project Briefing', value: 'Project Briefing' },
];

const NOT_INTERESTED_REASONS = [
  { label: 'Select', value: 'Select' },
  { label: 'Budget', value: 'Budget' },
  { label: 'Location', value: 'Location' },
  { label: 'Comment', value: 'Comment' },
  { label: 'Property Type', value: 'Property Type' },
  { label: 'BHK', value: 'BHK' },
  { label: 'Property Requirement', value: 'Property Requirement' },
  { label: 'Caste', value: 'Caste' },
  { label: 'Carpet Area', value: 'Carpet Area' },
  { label: 'Large Community', value: 'Large Community' },
  { label: 'Unit Availability', value: 'Unit Availability' },
  { label: 'Floor Plan', value: 'Floor Plan' },
  { label: 'Loan', value: 'Loan' },
  { label: 'Booked with Others', value: 'Booked with Others' },
  { label: 'Not Looking for Property', value: 'Not Looking for Property' },
  { label: 'Planning Postponed', value: 'Planning Postponed' },
  { label: 'Wrong No', value: 'Wrong No' },
  { label: 'Others (Mention)', value: 'Others (Mention)' },
];

const MEETING_PROGRESS_OPTIONS = [
  { label: 'Project Overview & Cost Discussion', value: 'Project Overview & Cost Discussion' },
  { label: 'Brochure Shared', value: 'Brochure Shared' },
  { label: 'Sample House Visited', value: 'Sample House Visited' },
  { label: 'Unit Availability Checked', value: 'Unit Availability Checked' },
  { label: 'Unit Blocked', value: 'Unit Blocked' },
  { label: 'Payment Plan Discussion', value: 'Payment Plan Discussion' },
  { label: 'Next Meeting Planned', value: 'Next Meeting Planned' },
];
const unitOptions = [
  { label: "Select Unit Number", value: "Select Unit Number" },
  { label: "Discussion", value: "discussion" },
  { label: "Not Responding", value: "not_responding" }
];
const propertyTypeOptions = [
  { label: 'Apartment', value: 'Apartment' },
  { label: 'Studio', value: 'Studio' },
  { label: 'Penthouse', value: 'Penthouse' },
  { label: 'Tenement', value: 'Tenement' },
  { label: 'Villa', value: 'Villa' },
  { label: 'Plot', value: 'Plot' },
  { label: 'Office', value: 'Office' },
  { label: 'Showroom', value: 'Showroom' },
]
const bhkOptions = [
  { label: '2 Bhk', value: '2 Bhk' },
  { label: '3 Bhk', value: '3 Bhk' },
  { label: '4 Bhk', value: '4 Bhk' },
  { label: '5 Bhk', value: '5 Bhk' },
]
const unitStatusOptions = [
  { label: 'Ready to Move', value: 'Ready to Move' },
  { label: 'Under Construction', value: 'Under Construction' },
  { label: 'Pre Launch', value: 'Pre Launch' },
  { label: 'Nearby Possession', value: 'Nearby Possession' },
]



const DESK_MODULE = [
  {
    title:'Land',
    data:'land'
  },
  {
    title:'Project',
    data:'project'
  },
  {
    title:'Fund',
    data:'fund'
  },
  {
    title:'CP',
    data:'cp'
  }
]

// Profile dropdown options
const OCCUPATION_OPTIONS = [
  { label: "Own Company", value: "Own Company" },
  { label: "Self Employee", value: "Self Employee" },
  { label: "Student", value: "Student" },
  { label: "Government Employee", value: "Government Employee" },
  { label: "Home Maker", value: "Home Maker" },
  { label: "Unemployed", value: "Unemployed" },
  { label: "Entrepreneur", value: "Entrepreneur" }
];

const COMPANY_INFO_OPTIONS = [
  { label: "Private Limited", value: "private_limited" },
  { label: "Public Limited", value: "public_limited" },
  { label: "Partnership", value: "partnership" },
  { label: "Sole Proprietorship", value: "sole_proprietorship" },
  { label: "Government", value: "government" },
  { label: "NGO", value: "ngo" }
];

const BRANCH_OPTIONS = [
  { label: "Head Office", value: "head_office" },
  { label: "Regional Office", value: "regional_office" },
  { label: "Branch Office", value: "branch_office" },
  { label: "Sales Office", value: "sales_office" },
  { label: "Service Center", value: "service_center" }
];

const SHIFT_OPTIONS = [
  { label: "Day Shift", value: "day_shift" },
  { label: "Night Shift", value: "night_shift" },
  { label: "Rotational", value: "rotational" },
  { label: "Flexible", value: "flexible" }
];

const EMPLOYEE_TYPE_OPTIONS = [
  { label: "Permanent", value: "permanent" },
  { label: "Contract", value: "contract" },
  { label: "Part Time", value: "part_time" },
  { label: "Intern", value: "intern" },
  { label: "Consultant", value: "consultant" }
];

const AREA_OPTIONS = [
  { label: "Sabarmati", value: "sabarmati" },
  { label: "Bopal", value: "bopal" },
  { label: "Vastrapur", value: "vastrapur" },
  { label: "Satellite", value: "satellite" },
  { label: "Maninagar", value: "maninagar" },
  { label: "Navrangpura", value: "navrangpura" },
  { label: "Paldi", value: "paldi" },
  { label: "Ahmedabad", value: "ahmedabad" }
];

// CP Form Options
const TIER_OPTIONS = [
  { label: 'Tier 1', value: 'Tier 1' },
  { label: 'Tier 2', value: 'Tier 2' },
  { label: 'Tier 3', value: 'Tier 3' },
];

const CHANNEL_ROLE_OPTIONS = [
  { label: 'Experienced, RERA Certified', value: 'Experienced, RERA Certified' },
  { label: 'Experienced, RERA not register', value: 'Experienced, RERA not register' },
];

export { SOURCE_OPTIONS, SUB_SOURCE_MAP, PRIORITY_OPTIONS, BUDGET_OPTIONS, PROJECT_CATEGORIES, UNIT_TYPES, LEAD_TYPES, REFERRAL_TYPES, BUYING_TIME, LEAD_STAGE_OPTIONS, FUND_LEAD_STAGE_OPTIONS, PHONE_STATUS_OPTIONS, ATTENDANCE_STATUS_OPTIONS, MEETING_STATUS_OPTIONS, INITIAL_MEETING_OPTIONS, NOT_INTERESTED_REASONS, MEETING_PROGRESS_OPTIONS, unitOptions, propertyTypeOptions, bhkOptions, unitStatusOptions,BLOOD_GROUPS,COMMERCIAL_TYPES,DESK_MODULE, OCCUPATION_OPTIONS, COMPANY_INFO_OPTIONS, BRANCH_OPTIONS, SHIFT_OPTIONS, EMPLOYEE_TYPE_OPTIONS, AREA_OPTIONS, TIER_OPTIONS, CHANNEL_ROLE_OPTIONS}