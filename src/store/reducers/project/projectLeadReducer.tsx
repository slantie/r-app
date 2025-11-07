import * as types from "../../actionType";

const initialState = {
    loading: false,
    projectLeadData: null,
    error: null,
};

const projectLeadReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.PROJECT_LEAD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case types.PROJECT_LEAD_SUCCESS:
            return {
                ...state,
                loading: false,
                projectLeadData: action.payload,
                error: null,
            };
        case types.PROJECT_LEAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case types.PROJECT_LEAD_CLEAR:
            return {
                ...initialState,
            };
        default:
            return state;
    }
};

export default projectLeadReducer;
