import { RootState } from '../reducers';

export const selectTerritoryListData = (state: RootState) => state.territoryList?.territoryListData;
export const selectTerritoryListLoading = (state: RootState) => state.territoryList?.loading;
export const selectTerritoryListError = (state: RootState) => state.territoryList?.error;

export const selectAreaByPincodeData = (state: RootState) => state.areaByPincode?.data;
export const selectAreaByPincodeLocalities = (state: RootState) => state.areaByPincode?.localities;
export const selectAreaByPincodeLoading = (state: RootState) => state.areaByPincode?.loading;
export const selectAreaByPincodeError = (state: RootState) => state.areaByPincode?.error;

export const selectTerritorySubmissionData = (state: RootState) => state.territorySubmission?.territorySubmissionData;
export const selectTerritorySubmissionLoading = (state: RootState) => state.territorySubmission?.loading;
export const selectTerritorySubmissionError = (state: RootState) => state.territorySubmission?.error;

// Project List selectors
export const selectProjectListData = (state: RootState) => state.projectList?.projectListData;
export const selectProjectListLoading = (state: RootState) => state.projectList?.loading;
export const selectProjectListError = (state: RootState) => state.projectList?.error;
export const selectProjectListProjects = (state: RootState) => state.projectList?.projects || [];
export const selectProjectListPagination = (state: RootState) => state.projectList?.pagination;

// Delete User selectors
export const selectDeleteUserData = (state: RootState) => state.deleteUser?.deleteUserData;
export const selectDeleteUserLoading = (state: RootState) => state.deleteUser?.loading;
export const selectDeleteUserError = (state: RootState) => state.deleteUser?.error;

// Who Am I selectors
export const selectWhoAmIData = (state: RootState) => state.whoAmI?.whoAmIData;
export const selectWhoAmILoading = (state: RootState) => state.whoAmI?.loading;
export const selectWhoAmIError = (state: RootState) => state.whoAmI?.error;

// User Detail selectors
export const selectUserDetailData = (state: RootState) => state.userDetail?.userDetailData;
export const selectUserDetailLoading = (state: RootState) => state.userDetail?.loading;
export const selectUserDetailError = (state: RootState) => state.userDetail?.error;
