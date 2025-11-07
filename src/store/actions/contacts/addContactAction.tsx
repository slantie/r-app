import { POST } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { ADD_CONTACT } from "../../../services/httpService";
import * as types from "../../actionType";

export const addContactAction = (contactData: { userId: string }) => {
    return async (dispatch: any) => {
      try {
        dispatch(addContactRequest(contactData));
        const response = await MakeApiRequest({
          apiUrl: ADD_CONTACT,
          apiMethod: POST,
          apiData: contactData,
        });
        dispatch(addContactSuccess(response));
        return response;
      } catch (error: any) {
        dispatch(addContactFailure(error));
        throw error;
      }
    };
  };

export const addContactRequest = (payload: any) => ({
    type: types.ADD_CONTACT_REQUEST,
    payload,
});

export const addContactSuccess = (payload: any) => ({
    type: types.ADD_CONTACT_SUCCESS,
    payload,
});

export const addContactFailure = (payload: any) => ({
    type: types.ADD_CONTACT_FAILURE,
    payload,
});

export const addContactClear = () => ({
    type: types.ADD_CONTACT_CLEAR,
});