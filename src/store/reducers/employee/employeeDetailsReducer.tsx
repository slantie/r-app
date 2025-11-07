import * as types from "../../actionType";

const initialState = {
    loading: false,
    employeeDetailsData: undefined,
    error: {},
};

const employeeDetailsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.EMPLOYEE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case types.EMPLOYEE_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                employeeDetailsData: action.payload
            };
        case types.EMPLOYEE_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case types.EMPLOYEE_DETAILS_CLEAR:
            return {
                ...state,
                loading: false,
                error: {},
                employeeDetailsData: undefined
            };
        default:
            return state;
    }
};

export default employeeDetailsReducer;
