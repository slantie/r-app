/**
 * TypeScript Interfaces Matching Backend MongoDB Models
 * 
 * These interfaces ensure type safety when working with backend data
 * They match the schema definitions from society-services/src/models/
 */

// ============================================
// Core Models
// ============================================

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
  status: 'active' | 'inactive';
  createdBy?: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
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
  projectId?: string;
  approveBy?: string;
  approveAt?: string;
  status: 'active' | 'inactive' | 'pending';
  createdBy?: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  isDeleted: boolean;
}

export interface IBlock {
  _id: string;
  blockName: string;
  buildingId: string;
  totalFloors: number;
  totalUnits: number;
  createdBy?: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  isDeleted: boolean;
}

export interface IFloor {
  _id: string;
  floorName: string;
  blockId: string | IBlock;
  totalUnits: number;
  createdBy?: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  isDeleted: boolean;
}

export interface IUnit {
  _id: string;
  unitNumber: string;
  unitType: string;
  area: string;
  floorId: string | IFloor;
  blockId: string | IBlock;
  unitStatus: 'Vacant' | 'Occupied' | 'Under Maintenance';
  createdBy?: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
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
  memberType: 'Owner' | 'Tenant' | 'Family Member';
  memberRelation?: string;
  parentMemberId?: string;
  userId: string | IUser;
  blockId: string | IBlock;
  floorId: string | IFloor;
  unitId: string | IUnit;
  buildingId: string | IBuilding;
  memberStatus: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  isDeleted: boolean;
}

// ============================================
// Notice Board
// ============================================

export type NoticeCategory = 'general' | 'maintenance' | 'event' | 'emergency' | 'meeting' | 'sos';
export type Priority = 'high' | 'medium' | 'low';
export type NoticeStatus = 'draft' | 'published' | 'expired';

export interface INotice {
  _id: string;
  title: string;
  message: string;
  attachments: string[];
  category: NoticeCategory;
  priority: Priority;
  buildingId: string | IBuilding;
  blockIds: string[];
  targetUserType: string;
  unitIds: string[];
  publishNow: boolean;
  publishDate: string;
  expiryDate: string;
  noticeStatus: NoticeStatus;
  createdBy: string | IUser;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  isDeleted: boolean;
}

// ============================================
// Amenities
// ============================================

export type AmenityType = 'free' | 'paid';
export type BookingType = 'one-time' | 'recurring';
export type AmenityStatus = 'active' | 'inactive' | 'maintenance';

export interface IAmenity {
  _id: string;
  amenityName: string;
  amenityType: AmenityType;
  description: string;
  images: string[];
  location: string;
  capacity: number;
  pricePerSlot: number;
  bookingType: BookingType;
  paymentGateway?: string;
  advanceBookingDays: number;
  requiresApproval: boolean;
  buildingId: string | IBuilding;
  status: AmenityStatus;
  createdBy?: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  isDeleted: boolean;
}

export type SlotStatus = 'available' | 'booked' | 'blocked';

