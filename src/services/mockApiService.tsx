// Mock API Service
// Simulates backend responses with realistic data matching society-services models
// Toggle USE_MOCK_DATA to switch between mock and real API

import {
  IUser,
  IBuilding,
  IMember,
  ILoginResponse,
  IOtpVerifyResponse,
  ITerritoryListResponse,
  IProfileSubmitResponse,
  IWhoAmIResponse,
  ITerritorySubmitResponse,
} from '../types/api';

// ============================================
// MOCK DATA - Matching Backend Model Structure
// ============================================

// Mock Buildings (Territories/Societies)
const MOCK_BUILDINGS: IBuilding[] = [
  {
    _id: 'building_001',
    buildingName: 'Shivalik Heights',
    societyName: 'Shivalik Heights Residency',
    address: '123 Main Road, Sector 15',
    territory: 'North Zone',
    city: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '380015',
    totalBlocks: 3,
    totalUnits: 120,
    buildingType: 'Residential',
    buildingLogo: 'https://via.placeholder.com/150/4CAF50/FFFFFF?text=SH',
    status: 'active',
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString(),
    isDeleted: false,
  },
  {
    _id: 'building_002',
    buildingName: 'Green Valley Apartments',
    societyName: 'Green Valley Society',
    address: '456 Park Avenue, Satellite',
    territory: 'West Zone',
    city: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '380015',
    totalBlocks: 2,
    totalUnits: 80,
    buildingType: 'Residential',
    buildingLogo: 'https://via.placeholder.com/150/2196F3/FFFFFF?text=GV',
    status: 'active',
    createdAt: new Date('2024-02-10').toISOString(),
    updatedAt: new Date('2024-02-10').toISOString(),
    isDeleted: false,
  },
  {
    _id: 'building_003',
    buildingName: 'Sunrise Towers',
    societyName: 'Sunrise Residential Complex',
    address: '789 Lake View Road, Prahlad Nagar',
    territory: 'South Zone',
    city: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '380051',
    totalBlocks: 4,
    totalUnits: 160,
    buildingType: 'Residential',
    buildingLogo: 'https://via.placeholder.com/150/FF9800/FFFFFF?text=ST',
    status: 'active',
    createdAt: new Date('2024-03-05').toISOString(),
    updatedAt: new Date('2024-03-05').toISOString(),
    isDeleted: false,
  },
];

// Mock User Storage (simulates in-memory OTP storage like backend)
const MOCK_OTP_STORAGE: Map<string, { otp: string; expiresAt: number }> = new Map();

// Mock authenticated user session
let MOCK_CURRENT_USER: IUser | null = null;
let MOCK_CURRENT_MEMBER: IMember | null = null;
let MOCK_AUTH_TOKEN: string | null = null;

// ============================================
// HELPER FUNCTIONS
// ============================================

// Generate mock JWT token
const generateMockToken = (phoneNumber: string): string => {
  const timestamp = Date.now();
  return `mock_jwt_${phoneNumber}_${timestamp}`;
};

// Generate mock user ID
const generateMockUserId = (phoneNumber: string): string => {
  return `user_${phoneNumber.replace(/\D/g, '')}`;
};

// Simulate network delay
const simulateDelay = (ms: number = 800): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// ============================================
// MOCK API METHODS
// ============================================

/**
 * Mock: Send OTP to phone number
 */
export const mockSendPhoneOTP = async (
  countryCode: string,
  phoneNumber: string
): Promise<ILoginResponse> => {
  await simulateDelay();

  const key = `${countryCode}${phoneNumber}`;
  console.log('📱 [MOCK] Sending OTP to:', countryCode + phoneNumber);
  console.log('🔑 [MOCK] Storage key:', key);

  // Generate mock OTP
  const otp = '123456'; // Static for testing, or use: Math.floor(100000 + Math.random() * 900000).toString()
  const expiresAt = Date.now() + 2 * 60 * 1000; // 2 minutes

  // Store OTP
  MOCK_OTP_STORAGE.set(key, { otp, expiresAt });

  console.log('✅ [MOCK] OTP generated:', otp, '(expires in 2 min)');
  console.log('📦 [MOCK] Storage size:', MOCK_OTP_STORAGE.size);
  console.log('📦 [MOCK] All keys:', Array.from(MOCK_OTP_STORAGE.keys()));

  return {
    success: true,
    message: 'OTP sent successfully to your phone number',
    result: {
      otpSent: true,
      expiresIn: 120,
    },
  };
};

/**
 * Mock: Verify OTP and login
 */
