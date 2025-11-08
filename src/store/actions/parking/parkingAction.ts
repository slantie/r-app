// Parking Action Types
export const FETCH_MY_PARKING_SPOT = 'FETCH_MY_PARKING_SPOT';
export const FETCH_MY_PARKING_SPOT_SUCCESS = 'FETCH_MY_PARKING_SPOT_SUCCESS';
export const FETCH_MY_PARKING_SPOT_FAILURE = 'FETCH_MY_PARKING_SPOT_FAILURE';

export const REQUEST_PARKING_SPOT = 'REQUEST_PARKING_SPOT';
export const REQUEST_PARKING_SPOT_SUCCESS = 'REQUEST_PARKING_SPOT_SUCCESS';
export const REQUEST_PARKING_SPOT_FAILURE = 'REQUEST_PARKING_SPOT_FAILURE';

export const FETCH_MY_PARKING_REQUESTS = 'FETCH_MY_PARKING_REQUESTS';
export const FETCH_MY_PARKING_REQUESTS_SUCCESS = 'FETCH_MY_PARKING_REQUESTS_SUCCESS';
export const FETCH_MY_PARKING_REQUESTS_FAILURE = 'FETCH_MY_PARKING_REQUESTS_FAILURE';

export const CANCEL_PARKING_REQUEST = 'CANCEL_PARKING_REQUEST';
export const CANCEL_PARKING_REQUEST_SUCCESS = 'CANCEL_PARKING_REQUEST_SUCCESS';
export const CANCEL_PARKING_REQUEST_FAILURE = 'CANCEL_PARKING_REQUEST_FAILURE';

export const RESET_PARKING = 'RESET_PARKING';

// Action Creators
export const fetchMyParkingSpot = (unitId: string) => ({
    type: FETCH_MY_PARKING_SPOT,
    payload: { unitId }
});

export const fetchMyParkingSpotSuccess = (data: any) => ({
    type: FETCH_MY_PARKING_SPOT_SUCCESS,
    payload: data
});

export const fetchMyParkingSpotFailure = (error: string) => ({
    type: FETCH_MY_PARKING_SPOT_FAILURE,
    payload: error
});

export const requestParkingSpot = (unitId: string, vehicleType: string, vehicleNumber: string, remarks?: string) => ({
    type: REQUEST_PARKING_SPOT,
    payload: { unitId, vehicleType, vehicleNumber, remarks }
});

export const requestParkingSpotSuccess = (data: any) => ({
    type: REQUEST_PARKING_SPOT_SUCCESS,
    payload: data
});

export const requestParkingSpotFailure = (error: string) => ({
    type: REQUEST_PARKING_SPOT_FAILURE,
    payload: error
});

export const fetchMyParkingRequests = (unitId: string) => ({
    type: FETCH_MY_PARKING_REQUESTS,
    payload: { unitId }
});

export const fetchMyParkingRequestsSuccess = (data: any) => ({
    type: FETCH_MY_PARKING_REQUESTS_SUCCESS,
    payload: data
});

export const fetchMyParkingRequestsFailure = (error: string) => ({
    type: FETCH_MY_PARKING_REQUESTS_FAILURE,
    payload: error
});

export const cancelParkingRequest = (requestId: string) => ({
    type: CANCEL_PARKING_REQUEST,
    payload: { requestId }
});

export const cancelParkingRequestSuccess = (data: any) => ({
    type: CANCEL_PARKING_REQUEST_SUCCESS,
    payload: data
});

export const cancelParkingRequestFailure = (error: string) => ({
    type: CANCEL_PARKING_REQUEST_FAILURE,
    payload: error
});

export const resetParking = () => ({
    type: RESET_PARKING
});
