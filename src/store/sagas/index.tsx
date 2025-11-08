import { all } from "redux-saga/effects";
import authWatcherSaga from "./auth/loginSaga";
import otpVarifyWatcherSaga from "./auth/otpVarifySaga";
import resedOtpWatcherSaga from "./auth/resendOtpSaga";
import profileWatcherSaga from "./auth/profileSaga";
import territoryListWatcherSaga from "./auth/territoryListSaga";
import { watchGetAreaByPincode } from "./auth/areaByPincodeSaga";
import territorySubmissionWatcherSaga from "./auth/territorySubmissionSaga";
import deleteUserWatcherSaga from "./auth/deleteUserSaga";
import whoAmIWatcherSaga from "./auth/whoAmISaga";
import userDetailWatcherSaga from "./auth/userDetailSaga";
import commonImageWatcherSaga from "./commonImage/commonImageSaga";
import contactUploadWatcherSaga from "./contacts/contactUploadSaga";
import getContactListWatcherSaga from "./contacts/getContactListSaga";
import myContactListWatcherSaga from "./contacts/myContactListSaga";
import addContactWatcherSaga from "./contacts/addContactSaga";
import pulsesListWatcherSaga from "./pulses/pulsesListSaga";
import editProfileWatcherSaga from "./profile/editProfileSaga";
import changePhoneNumberWatcherSaga from "./profile/changePhoneNumberSaga";
import changePhoneNumberVerifyOtpWatcherSaga from "./profile/changePhoneNumberVerifyOtpSaga";
import getUserProfileWatcherSaga from "./profile/getUserProfileSaga";
import getDepartmentsListWatcherSaga from "./profile/getDepartmentsListSaga";
import getBranchesListWatcherSaga from "./profile/getBranchesListSaga";
import getDesignationsListWatcherSaga from "./profile/getDesignationsListSaga";
import getShiftManagementsListWatcherSaga from "./profile/getShiftManagementsListSaga";
import getSeatingOfficesListWatcherSaga from "./profile/getSeatingOfficesListSaga";
import createPropertyWatcherSaga from "./profile/createPropertySaga";
import getPropertyListWatcherSaga from "./profile/getPropertyListSaga";
import getProfessionalListWatcherSaga from "./profile/getProfessionalListSaga";
import createProfessionalWatcherSaga from "./profile/createProfessionalSaga";
// Society Management Sagas
import watchDashboard from "./dashboardSaga";
import watchNotices from "./noticesSaga";
import watchAmenities from "./amenitiesSaga";
import watchEvents from "./eventsSaga";
import watchMaintenance from "./maintenanceSaga";
import watchParking from "./parkingSaga";
import watchVisitors from "./visitorsSaga";
import watchComplaints from "./complaintsSaga";


export default function* rootSaga() {
  yield all([
    authWatcherSaga(),
    otpVarifyWatcherSaga(),
    resedOtpWatcherSaga(),
    profileWatcherSaga(),
    territoryListWatcherSaga(),

    watchGetAreaByPincode(),
    territorySubmissionWatcherSaga(),
    deleteUserWatcherSaga(),
    whoAmIWatcherSaga(),
    userDetailWatcherSaga(),
    commonImageWatcherSaga(),
    contactUploadWatcherSaga(),
    getContactListWatcherSaga(),
    myContactListWatcherSaga(),
    addContactWatcherSaga(),

    pulsesListWatcherSaga(),
    editProfileWatcherSaga(),
    changePhoneNumberWatcherSaga(),
    changePhoneNumberVerifyOtpWatcherSaga(),
    getUserProfileWatcherSaga(),
    getDepartmentsListWatcherSaga(),
    getBranchesListWatcherSaga(),
    getDesignationsListWatcherSaga(),
    getShiftManagementsListWatcherSaga(),
    getSeatingOfficesListWatcherSaga(),
    createPropertyWatcherSaga(),
    getPropertyListWatcherSaga(),

    getProfessionalListWatcherSaga(),
    createProfessionalWatcherSaga(),
    // memberListWatcherSaga(),

    // Society Management
    watchDashboard(),
    watchNotices(),
    watchAmenities(),
    watchEvents(),
    watchMaintenance(),
    watchParking(),
    watchVisitors(),
    watchComplaints(),
  ]);
}
