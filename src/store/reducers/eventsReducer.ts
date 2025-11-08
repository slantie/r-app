import {
    FETCH_EVENTS,
    FETCH_EVENTS_SUCCESS,
    FETCH_EVENTS_FAILURE,
    FETCH_EVENT_DETAILS,
    FETCH_EVENT_DETAILS_SUCCESS,
    FETCH_EVENT_DETAILS_FAILURE,
    REGISTER_FOR_EVENT,
    REGISTER_FOR_EVENT_SUCCESS,
    REGISTER_FOR_EVENT_FAILURE,
    FETCH_MY_REGISTRATIONS,
    FETCH_MY_REGISTRATIONS_SUCCESS,
    FETCH_MY_REGISTRATIONS_FAILURE,
    CANCEL_REGISTRATION,
    CANCEL_REGISTRATION_SUCCESS,
    CANCEL_REGISTRATION_FAILURE,
    RESET_EVENTS
} from '../actions/events/eventsAction';

interface EventsState {
    loading: boolean;
    events: any[];
    eventDetails: any;
    myRegistrations: any[];
    error: string | null;
    registering: boolean;
    cancelling: boolean;
}

const initialState: EventsState = {
    loading: false,
    events: [],
    eventDetails: null,
    myRegistrations: [],
    error: null,
    registering: false,
    cancelling: false
};

const eventsReducer = (state = initialState, action: any): EventsState => {
    switch (action.type) {
        case FETCH_EVENTS:
        case FETCH_EVENT_DETAILS:
        case FETCH_MY_REGISTRATIONS:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_EVENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                events: action.payload,
                error: null
            };

        case FETCH_EVENT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                eventDetails: action.payload,
                error: null
            };

        case FETCH_MY_REGISTRATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                myRegistrations: action.payload,
                error: null
            };

        case REGISTER_FOR_EVENT:
            return {
                ...state,
                registering: true,
                error: null
            };

        case REGISTER_FOR_EVENT_SUCCESS:
            return {
                ...state,
                registering: false,
                error: null
            };

        case CANCEL_REGISTRATION:
            return {
                ...state,
                cancelling: true,
                error: null
            };

        case CANCEL_REGISTRATION_SUCCESS:
            return {
                ...state,
                cancelling: false,
                error: null
            };

        case FETCH_EVENTS_FAILURE:
        case FETCH_EVENT_DETAILS_FAILURE:
        case FETCH_MY_REGISTRATIONS_FAILURE:
        case REGISTER_FOR_EVENT_FAILURE:
        case CANCEL_REGISTRATION_FAILURE:
            return {
                ...state,
                loading: false,
                registering: false,
                cancelling: false,
                error: action.payload
            };

        case RESET_EVENTS:
            return initialState;

        default:
            return state;
    }
};

export default eventsReducer;
