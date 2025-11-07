// Profile selectors
export const selectEditProfile = (state: any) => state.editProfile;
export const selectEditProfileLoading = (state: any) => state.editProfile.loading;
export const selectEditProfileData = (state: any) => state.editProfile.editProfileData;
export const selectEditProfileError = (state: any) => state.editProfile.error;

// Change Phone Number selectors
export const selectChangePhoneNumber = (state: any) => state.changePhoneNumber;
export const selectChangePhoneNumberLoading = (state: any) => state.changePhoneNumber.loading;
export const selectChangePhoneNumberData = (state: any) => state.changePhoneNumber.changePhoneNumberData;
export const selectChangePhoneNumberError = (state: any) => state.changePhoneNumber.error;

// Change Phone Number Verify OTP selectors
export const selectChangePhoneNumberVerifyOtp = (state: any) => state.changePhoneNumberVerifyOtp;
export const selectChangePhoneNumberVerifyOtpLoading = (state: any) => state.changePhoneNumberVerifyOtp.loading;
export const selectChangePhoneNumberVerifyOtpData = (state: any) => state.changePhoneNumberVerifyOtp.changePhoneNumberVerifyOtpData;
export const selectChangePhoneNumberVerifyOtpError = (state: any) => state.changePhoneNumberVerifyOtp.error;

// Get User Profile selectors
export const selectGetUserProfile = (state: any) => state.getUserProfile;
export const selectGetUserProfileLoading = (state: any) => state.getUserProfile.loading;
export const selectGetUserProfileData = (state: any) => state.getUserProfile.getUserProfileData;
export const selectGetUserProfileError = (state: any) => state.getUserProfile.error;

// Departments List selectors
export const selectGetDepartmentsList = (state: any) => state.getDepartmentsList;
export const selectGetDepartmentsListLoading = (state: any) => state.getDepartmentsList.loading;
export const selectGetDepartmentsListData = (state: any) => state.getDepartmentsList.getDepartmentsListData;
export const selectGetDepartmentsListError = (state: any) => state.getDepartmentsList.error;

// Branches List selectors
export const selectGetBranchesList = (state: any) => state.getBranchesList;
export const selectGetBranchesListLoading = (state: any) => state.getBranchesList.loading;
export const selectGetBranchesListData = (state: any) => state.getBranchesList.getBranchesListData;
export const selectGetBranchesListError = (state: any) => state.getBranchesList.error;
export const selectGetBranchesListCurrentPage = (state: any) => state.getBranchesList.currentPage;
export const selectGetBranchesListHasMore = (state: any) => state.getBranchesList.hasMore;

// Designations List selectors
export const selectGetDesignationsList = (state: any) => state.getDesignationsList;
export const selectGetDesignationsListLoading = (state: any) => state.getDesignationsList.loading;
export const selectGetDesignationsListData = (state: any) => state.getDesignationsList.getDesignationsListData;
export const selectGetDesignationsListError = (state: any) => state.getDesignationsList.error;
export const selectGetDesignationsListCurrentPage = (state: any) => state.getDesignationsList.currentPage;
export const selectGetDesignationsListHasMore = (state: any) => state.getDesignationsList.hasMore;

// Shift Managements List selectors
export const selectGetShiftManagementsList = (state: any) => state.getShiftManagementsList;
export const selectGetShiftManagementsListLoading = (state: any) => state.getShiftManagementsList.loading;
export const selectGetShiftManagementsListData = (state: any) => state.getShiftManagementsList.getShiftManagementsListData;
export const selectGetShiftManagementsListError = (state: any) => state.getShiftManagementsList.error;
export const selectGetShiftManagementsListCurrentPage = (state: any) => state.getShiftManagementsList.currentPage;
export const selectGetShiftManagementsListHasMore = (state: any) => state.getShiftManagementsList.hasMore;

// Seating Offices List selectors
export const selectGetSeatingOfficesList = (state: any) => state.getSeatingOfficesList;
export const selectGetSeatingOfficesListLoading = (state: any) => state.getSeatingOfficesList.loading;
export const selectGetSeatingOfficesListData = (state: any) => state.getSeatingOfficesList.getSeatingOfficesListData;
export const selectGetSeatingOfficesListError = (state: any) => state.getSeatingOfficesList.error;

// Create Property selectors
export const selectCreateProperty = (state: any) => state.createProperty;
export const selectCreatePropertyLoading = (state: any) => state.createProperty.loading;
export const selectCreatePropertyData = (state: any) => state.createProperty.createPropertyData;
export const selectCreatePropertyError = (state: any) => state.createProperty.error;

// Property List selectors
export const selectPropertyList = (state: any) => state.propertyList;
export const selectPropertyListLoading = (state: any) => state.propertyList.loading;
export const selectPropertyListData = (state: any) => state.propertyList.data;
export const selectPropertyListError = (state: any) => state.propertyList.error;

// Professional List selectors
export const selectGetProfessionalList = (state: any) => state.getProfessionalList;
export const selectGetProfessionalListLoading = (state: any) => state.getProfessionalList.loading;
export const selectGetProfessionalListData = (state: any) => state.getProfessionalList.getProfessionalListData;
export const selectGetProfessionalListError = (state: any) => state.getProfessionalList.error;
export const selectGetProfessionalListCurrentPage = (state: any) => state.getProfessionalList.currentPage;
export const selectGetProfessionalListHasMore = (state: any) => state.getProfessionalList.hasMore;

// Create Professional selectors
export const selectCreateProfessional = (state: any) => state.createProfessional;
export const selectCreateProfessionalLoading = (state: any) => state.createProfessional.loading;
export const selectCreateProfessionalData = (state: any) => state.createProfessional.createProfessionalData;
export const selectCreateProfessionalError = (state: any) => state.createProfessional.error;
