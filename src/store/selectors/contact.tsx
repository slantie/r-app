import { RootState } from "../reducers";

export const selectContactListData = (state: RootState) => state.getContactList?.contactListData;
export const selectContactListLoading = (state: RootState) => state.getContactList?.loading;
export const selectContactListError = (state: RootState) => state.getContactList?.error;