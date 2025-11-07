import { GET } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { INVITE_CONTACT_LIST } from "../../../services/httpService";
import * as types from "../../actionType";

export const inviteContactListAction = (params?: { page?: number }) => {
    return async (dispatch: any) => {
      console.log("inviteContactList params", params);
      try {
        dispatch(inviteContactListRequest(params));
        const response = await MakeApiRequest({
          apiUrl: INVITE_CONTACT_LIST({ page: params?.page }),
          apiMethod: GET,
        });
        dispatch(inviteContactListSuccess(response));
        return response;
      } catch (error: any) {
        dispatch(inviteContactListFailure(error));
        throw error;
      }
    };
  };

export const inviteContactListRequest = (payload: any) => ({
    type: types.INVITE_CONTACT_LIST_REQUEST,
    payload,
});

export const inviteContactListSuccess = (payload: any) => ({
    type: types.INVITE_CONTACT_LIST_SUCCESS,
    payload,
});

export const inviteContactListFailure = (payload: any) => ({
    type: types.INVITE_CONTACT_LIST_FAILURE,
    payload,
});

export const inviteContactListClear = () => ({
    type: types.INVITE_CONTACT_LIST_CLEAR,
});