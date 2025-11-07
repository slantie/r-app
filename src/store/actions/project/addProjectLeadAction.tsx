import { POST } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { ADD_PROJECT_LEAD } from "../../../services/httpService";
import * as types from "../../actionType";

export interface AddProjectLeadPayload {
    projectId: string;
    selectType: string;
    firstName: string;
    lastName: string;
    email: string;
    countryCode: string;
    phoneNumber: string;
    interestedIn: string;
    userType: string;
    referralId?: string;
    sourceName: string,
    subSourceName: string,
}

export const addProjectLeadAction = (payload: AddProjectLeadPayload) => {
    return async (dispatch: any) => {
        try {
            dispatch(addProjectLeadRequest());

            const apiUrl = ADD_PROJECT_LEAD;

            const response = await MakeApiRequest({
                apiUrl,
                apiMethod: POST,
                apiData: payload,
            });
            dispatch(addProjectLeadSuccess(response));
            return response;
        } catch (error: any) {
            dispatch(addProjectLeadFailure(error));
            throw error;
        }
    };
};

export const addProjectLeadRequest = () => ({
    type: types.ADD_PROJECT_LEAD_REQUEST,
});

export const addProjectLeadSuccess = (payload: any) => ({
    type: types.ADD_PROJECT_LEAD_SUCCESS,
    payload,
});

export const addProjectLeadFailure = (payload: any) => ({
    type: types.ADD_PROJECT_LEAD_FAILURE,
    payload,
});

export const addProjectLeadClear = () => ({
    type: types.ADD_PROJECT_LEAD_CLEAR,
});