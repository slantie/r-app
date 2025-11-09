import { SOCIETY_API_URL, USER_API_URL } from '../config/environment';

export const GOOGLE_PLACES_API = '';

// ============================================
// AUTHENTICATION ENDPOINTS (Society Services)
// ============================================
export const LOGIN = `${SOCIETY_API_URL}/auth/resident/send-otp`;
export const OTP_VERIFY = `${SOCIETY_API_URL}/auth/resident/verify-otp`;
export const RESEND_OTP = `${SOCIETY_API_URL}/auth/resident/send-otp`; // Same as login
export const UPDATE_PROFILE = `${SOCIETY_API_URL}/auth/resident/update-profile`;
export const REGISTER_MEMBER = `${SOCIETY_API_URL}/auth/resident/register-member`;

// ============================================
// PUBLIC ENDPOINTS (No auth required)
// ============================================
export const BUILDINGS_SEARCH = `${SOCIETY_API_URL}/auth/buildings/search`;
export const BUILDING_DETAILS = (buildingId: string) => 
  `${SOCIETY_API_URL}/auth/buildings/${buildingId}/details`;
export const APP_CONSTANTS = `${SOCIETY_API_URL}/auth/constants`;

// ============================================
// FILE UPLOAD (User Services)
// ============================================
export const IMAGE = `${USER_API_URL}/common/upload-file-auth`;

// ============================================
// DEPRECATED/REMOVED ENDPOINTS
// These were from old user-services that don't exist
// ============================================
// export const PROFILE = API_URL + 'users/registrations'; // REMOVED
// export const TERRITORYLIST = API_URL + 'territory/list?page=1'; // REMOVED
// export const TERRITORY = API_URL + 'users/submit-territory-details'; // REMOVED
// export const WHO_AM_I = API_URL + 'users/create/identity-selection'; // REMOVED

// ============================================
// RESIDENT ENDPOINTS (Society Services)
// All require authentication token
// ============================================

// Dashboard
export const RESIDENT_DASHBOARD = `${SOCIETY_API_URL}/resident/dashboard`;
export const RESIDENT_QUICK_STATS = `${SOCIETY_API_URL}/resident/dashboard/quick-stats`;

// Notices
export const RESIDENT_NOTICES = `${SOCIETY_API_URL}/resident/notices`;
export const RESIDENT_NOTICE_DETAIL = (noticeId: string) => 
  `${SOCIETY_API_URL}/resident/notices/${noticeId}`;
export const RESIDENT_NOTICE_MARK_READ = (noticeId: string) => 
  `${SOCIETY_API_URL}/resident/notices/${noticeId}/mark-read`;

// Amenities
export const RESIDENT_AMENITIES = `${SOCIETY_API_URL}/resident/amenities`;
export const RESIDENT_AMENITY_DETAIL = (amenityId: string) => 
  `${SOCIETY_API_URL}/resident/amenities/${amenityId}`;
export const RESIDENT_AMENITY_SLOTS = (amenityId: string) => 
  `${SOCIETY_API_URL}/resident/amenities/${amenityId}/slots`;
export const RESIDENT_AMENITY_BOOK = `${SOCIETY_API_URL}/resident/amenities/book`;
export const RESIDENT_MY_BOOKINGS = `${SOCIETY_API_URL}/resident/amenities/bookings/my-bookings`;
export const RESIDENT_CANCEL_BOOKING = (bookingId: string) => 
  `${SOCIETY_API_URL}/resident/amenities/bookings/${bookingId}/cancel`;

// Events
export const RESIDENT_EVENTS = `${SOCIETY_API_URL}/resident/events`;
export const RESIDENT_EVENT_DETAIL = (eventId: string) => 
  `${SOCIETY_API_URL}/resident/events/${eventId}`;
export const RESIDENT_EVENT_REGISTER = `${SOCIETY_API_URL}/resident/events/register`;
export const RESIDENT_MY_REGISTRATIONS = `${SOCIETY_API_URL}/resident/events/registrations/my-registrations`;
export const RESIDENT_CANCEL_REGISTRATION = (registrationId: string) => 
  `${SOCIETY_API_URL}/resident/events/registrations/${registrationId}/cancel`;

// Maintenance & Bills
export const RESIDENT_BILLS = `${SOCIETY_API_URL}/resident/maintenance/bills`;
export const RESIDENT_BILL_DETAIL = (billId: string) => 
  `${SOCIETY_API_URL}/resident/maintenance/bills/${billId}`;
export const RESIDENT_BILL_PAY = (billId: string) => 
  `${SOCIETY_API_URL}/resident/maintenance/bills/${billId}/pay`;
export const RESIDENT_BILL_STATS = `${SOCIETY_API_URL}/resident/maintenance/bills/stats`;

