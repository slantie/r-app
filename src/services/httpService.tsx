let API_URL = "";

export const GOOGLE_PLACES_API = '';

// AUTH FLOW
export const LOGIN = API_URL + 'users/send-phone-otp';
export const OTP_VERIFY = API_URL + 'users/verify-phone-otp';
export const RESEND_OTP = API_URL + 'users/resend-otp';
export const IMAGE = API_URL + 'common/upload-file-auth';
export const PROFILE = API_URL + 'users/registrations';
export const TERRITORYLIST = API_URL + 'territory/list?page=1';

export const TERRITORY = API_URL + 'users/submit-territory-details';
export const FEEDBACK_MODULE_LIST = (params: { page?: number }) => API_URL + `feedbackmodules/list?page=${params.page}`;
export const FEEDBACK = API_URL + "feedbacks/user/create";

//  contact
export const CONTACT_UPLOAD = API_URL + 'users/sync-contact-data';
export const GET_CONTACT_LIST = (params: { page?: number }) =>
  API_URL + `users/my-contacts?page=${params.page}&type=MyContact`;

export const INVITE_CONTACT_LIST = (params: { page?: number }) =>
  API_URL + `users/my-contacts?page=${params.page}&type=NotRegister`;

export const MY_CONTACT_LIST = (params: { page?: number }) =>
  API_URL + `users/public-users-list?page=${params.page}`;

export const ADD_CONTACT = API_URL + `users/add/my-contacts`;

export const PROJECT_LIST = (params?: { page?: number; search?: string }) => {
  const page = params?.page || 1;
  const searchParam = params?.search
    ? `&search=${encodeURIComponent(params.search)}`
    : '';
  return API_URL + `projects/app-list?page=${page}${searchParam}`;
};

export const ADD_PROJECT_LEAD = API_URL + `project-leads/create-app`;

export const PROJECT_LEAD = API_URL + `project-leads/create-new`;


export const DELETE_USER = API_URL + `users/delete-account`;

export const WHO_AM_I = API_URL + `users/create/identity-selection`;

// Edit Profile
export const EDIT_PROFILE = (userId: string) =>
  API_URL + `users/user-profile/${userId}`;

// Change Phone Number
export const CHANGE_PHONE_NUMBER = API_URL + 'users/change-phone-number';

// Change Phone Number Verify OTP
export const CHANGE_PHONE_NUMBER_VERIFY_OTP =
  API_URL + 'users/change-phone-number-verify-otp';

// Get User Profile
export const GET_USER_PROFILE = API_URL + 'users/user-profile';

export const PULSES_LIST = (params?: { page?: number; search?: string }) => {
  const page = params?.page || 1;
  const searchParam = params?.search
    ? `&search=${encodeURIComponent(params.search)}`
    : '';
  return API_URL + `knowledges/get-list?page=${page}${searchParam}`;
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
    API_URL +
    `common/project-user-list?page=${params.page}&projectId=${params.projectId}${searchParam}`
  );
};


// User Detail
export const USER_DETAIL = API_URL + `users/user-detail`;

// Employee Details
export const EMPLOYEE_DETAILS = (userId: string) => {
  return API_URL + `employees/detail/${userId}`;
};


// Professional List
export const GET_PROFESSIONAL_LIST = (page: number = 1) =>
  API_URL + `users/professional/list?page=${page}`;

// Create Professional
export const CREATE_PROFESSIONAL = API_URL + 'users/create/professionals';
