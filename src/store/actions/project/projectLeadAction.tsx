import { POST } from "../../../constants/api";
import { MakeApiRequest } from "../../../services/apiService";
import { PROJECT_LEAD } from "../../../services/httpService";
import * as types from "../../actionType";

export interface ProjectLeadPayload {
    alternatePhoneNumber: string;
    alternatecountryCode: string;
    areaRequired: string;
    budget: string;
    buyingTime: string;
    comments: string;
    countryCode: string;
    email: string;
    firstName: string;
    lastName: string;
    leadType: string;
    location: string;
    phoneNumber: string;
    priority: string;
    projectCategory: string;
    projectId: string;
    projectName: string;
    referralCCode: string;
    referralId: string;
    referralName: string;
    referralPhoneNumber: string;
    referralType: string;
    secondaryProjectId: string;
    secondaryProjectName: string;
    slug: string;
    sourceName: string;
    subSourceName: string;
    unitType: string;
}

export const projectLeadAction = (payload: ProjectLeadPayload) => {
    return async (dispatch: any) => {
        try {
            dispatch(projectLeadRequest());

            const response = await MakeApiRequest({
                apiUrl: PROJECT_LEAD,
                apiMethod: POST,
                apiData: payload,
            });
            dispatch(projectLeadSuccess(response));
            return response;
        } catch (error: any) {
            dispatch(projectLeadFailure(error));
            throw error;
        }
    };
};

export const projectLeadRequest = () => ({
    type: types.PROJECT_LEAD_REQUEST,
});

export const projectLeadSuccess = (payload: any) => ({
    type: types.PROJECT_LEAD_SUCCESS,
    payload,
});

export const projectLeadFailure = (payload: any) => ({
    type: types.PROJECT_LEAD_FAILURE,
    payload,
});

export const projectLeadClear = () => ({
    type: types.PROJECT_LEAD_CLEAR,
});
