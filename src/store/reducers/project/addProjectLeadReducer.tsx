import * as types from "../../actionType";

const initialState = {
    loading: false,
    addProjectLeadData: null,
    error: null,
};

const addProjectLeadReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.ADD_PROJECT_LEAD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case types.ADD_PROJECT_LEAD_SUCCESS:
            return {
                ...state,
                loading: false,
                addProjectLeadData: action.payload,
                error: null,
            };
        case types.ADD_PROJECT_LEAD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case types.ADD_PROJECT_LEAD_CLEAR:
            return {
                ...initialState,
            };
        default:
            return state;
    }
};

export default addProjectLeadReducer;