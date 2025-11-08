// Events Action Types
export const FETCH_EVENTS = 'FETCH_EVENTS';
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE';

export const FETCH_EVENT_DETAILS = 'FETCH_EVENT_DETAILS';
export const FETCH_EVENT_DETAILS_SUCCESS = 'FETCH_EVENT_DETAILS_SUCCESS';
export const FETCH_EVENT_DETAILS_FAILURE = 'FETCH_EVENT_DETAILS_FAILURE';

export const REGISTER_FOR_EVENT = 'REGISTER_FOR_EVENT';
export const REGISTER_FOR_EVENT_SUCCESS = 'REGISTER_FOR_EVENT_SUCCESS';
export const REGISTER_FOR_EVENT_FAILURE = 'REGISTER_FOR_EVENT_FAILURE';

export const FETCH_MY_REGISTRATIONS = 'FETCH_MY_REGISTRATIONS';
export const FETCH_MY_REGISTRATIONS_SUCCESS = 'FETCH_MY_REGISTRATIONS_SUCCESS';
export const FETCH_MY_REGISTRATIONS_FAILURE = 'FETCH_MY_REGISTRATIONS_FAILURE';

export const CANCEL_REGISTRATION = 'CANCEL_REGISTRATION';
export const CANCEL_REGISTRATION_SUCCESS = 'CANCEL_REGISTRATION_SUCCESS';
export const CANCEL_REGISTRATION_FAILURE = 'CANCEL_REGISTRATION_FAILURE';

export const RESET_EVENTS = 'RESET_EVENTS';

// Action Creators
export const fetchEvents = (buildingId: string) => ({
    type: FETCH_EVENTS,
    payload: { buildingId }
});

export const fetchEventsSuccess = (data: any) => ({
    type: FETCH_EVENTS_SUCCESS,
    payload: data
});

export const fetchEventsFailure = (error: string) => ({
    type: FETCH_EVENTS_FAILURE,
    payload: error
});

export const fetchEventDetails = (id: string) => ({
    type: FETCH_EVENT_DETAILS,
    payload: { id }
});

export const fetchEventDetailsSuccess = (data: any) => ({
    type: FETCH_EVENT_DETAILS_SUCCESS,
    payload: data
});

export const fetchEventDetailsFailure = (error: string) => ({
    type: FETCH_EVENT_DETAILS_FAILURE,
    payload: error
});

export const registerForEvent = (eventId: string, memberId: string, numberOfGuests: number, unitId: string) => ({
    type: REGISTER_FOR_EVENT,
    payload: { eventId, memberId, numberOfGuests, unitId }
});

export const registerForEventSuccess = (data: any) => ({
    type: REGISTER_FOR_EVENT_SUCCESS,
    payload: data
});

export const registerForEventFailure = (error: string) => ({
    type: REGISTER_FOR_EVENT_FAILURE,
    payload: error
});

export const fetchMyRegistrations = (memberId: string) => ({
    type: FETCH_MY_REGISTRATIONS,
    payload: { memberId }
});

export const fetchMyRegistrationsSuccess = (data: any) => ({
    type: FETCH_MY_REGISTRATIONS_SUCCESS,
    payload: data
});

export const fetchMyRegistrationsFailure = (error: string) => ({
    type: FETCH_MY_REGISTRATIONS_FAILURE,
    payload: error
});

export const cancelRegistration = (registrationId: string) => ({
    type: CANCEL_REGISTRATION,
    payload: { registrationId }
});

export const cancelRegistrationSuccess = (data: any) => ({
    type: CANCEL_REGISTRATION_SUCCESS,
    payload: data
});

export const cancelRegistrationFailure = (error: string) => ({
    type: CANCEL_REGISTRATION_FAILURE,
    payload: error
});

export const resetEvents = () => ({
    type: RESET_EVENTS
});
