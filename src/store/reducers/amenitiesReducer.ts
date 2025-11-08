import {
    FETCH_AMENITIES,
    FETCH_AMENITIES_SUCCESS,
    FETCH_AMENITIES_FAILURE,
    FETCH_AMENITY_DETAILS,
    FETCH_AMENITY_DETAILS_SUCCESS,
    FETCH_AMENITY_DETAILS_FAILURE,
    FETCH_AVAILABLE_SLOTS,
    FETCH_AVAILABLE_SLOTS_SUCCESS,
    FETCH_AVAILABLE_SLOTS_FAILURE,
    BOOK_AMENITY_SLOT,
    BOOK_AMENITY_SLOT_SUCCESS,
    BOOK_AMENITY_SLOT_FAILURE,
    FETCH_MY_BOOKINGS,
    FETCH_MY_BOOKINGS_SUCCESS,
    FETCH_MY_BOOKINGS_FAILURE,
    CANCEL_BOOKING,
    CANCEL_BOOKING_SUCCESS,
    CANCEL_BOOKING_FAILURE,
    RESET_AMENITIES
} from '../actions/amenities/amenitiesAction';

interface AmenitiesState {
    loading: boolean;
    amenities: any[];
    amenityDetails: any;
    availableSlots: any[];
    myBookings: any[];
    error: string | null;
    booking: boolean;
    cancelling: boolean;
}

const initialState: AmenitiesState = {
    loading: false,
    amenities: [],
    amenityDetails: null,
    availableSlots: [],
    myBookings: [],
    error: null,
    booking: false,
    cancelling: false
};

const amenitiesReducer = (state = initialState, action: any): AmenitiesState => {
    switch (action.type) {
        case FETCH_AMENITIES:
        case FETCH_AMENITY_DETAILS:
        case FETCH_AVAILABLE_SLOTS:
        case FETCH_MY_BOOKINGS:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_AMENITIES_SUCCESS:
            return {
                ...state,
                loading: false,
                amenities: action.payload,
                error: null
            };

        case FETCH_AMENITY_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                amenityDetails: action.payload,
                error: null
            };

        case FETCH_AVAILABLE_SLOTS_SUCCESS:
            return {
                ...state,
                loading: false,
                availableSlots: action.payload,
                error: null
            };

        case FETCH_MY_BOOKINGS_SUCCESS:
            return {
                ...state,
                loading: false,
                myBookings: action.payload,
                error: null
            };

        case BOOK_AMENITY_SLOT:
            return {
                ...state,
                booking: true,
                error: null
            };

        case BOOK_AMENITY_SLOT_SUCCESS:
            return {
                ...state,
                booking: false,
                error: null
            };

        case CANCEL_BOOKING:
            return {
                ...state,
                cancelling: true,
                error: null
            };

        case CANCEL_BOOKING_SUCCESS:
            return {
                ...state,
                cancelling: false,
                error: null
            };

        case FETCH_AMENITIES_FAILURE:
        case FETCH_AMENITY_DETAILS_FAILURE:
        case FETCH_AVAILABLE_SLOTS_FAILURE:
        case FETCH_MY_BOOKINGS_FAILURE:
        case BOOK_AMENITY_SLOT_FAILURE:
        case CANCEL_BOOKING_FAILURE:
            return {
                ...state,
                loading: false,
                booking: false,
                cancelling: false,
                error: action.payload
            };

        case RESET_AMENITIES:
            return initialState;

        default:
            return state;
    }
};

export default amenitiesReducer;
