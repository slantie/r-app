import * as types from "../../actionType";

const initialState = {
    loading: false,
    feedbackData: null,
    error: null,
};

const feedbackReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.FEEDBACK_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case types.FEEDBACK_SUCCESS:
            return {
                ...state,
                loading: false,
                feedbackData: action.payload,
                error: null,
            };
        case types.FEEDBACK_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case types.FEEDBACK_CLEAR:
            return {
                ...initialState,
            };
        default:
            return state;
    }
};

export default feedbackReducer;