export interface IAmenitySlot {
  _id: string;
  amenityId: string | IAmenity;
  slotDate: string;
  startTime: string;
  endTime: string;
  slotStatus: SlotStatus;
  memberId?: string | IMember;
  unitId?: string | IUnit;
  createdBy?: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  isDeleted: boolean;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface IAmenityBooking {
  _id: string;
  amenityId: string | IAmenity;
  amenityBookingSlotId: string | IAmenitySlot;
  memberId: string | IMember;
  unitId: string | IUnit;
  buildingId: string | IBuilding;
  bookingDate: string;
  bookingAmount: number;
  paymentStatus: PaymentStatus;
  paymentMethod?: string;
  transactionId?: string;
  bookingStatus: BookingStatus;
  cancellationReason?: string;
  cancelledAt?: string;
  cancelledBy?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  isDeleted: boolean;
}

// ============================================
// Events
// ============================================

export type EventStatus = 'draft' | 'published' | 'ongoing' | 'completed' | 'cancelled';

export interface IEvent {
  _id: string;
  title: string;
  description: string;
  banner?: string;
  buildingId: string | IBuilding;
  blockIds: string[];
  floorIds: string[];
  unitIds: string[];
  targetUserTypes: string[];
  territory?: string;
  venue: string;
  venueLocation?: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  registrationLimit?: number;
  registrationFields: any[];
  eventStatus: EventStatus;
  createdBy?: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  isDeleted: boolean;
}

export type RegistrationStatus = 'registered' | 'cancelled';
export type AttendanceStatus = 'attended' | 'absent' | 'pending';

export interface IEventRegistration {
  _id: string;
  eventId: string | IEvent;
  memberId: string | IMember;
  unitId: string | IUnit;
  buildingId: string | IBuilding;
  registrationData: any;
  registrationStatus: RegistrationStatus;
  attendanceStatus: AttendanceStatus;
  createdBy?: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  isDeleted: boolean;
}

// ============================================
// Maintenance & Bills
// ============================================

export type BillStatus = 'draft' | 'published' | 'paid' | 'overdue';

export interface IMaintenanceBill {
  _id: string;
  billNumber: string;
  name: string;
  description: string;
  billMonth: number;
  billYear: number;
  billDate: string;
  dueDate: string;
  buildingId: string | IBuilding;
  blockIds: string[];
  floorIds: string[];
  unitIds: string[];
  maintenanceTypeId: string;
  amount: number;
  lateFee: number;
  totalAmount: number;
  billStatus: BillStatus;
  createdBy?: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  isDeleted: boolean;
}

export interface IMaintenancePayment {
  _id: string;
  billId: string | IMaintenanceBill;
  memberId: string | IMember;
  unitId: string | IUnit;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  transactionId: string;
  paymentStatus: PaymentStatus;
  createdBy?: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  isDeleted: boolean;
}

// ============================================
// Parking
// ============================================

export type VehicleType = 'car' | 'bike' | 'scooter';
export type ParkingSpotType = 'member-car' | 'member-bike' | 'visitor-car' | 'visitor-bike';
export type SpotStatus = 'available' | 'occupied' | 'reserved' | 'maintenance';

export interface IVehicle {
  _id: string;
  vehicleType: VehicleType;
  vehicleNumber: string;
  vehicleModel: string;
  vehicleColor?: string;
  memberId: string | IMember;
  buildingId: string | IBuilding;
  createdBy?: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  isDeleted: boolean;
}

export interface IParkingSpot {
  _id: string;
  parkingAreaId: string;
  spotNumber: string;
  spotType: ParkingSpotType;
  blockId: string | IBlock;
  unitId?: string | IUnit;
  spotStatus: SpotStatus;
  createdBy?: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  isDeleted: boolean;
}

export type AssignmentStatus = 'pending' | 'approved' | 'rejected' | 'released';

export interface IParkingRequest {
  _id: string;
  parkingSpotId: string | IParkingSpot;
  vehicleId: string | IVehicle;
  memberId: string | IMember;
  buildingId: string | IBuilding;
  assignmentStatus: AssignmentStatus;
  requestDate: string;
  approvedDate?: string;
  approvedBy?: string;
  rejectionReason?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  isDeleted: boolean;
}

// ============================================
// Visitors
// ============================================

export type VisitorType = 'employee' | 'member' | 'tenant' | 'vendor' | 'delivery';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export interface IVisitor {
  _id: string;
  visitorName: string;
  phoneNumber: string;
  visitorImage?: string;
  vehicleNumber?: string;
  visitorType: VisitorType;
  purpose: string;
  buildingId: string | IBuilding;
  blockId: string | IBlock;
  floorId: string | IFloor;
  unitId: string | IUnit;
  memberId: string | IMember;
  visitDate: string;
  checkInTime?: string;
  checkOutTime?: string;
  approvalStatus: ApprovalStatus;
  createdBy?: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  isDeleted: boolean;
}

// ============================================
// Complaints
// ============================================

export type ComplaintStatus = 'open' | 'in-process' | 'on-hold' | 'close' | 're-open' | 'dismiss';
export type ComplaintCategory = 'maintenance' | 'electrical' | 'plumbing' | 'security' | 'cleanliness' | 'other';

export interface IComplaint {
  _id: string;
  title: string;
  category: ComplaintCategory;
  priority: Priority;
  description: string;
  images: string[];
  complaintType: string;
  buildingId: string | IBuilding;
  unitId: string | IUnit;
  memberId: string | IMember;
  complaintStatus: ComplaintStatus;
  assignedToEmployeeId?: string;
  resolvedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  isDeleted: boolean;
}

// ============================================
// API Response Types
// ============================================

export interface IApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: any;
}

export interface IAuthResponse {
  accessToken: string;
  user: IUser;
  isNewUser: boolean;
  isProfileComplete: boolean;
  isMemberRegistered: boolean;
  memberStatus: 'pending' | 'approved' | 'rejected' | null;
  member: {
    _id: string;
    memberType: string;
    buildingId: string;
    buildingName: string;
    unitId: string;
    unitNumber: string;
    blockId: string;
    blockName: string;
    memberStatus: string;
  } | null;
}

export interface IDashboardData {
  unitInfo: {
    unitNumber: string;
    unitType: string;
    area: string;
    floor: string;
    block: string;
    unitStatus: string;
  };
  quickStats: {
    activeComplaints: number;
    todayVisitors: number;
    activeBookings: number;
    hasPendingBill: boolean;
  };
  recentNotices: INotice[];
  pendingBill: {
    _id: string;
    billMonth: number;
    billYear: number;
    amount: number;
    dueDate: string;
    maintenanceType: string;
  } | null;
  upcomingEvents: IEvent[];
  parkingInfo: {
    spotNumber: string;
    areaName: string;
    spotType: string;
  } | null;
}

// ============================================
// Pagination Types
// ============================================

export interface IPaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface IPaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface IPaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  pagination: IPaginationMeta;
}
