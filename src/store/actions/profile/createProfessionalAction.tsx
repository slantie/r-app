import { POST } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { CREATE_PROFESSIONAL } from "../../../services/httpService";
import * as types from "../../actionType";

export const createProfessionalAction = (professionalData: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(createProfessionalRequest());

      console.log('Create Professional Data:', professionalData);

      const response = await MakeApiRequest({
        apiUrl: CREATE_PROFESSIONAL,
        apiMethod: POST,
        apiData: professionalData,
      });

      dispatch(createProfessionalSuccess(response));
      return response;
    } catch (error: any) {
      dispatch(createProfessionalFailure(error));
      throw error;
    }
  };
};

export const createProfessionalRequest = () => ({
  type: types.CREATE_PROFESSIONAL_REQUEST,
});

export const createProfessionalSuccess = (payload: any) => ({
  type: types.CREATE_PROFESSIONAL_SUCCESS,
  payload,
});

export const createProfessionalFailure = (payload: any) => ({
  type: types.CREATE_PROFESSIONAL_FAILURE,
  payload,
});

export const createProfessionalClear = () => ({
  type: types.CREATE_PROFESSIONAL_CLEAR,
});

