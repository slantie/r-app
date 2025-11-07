import * as types from "../../actionType";

const initialState = {
    loading: false,
    territorySubmissionData: undefined,
    error: {},
};

const territorySubmissionReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.TERRITORY_SUBMISSION_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case types.TERRITORY_SUBMISSION_SUCCESS:
            return {
                ...state,
                loading: false,
                territorySubmissionData: action.payload
            };
        case types.TERRITORY_SUBMISSION_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case types.TERRITORY_SUBMISSION_CLEAR:
            return {
                ...state,
                loading: false,
                error: {},
                territorySubmissionData: undefined
            };
        default:
            return state;
    }
};

export default territorySubmissionReducer;