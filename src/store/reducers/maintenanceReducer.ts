import {
    FETCH_BILLS,
    FETCH_BILLS_SUCCESS,
    FETCH_BILLS_FAILURE,
    FETCH_BILL_DETAILS,
    FETCH_BILL_DETAILS_SUCCESS,
    FETCH_BILL_DETAILS_FAILURE,
    PAY_BILL,
    PAY_BILL_SUCCESS,
    PAY_BILL_FAILURE,
    FETCH_PAYMENT_HISTORY,
    FETCH_PAYMENT_HISTORY_SUCCESS,
    FETCH_PAYMENT_HISTORY_FAILURE,
    RESET_MAINTENANCE
} from '../actions/maintenance/maintenanceAction';

interface MaintenanceState {
    loading: boolean;
    bills: any[];
    billDetails: any;
    paymentHistory: any[];
    error: string | null;
    paying: boolean;
}

const initialState: MaintenanceState = {
    loading: false,
    bills: [],
    billDetails: null,
    paymentHistory: [],
    error: null,
    paying: false
};

const maintenanceReducer = (state = initialState, action: any): MaintenanceState => {
    switch (action.type) {
        case FETCH_BILLS:
        case FETCH_BILL_DETAILS:
        case FETCH_PAYMENT_HISTORY:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_BILLS_SUCCESS:
            return {
                ...state,
                loading: false,
                bills: action.payload,
                error: null
            };

        case FETCH_BILL_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                billDetails: action.payload,
                error: null
            };

        case FETCH_PAYMENT_HISTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                paymentHistory: action.payload,
                error: null
            };

        case PAY_BILL:
            return {
                ...state,
                paying: true,
                error: null
            };

        case PAY_BILL_SUCCESS:
            return {
                ...state,
                paying: false,
                error: null
            };

        case FETCH_BILLS_FAILURE:
        case FETCH_BILL_DETAILS_FAILURE:
        case FETCH_PAYMENT_HISTORY_FAILURE:
        case PAY_BILL_FAILURE:
            return {
                ...state,
                loading: false,
                paying: false,
                error: action.payload
            };

        case RESET_MAINTENANCE:
            return initialState;

        default:
            return state;
    }
};

export default maintenanceReducer;
