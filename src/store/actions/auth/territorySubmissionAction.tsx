import { useSelector } from "react-redux";
import { POST } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import * as types from "../../actionType";
import { TERRITORY } from "../../../services/httpService";

export const territorySubmissionAction = (payload: any) => {
    return async (dispatch: any) => {
      try {
        dispatch(territorySubmissionRequest(payload));
        const response = await MakeApiRequest({
          apiUrl: TERRITORY,
          apiMethod: POST,
          apiData: payload,
        });
        console.log("Territory submission response:", response.data);
        dispatch(territorySubmissionSuccess(response.data));
        return response;
      } catch (error: any) {
        dispatch(territorySubmissionFailure(error));
        throw error;
      }
    };
  };

export const territorySubmissionRequest = (payload: any) => ({
    type: types.TERRITORY_SUBMISSION_REQUEST,
    payload: payload,
});

export const territorySubmissionSuccess = (data: any) => ({
    type: types.TERRITORY_SUBMISSION_SUCCESS,
    payload: data,
});

export const territorySubmissionFailure = (error: string) => ({
    type: types.TERRITORY_SUBMISSION_FAILURE,
    payload: error,
});

export const territorySubmissionClear = () => ({
    type: types.TERRITORY_SUBMISSION_CLEAR,
});