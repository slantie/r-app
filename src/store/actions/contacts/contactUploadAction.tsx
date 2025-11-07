import { POST } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { CONTACT_UPLOAD } from "../../../services/httpService";
import * as types from "../../actionType";

export const contactUploadAction = (contactData: any) => {
    return async (dispatch: any) => {
      console.log("contactData", contactData);
      try {
        dispatch(contactUploadRequest(contactData));
        const response = await MakeApiRequest({
          apiUrl: CONTACT_UPLOAD,
          apiMethod: POST,
          apiData: contactData,
        });
        dispatch(contactUploadSuccess(response));
        return response;
      } catch (error: any) {
        dispatch(contactUploadFailure(error));
        throw error;
      }
    };
  };

export const contactUploadRequest = (payload: any) => ({
    type: types.CONTACT_UPLOAD_REQUEST,
    payload,
});

export const contactUploadSuccess = (payload: any) => ({
    type: types.CONTACT_UPLOAD_SUCCESS,
    payload,
});

export const contactUploadFailure = (payload: any) => ({
    type: types.CONTACT_UPLOAD_FAILURE,
    payload,
});

export const contactUploadClear = () => ({
    type: types.CONTACT_UPLOAD_CLEAR,
});
