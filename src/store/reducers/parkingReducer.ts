import {
    FETCH_MY_PARKING_SPOT,
    FETCH_MY_PARKING_SPOT_SUCCESS,
    FETCH_MY_PARKING_SPOT_FAILURE,
    REQUEST_PARKING_SPOT,
    REQUEST_PARKING_SPOT_SUCCESS,
    REQUEST_PARKING_SPOT_FAILURE,
    FETCH_MY_PARKING_REQUESTS,
    FETCH_MY_PARKING_REQUESTS_SUCCESS,
    FETCH_MY_PARKING_REQUESTS_FAILURE,
    CANCEL_PARKING_REQUEST,
    CANCEL_PARKING_REQUEST_SUCCESS,
    CANCEL_PARKING_REQUEST_FAILURE,
    RESET_PARKING
} from '../actions/parking/parkingAction';

interface ParkingState {
    loading: boolean;
    mySpot: any;
    myRequests: any[];
    error: string | null;
    requesting: boolean;
    cancelling: boolean;
}

const initialState: ParkingState = {
    loading: false,
    mySpot: null,
    myRequests: [],
    error: null,
    requesting: false,
    cancelling: false
};

const parkingReducer = (state = initialState, action: any): ParkingState => {
    switch (action.type) {
        case FETCH_MY_PARKING_SPOT:
        case FETCH_MY_PARKING_REQUESTS:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_MY_PARKING_SPOT_SUCCESS:
            return {
                ...state,
                loading: false,
                mySpot: action.payload,
                error: null
            };

        case FETCH_MY_PARKING_REQUESTS_SUCCESS:
            return {
                ...state,
                loading: false,
                myRequests: action.payload,
                error: null
            };

        case REQUEST_PARKING_SPOT:
            return {
                ...state,
                requesting: true,
                error: null
            };

        case REQUEST_PARKING_SPOT_SUCCESS:
            return {
                ...state,
                requesting: false,
                error: null
            };

        case CANCEL_PARKING_REQUEST:
            return {
                ...state,
                cancelling: true,
                error: null
            };

        case CANCEL_PARKING_REQUEST_SUCCESS:
            return {
                ...state,
                cancelling: false,
                error: null
            };

        case FETCH_MY_PARKING_SPOT_FAILURE:
        case FETCH_MY_PARKING_REQUESTS_FAILURE:
        case REQUEST_PARKING_SPOT_FAILURE:
        case CANCEL_PARKING_REQUEST_FAILURE:
            return {
                ...state,
                loading: false,
                requesting: false,
                cancelling: false,
                error: action.payload
            };

        case RESET_PARKING:
            return initialState;

        default:
            return state;
    }
};

export default parkingReducer;