export const mockVerifyPhoneOTP = async (
  countryCode: string,
  phoneNumber: string,
  otp: string
): Promise<IOtpVerifyResponse> => {
  await simulateDelay(1000);

  const key = `${countryCode}${phoneNumber}`;
  console.log('🔐 [MOCK] Verifying OTP:', otp, 'for', countryCode + phoneNumber);
  console.log('🔑 [MOCK] Lookup key:', key);
  console.log('📦 [MOCK] Storage size:', MOCK_OTP_STORAGE.size);
  console.log('📦 [MOCK] All keys:', Array.from(MOCK_OTP_STORAGE.keys()));
  
  // STATIC BYPASS: Allow 123456 OTP for any number that wasn't stored
  // This handles the case where login screen uses static bypass
  const stored = MOCK_OTP_STORAGE.get(key);
  console.log('🔍 [MOCK] Found stored OTP:', stored);

  // If OTP is 123456 and no OTP was stored, allow it (static bypass compatibility)
  if (!stored && otp === '123456') {
    console.log('⚡ [MOCK] Static bypass mode - accepting 123456 for any number');
    // Create mock user and proceed
  } else if (!stored) {
    // OTP not found and not using static bypass
    console.log('❌ [MOCK] OTP not found in storage!');
    throw {
      response: {
        status: 400,
        data: {
          success: false,
          message: 'OTP not found. Please request a new OTP.',
        },
      },
    };
  } else {
    // Check if OTP expired
    if (Date.now() > stored.expiresAt) {
      MOCK_OTP_STORAGE.delete(key);
      throw {
        response: {
          status: 400,
          data: {
            success: false,
            message: 'OTP has expired. Please request a new OTP.',
          },
        },
      };
    }

    // Verify OTP
    if (stored.otp !== otp) {
      throw {
        response: {
          status: 400,
          data: {
            success: false,
            message: 'Invalid OTP. Please try again.',
          },
        },
      };
    }

    // OTP verified - clear it
    MOCK_OTP_STORAGE.delete(key);
  }

  // Create mock user
  const mockUser: IUser = {
    _id: generateMockUserId(phoneNumber),
    firstName: 'Demo',
    lastName: 'User',
    userName: `user_${phoneNumber}`,
    countryCodeName: 'India',
    countryCode,
    phoneNumber,
    email: `${phoneNumber}@example.com`,
    isbuildingMember: false, // Will be true after profile completion
    isbuildingEmployee: false,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isDeleted: false,
  };

  // Generate token
  const token = generateMockToken(phoneNumber);

  // Store session
  MOCK_CURRENT_USER = mockUser;
  MOCK_AUTH_TOKEN = token;

  console.log('✅ [MOCK] OTP verified successfully!');
  console.log('👤 [MOCK] User logged in:', mockUser.userName);

  return {
    success: true,
    message: 'OTP verified successfully',
    result: {  // Changed from 'data' to 'result' to match app expectation
      accessToken: token,
      user: mockUser,
      isProfileSubmit: false, // New user needs to complete profile
      identitySelection: '', // Empty string means not selected yet
      isTerritorySubmit: false, // Not submitted yet
      ...mockUser, // Spread user data at root level as well
    },
  };
};

/**
 * Mock: Get territory/building list
 */
export const mockGetTerritoryList = async (page: number = 1): Promise<ITerritoryListResponse> => {
  await simulateDelay(600);

  console.log('🏢 [MOCK] Fetching territory list, page:', page);

  const itemsPerPage = 10;
  const totalItems = MOCK_BUILDINGS.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return {
    success: true,
    message: 'Territories fetched successfully',
    data: {
      territories: MOCK_BUILDINGS,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        itemsPerPage,
      },
    },
  };
};

/**
 * Mock: Who Am I - Identity Selection
 */
export const mockWhoAmI = async (identityType: string): Promise<IWhoAmIResponse> => {
  await simulateDelay();

  console.log('👤 [MOCK] Identity selected:', identityType);

  return {
    success: true,
    message: 'Identity selection saved',
    data: {
      identityType,
    },
  };
};

/**
 * Mock: Submit Territory Details
 */
