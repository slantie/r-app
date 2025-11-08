// Type definitions matching backend models
// Based on society-services models

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  userName: string;
  countryCodeName: string;
  countryCode: string;
  phoneNumber: string;
  email: string;
  isbuildingMember: boolean;
  isbuildingEmployee: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

export interface IBuilding {
  _id: string;
  buildingName: string;
  societyName: string;
  address: string;
  territory?: string;
  city: string;
  state: string;
  pincode: string;
  totalBlocks: number;
  totalUnits: number;
  buildingType?: string;
  buildingLogo?: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

export interface IBlock {
  _id: string;
  blockName: string;
  buildingId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

export interface IFloor {
  _id: string;
  floorName: string;
  unitType: string;
  unitsPerFloor: number;
  blockId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

export interface IUnit {
  _id: string;
  unitNumber: string;
  unitType: string;
  area: string;
  floorId: string;
  blockId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

export interface IMember {
  _id: string;
  firstName: string;
  lastName: string;
  countryCodeName: string;
  countryCode: string;
  phoneNumber: string;
  email: string;
  gender: string;
  ownershipProof: string;
  committeeType?: string;
  memberType: string; // Owner, Tenant, etc.
  memberRelation?: string;
  parentMemberId?: string;
  userId: string;
  blockId: string;
  floorId: string;
  unitId: string;
  buildingId: string;
  memberStatus: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

// API Response Types
export interface ILoginResponse {
  success: boolean;
  message: string;
  result?: {
    otpSent?: boolean;
    expiresIn?: number; // seconds
  };
  // Legacy structure
  data?: {
    otpSent?: boolean;
    expiresIn?: number;
  };
}

export interface IOtpVerifyResponse {
  success: boolean;
  message: string;
  result?: {
    accessToken: string;
    user?: IUser;
    isProfileSubmit: boolean;
    identitySelection?: string;
    isTerritorySubmit: boolean;
    // User fields at root level
    _id?: string;
    firstName?: string;
    lastName?: string;
    userName?: string;
    countryCodeName?: string;
    countryCode?: string;
    phoneNumber?: string;
    email?: string;
    isbuildingMember?: boolean;
    isbuildingEmployee?: boolean;
    status?: string;
  };
  // Legacy structure (for backward compatibility)
  data?: {
    token?: string;
    user?: IUser;
    member?: IMember;
    isProfileComplete?: boolean;
    requiresIdentitySelection?: boolean;
    requiresTerritorySelection?: boolean;
  };
}

export interface ITerritoryListResponse {
  success: boolean;
  message: string;
  data: {
    territories: IBuilding[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    };
  };
}

export interface IProfileSubmitResponse {
  success: boolean;
  message: string;
  result?: {
    accessToken?: string;
    user?: IUser;
    member?: IMember;
    isProfileSubmit?: boolean;
    identitySelection?: string;
    isTerritorySubmit?: boolean;
    // User fields at root level
    _id?: string;
    firstName?: string;
    lastName?: string;
    userName?: string;
    email?: string;
    phoneNumber?: string;
    countryCode?: string;
  };
  // Legacy structure
  data?: {
    user?: IUser;
    member?: IMember;
  };
}

export interface IWhoAmIResponse {
  success: boolean;
  message: string;
  data?: {
    identityType: string;
  };
}

export interface ITerritorySubmitResponse {
  success: boolean;
  message: string;
  result?: {
    accessToken?: string;
    member?: IMember;
    isProfileSubmit?: boolean;
    identitySelection?: string;
    isTerritorySubmit?: boolean;
    // User fields at root level
    _id?: string;
    firstName?: string;
    lastName?: string;
    userName?: string;
    email?: string;
    phoneNumber?: string;
    countryCode?: string;
  };
  // Legacy structure
  data?: {
    member?: IMember;
  };
}
