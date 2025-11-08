import { combineReducers } from "redux";
import { AnyAction } from "redux-saga";

import authReducer from "./auth/loginReducers";
import otpReducer from "./auth/otpVarifyReducer";
import resendOtpReducer from "./auth/resendOtpReducer";
import profileReducer from "./auth/profileReducers";
import territoryListReducer from "./auth/territoryListReducers";
import areaByPincodeReducer from "./auth/areaByPincodeReducer";
import territorySubmissionReducer from "./auth/territorySubmissionReducer";
import deleteUserReducer from "./auth/deleteUserReducer";
import whoAmIReducer from "./auth/whoAmIReducer";
import userDetailReducer from "./auth/userDetailReducer";
import commonImageReducer from "./commonImage/commonImageReducer";
import contactUploadReducer from "./contacts/contactUploadReducers";
import getContactListReducer from "./contacts/getContactListReducers";
import inviteContactListReducer from "./contacts/inviteContactListReducers";
import myContactListReducer from "./contacts/myContactListReducers";
import addContactReducer from "./contacts/addContactReducers";
import projectListReducer from "./project/projectListReducer";
import addProjectLeadReducer from "./project/addProjectLeadReducer";
import projectLeadReducer from "./project/projectLeadReducer";
import { pulsesListReducer } from "./pulses/pulsesListReducer";
import { editProfileReducer } from "./profile/editProfileReducer";
import { changePhoneNumberReducer } from "./profile/changePhoneNumberReducer";
import { changePhoneNumberVerifyOtpReducer } from "./profile/changePhoneNumberVerifyOtpReducer";
import { getUserProfileReducer } from "./profile/getUserProfileReducer";
import { getDepartmentsListReducer } from "./profile/getDepartmentsListReducer";
import { getBranchesListReducer } from "./profile/getBranchesListReducer";
import { getDesignationsListReducer } from "./profile/getDesignationsListReducer";
import { getShiftManagementsListReducer } from "./profile/getShiftManagementsListReducer";
import { getSeatingOfficesListReducer } from "./profile/getSeatingOfficesListReducer";
import { createPropertyReducer } from "./profile/createPropertyReducer";
import { getPropertyListReducer } from "./profile/getPropertyListReducer";
import { getProfessionalListReducer } from "./profile/getProfessionalListReducer";
import { createProfessionalReducer } from "./profile/createProfessionalReducer";
import feedbackReducer from "./feedback/feedbackReducer";
import getFeedbackModuleListReducer from "./feedback/getFeedbackModuleReducer";
import { RESET_STORE } from "../actionType";
// Society Management Reducers
import dashboardReducer from "./dashboardReducer";
import noticesReducer from "./noticesReducer";
import amenitiesReducer from "./amenitiesReducer";
import eventsReducer from "./eventsReducer";
import maintenanceReducer from "./maintenanceReducer";
import parkingReducer from "./parkingReducer";
import visitorsReducer from "./visitorsReducer";
import complaintsReducer from "./complaintsReducer";


const appReducer = combineReducers({
  auth: authReducer,
  otp: otpReducer,
  resendOtp: resendOtpReducer,
  profile: profileReducer,
  territoryList: territoryListReducer,
  areaByPincode: areaByPincodeReducer,
  territorySubmission: territorySubmissionReducer,
  deleteUser: deleteUserReducer,
  whoAmI: whoAmIReducer,
  userDetail: userDetailReducer,
  commonImage: commonImageReducer,
  contactUpload: contactUploadReducer,
  getContactList: getContactListReducer,
  inviteContactList: inviteContactListReducer,
  myContactList: myContactListReducer,
  addContact: addContactReducer,
  projectList: projectListReducer,
  addProjectLead: addProjectLeadReducer,
  projectLead: projectLeadReducer,
  pulsesList: pulsesListReducer,
  editProfile: editProfileReducer,
  changePhoneNumber: changePhoneNumberReducer,
  changePhoneNumberVerifyOtp: changePhoneNumberVerifyOtpReducer,
  getUserProfile: getUserProfileReducer,
  getDepartmentsList: getDepartmentsListReducer,
  getBranchesList: getBranchesListReducer,
  getDesignationsList: getDesignationsListReducer,
  getShiftManagementsList: getShiftManagementsListReducer,
  getSeatingOfficesList: getSeatingOfficesListReducer,
  createProperty: createPropertyReducer,
  propertyList: getPropertyListReducer,
  feedback: feedbackReducer,
  getFeedbackModuleList: getFeedbackModuleListReducer,
  getProfessionalList: getProfessionalListReducer,
  createProfessional: createProfessionalReducer,
  // Society Management
  dashboard: dashboardReducer,
  notices: noticesReducer,
  amenities: amenitiesReducer,
  events: eventsReducer,
  maintenance: maintenanceReducer,
  parking: parkingReducer,
  visitors: visitorsReducer,
  complaints: complaintsReducer,
});

export type RootState = ReturnType<typeof appReducer>;

const rootReducer = (
  state: RootState | undefined,
  action: AnyAction
): RootState => {
  if (action.type === RESET_STORE) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