// Parking
export const RESIDENT_PARKING = `${SOCIETY_API_URL}/resident/parking`;
export const RESIDENT_PARKING_REQUEST = `${SOCIETY_API_URL}/resident/parking/requests`;
export const RESIDENT_PARKING_VEHICLES = `${SOCIETY_API_URL}/resident/parking/vehicles`;
export const RESIDENT_ADD_VEHICLE = `${SOCIETY_API_URL}/resident/parking/vehicles`;
export const RESIDENT_RELEASE_PARKING = (requestId: string) => 
  `${SOCIETY_API_URL}/resident/parking/requests/${requestId}/release`;

// Visitors
export const RESIDENT_VISITORS = `${SOCIETY_API_URL}/resident/visitors`;
export const RESIDENT_VISITORS_TODAY = `${SOCIETY_API_URL}/resident/visitors/today`;
export const RESIDENT_PRE_APPROVE_VISITOR = `${SOCIETY_API_URL}/resident/visitors/pre-approve`;
export const RESIDENT_VISITOR_CHECKOUT = (visitorId: string) => 
  `${SOCIETY_API_URL}/resident/visitors/${visitorId}/checkout`;

// Complaints
export const RESIDENT_COMPLAINTS = `${SOCIETY_API_URL}/resident/complaints`;
export const RESIDENT_COMPLAINT_DETAIL = (complaintId: string) => 
  `${SOCIETY_API_URL}/resident/complaints/${complaintId}`;
export const RESIDENT_CREATE_COMPLAINT = `${SOCIETY_API_URL}/resident/complaints`;
export const RESIDENT_COMPLAINT_STATS = `${SOCIETY_API_URL}/resident/complaints/stats`;

// ============================================
// LEGACY ENDPOINTS (Keep for now, to be migrated)
// ============================================
export const FEEDBACK_MODULE_LIST = (params: { page?: number }) => USER_API_URL + `/feedbackmodules/list?page=${params.page}`;
export const FEEDBACK = USER_API_URL + "/feedbacks/user/create";

//  contact
export const CONTACT_UPLOAD = USER_API_URL + '/users/sync-contact-data';
export const GET_CONTACT_LIST = (params: { page?: number }) =>
  USER_API_URL + `/users/my-contacts?page=${params.page}&type=MyContact`;

export const INVITE_CONTACT_LIST = (params: { page?: number }) =>
  USER_API_URL + `/users/my-contacts?page=${params.page}&type=NotRegister`;

export const MY_CONTACT_LIST = (params: { page?: number }) =>
  USER_API_URL + `/users/public-users-list?page=${params.page}`;

export const ADD_CONTACT = USER_API_URL + `/users/add/my-contacts`;

export const PROJECT_LIST = (params?: { page?: number; search?: string }) => {
  const page = params?.page || 1;
  const searchParam = params?.search
    ? `&search=${encodeURIComponent(params.search)}`
    : '';
  return USER_API_URL + `/projects/app-list?page=${page}${searchParam}`;
};

export const ADD_PROJECT_LEAD = USER_API_URL + `/project-leads/create-app`;

export const PROJECT_LEAD = USER_API_URL + `/project-leads/create-new`;


export const DELETE_USER = USER_API_URL + `/users/delete-account`;

export const WHO_AM_I = USER_API_URL + `/users/create/identity-selection`;

// Edit Profile
export const EDIT_PROFILE = (userId: string) =>
  USER_API_URL + `/users/user-profile/${userId}`;

// Change Phone Number
export const CHANGE_PHONE_NUMBER = USER_API_URL + '/users/change-phone-number';

// Change Phone Number Verify OTP
export const CHANGE_PHONE_NUMBER_VERIFY_OTP =
  USER_API_URL + '/users/change-phone-number-verify-otp';

// Get User Profile
export const GET_USER_PROFILE = USER_API_URL + '/users/user-profile';

export const PULSES_LIST = (params?: { page?: number; search?: string }) => {
  const page = params?.page || 1;
  const searchParam = params?.search
    ? `&search=${encodeURIComponent(params.search)}`
    : '';
  return USER_API_URL + `/knowledges/get-list?page=${page}${searchParam}`;
};


// Project User List
export const PROJECT_USER_LIST = (params: {
  page: number;
  projectId: string;
  search?: string;
}) => {
  const searchParam = params.search
    ? `&search=${encodeURIComponent(params.search)}`
    : '';
  return (
    USER_API_URL +
    `/common/project-user-list?page=${params.page}&projectId=${params.projectId}${searchParam}`
  );
};


// User Detail
export const USER_DETAIL = USER_API_URL + `/users/user-detail`;

// Employee Details
export const EMPLOYEE_DETAILS = (userId: string) => {
  return USER_API_URL + `/employees/detail/${userId}`;
};


// Professional List
export const GET_PROFESSIONAL_LIST = (page: number = 1) =>
  USER_API_URL + `/users/professional/list?page=${page}`;

// Create Professional
export const CREATE_PROFESSIONAL = USER_API_URL + '/users/create/professionals';
