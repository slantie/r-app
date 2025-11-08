import { apiSubmitTerritoryDetails } from "../../../services/apiServiceWrapper";
import * as types from "../../actionType";
import { TERRITORY } from "../../../services/httpService";

export const territorySubmissionAction = (payload: any) => {
    return async (dispatch: any) => {
      try {
        dispatch(territorySubmissionRequest(payload));
        // Use enhanced API wrapper with mock support
        const response = await apiSubmitTerritoryDetails(TERRITORY, payload);
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