export const mockSubmitTerritoryDetails = async (
  data: any // Accept flexible structure
): Promise<ITerritorySubmitResponse> => {
  await simulateDelay(800);

  console.log('🏠 [MOCK] Territory submission:', data);

  // Handle different payload structures
  const buildingId = data.buildingId || data.territoryId;
  const blockName = data.blockName || data.territory || 'A';
  const floorNumber = data.floorNumber || '1';
  const unitNumber = data.unitNumber || '101';

  // Find building (or create mock one for "Other")
  let building = MOCK_BUILDINGS.find(b => b._id === buildingId);
  
  if (!building || buildingId === 'Other') {
    // Create a mock building for custom territory
    building = {
      _id: 'building_custom',
      buildingName: data.city || 'Custom Society',
      societyName: `${data.territory || 'Custom'} Society`,
      address: `Pincode: ${data.pincode || '000000'}`,
      territory: data.territory || 'Custom Area',
      city: data.city || 'Ahmedabad',
      state: data.state || 'Gujarat',
      pincode: data.pincode || '380015',
      totalBlocks: 1,
      totalUnits: 50,
      buildingType: 'Residential',
      buildingLogo: 'https://via.placeholder.com/150/9C27B0/FFFFFF?text=CS',
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isDeleted: false,
    };
  }

  // Create mock member
  const mockMember: IMember = {
    _id: `member_${Date.now()}`,
    firstName: MOCK_CURRENT_USER?.firstName || 'Demo',
    lastName: MOCK_CURRENT_USER?.lastName || 'User',
    countryCodeName: MOCK_CURRENT_USER?.countryCodeName || 'India',
    countryCode: MOCK_CURRENT_USER?.countryCode || '+91',
    phoneNumber: MOCK_CURRENT_USER?.phoneNumber || '',
    email: MOCK_CURRENT_USER?.email || '',
    gender: 'Male',
    ownershipProof: '',
    memberType: 'Owner',
    userId: MOCK_CURRENT_USER?._id || '',
    blockId: `block_${blockName}`,
    floorId: `floor_${floorNumber}`,
    unitId: `unit_${unitNumber}`,
    buildingId: building._id,
    memberStatus: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isDeleted: false,
  };

  MOCK_CURRENT_MEMBER = mockMember;

  console.log('✅ [MOCK] Territory details submitted successfully');

  return {
    success: true,
    message: 'Territory details submitted successfully',
    result: {
      // Return complete user data with all flags updated
      accessToken: MOCK_AUTH_TOKEN || generateMockToken(MOCK_CURRENT_USER?.phoneNumber || ''),
      isProfileSubmit: true, // Profile already submitted
      identitySelection: 'completed', // Identity already selected
      isTerritorySubmit: true, // Territory just submitted - COMPLETE!
      ...MOCK_CURRENT_USER, // Spread all user fields
      member: mockMember, // Include member data
    },
  };
};

/**
 * Mock: Profile Registration/Completion
 */
export const mockProfileRegistration = async (profileData: {
  firstName: string;
  lastName: string;
  email: string;
  gender?: string;
  profileImage?: string;
}): Promise<IProfileSubmitResponse> => {
  await simulateDelay(1000);

  console.log('📝 [MOCK] Profile registration:', profileData);

  if (!MOCK_CURRENT_USER) {
    throw {
      response: {
        status: 401,
        data: {
          success: false,
          message: 'User not authenticated',
        },
      },
    };
  }

  // Update mock user
  MOCK_CURRENT_USER = {
    ...MOCK_CURRENT_USER,
    firstName: profileData.firstName,
    lastName: profileData.lastName,
    email: profileData.email,
    userName: `${profileData.firstName.toLowerCase()}_${profileData.lastName.toLowerCase()}`,
    isbuildingMember: true, // Profile completed
    updatedAt: new Date().toISOString(),
  };

  // Update member if exists
  if (MOCK_CURRENT_MEMBER) {
    MOCK_CURRENT_MEMBER = {
      ...MOCK_CURRENT_MEMBER,
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      email: profileData.email,
      gender: profileData.gender || 'Male',
      updatedAt: new Date().toISOString(),
    };
  }

  console.log('✅ [MOCK] Profile registered successfully');

  return {
    success: true,
    message: 'Profile registered successfully',
    result: {
      // Return complete user data with profile flags
      accessToken: MOCK_AUTH_TOKEN || generateMockToken(MOCK_CURRENT_USER.phoneNumber),
      isProfileSubmit: true, // Profile just submitted
      identitySelection: '', // Not selected yet - empty string
      isTerritorySubmit: false, // Not submitted yet
      ...MOCK_CURRENT_USER, // Spread all user fields
    },
  };
};

/**
 * Mock: Resend OTP
 */
export const mockResendOTP = async (
  countryCode: string,
  phoneNumber: string
): Promise<ILoginResponse> => {
  // Same as send OTP
  return mockSendPhoneOTP(countryCode, phoneNumber);
};

// ============================================
// EXPORT MOCK SERVICE
// ============================================

export const MockApiService = {
  sendPhoneOTP: mockSendPhoneOTP,
  verifyPhoneOTP: mockVerifyPhoneOTP,
  getTerritoryList: mockGetTerritoryList,
  whoAmI: mockWhoAmI,
  submitTerritoryDetails: mockSubmitTerritoryDetails,
  profileRegistration: mockProfileRegistration,
  resendOTP: mockResendOTP,
};

export default MockApiService;
