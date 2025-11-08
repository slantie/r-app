import { call, put, takeLatest } from 'redux-saga/effects';
import { MakeApiRequest } from '../../services/apiService';
import { GET, POST, DELETE } from '../../constants/api';
import {
  FETCH_MY_PARKING_SPOT,
  REQUEST_PARKING_SPOT,
  FETCH_MY_PARKING_REQUESTS,
  CANCEL_PARKING_REQUEST,
  fetchMyParkingSpotSuccess,
  fetchMyParkingSpotFailure,
  requestParkingSpotSuccess,
  requestParkingSpotFailure,
  fetchMyParkingRequestsSuccess,
  fetchMyParkingRequestsFailure,
  cancelParkingRequestSuccess,
  cancelParkingRequestFailure,
} from '../actions/parking/parkingAction';

const API_BASE_URL = 'http://10.0.2.2:5000/api'; // Android emulator
// const API_BASE_URL = 'http://localhost:5000/api'; // iOS simulator

// Fetch My Parking Spot
function* fetchMyParkingSpotSaga(action: any): Generator<any, void, any> {
  try {
    const { unitId } = action.payload;

    const response = yield call(MakeApiRequest, {
      apiUrl: `${API_BASE_URL}/resident/parking/my-spot`,
      apiMethod: GET,
      apiParams: { unitId },
    });

    yield put(fetchMyParkingSpotSuccess(response.data));
  } catch (error: any) {
    yield put(
      fetchMyParkingSpotFailure(
        error.message || 'Failed to fetch parking spot',
      ),
    );
  }
}

// Request Parking Spot
function* requestParkingSpotSaga(action: any): Generator<any, void, any> {
  try {
    const { unitId, vehicleType, vehicleNumber, remarks } = action.payload;

    const response = yield call(MakeApiRequest, {
      apiUrl: `${API_BASE_URL}/resident/parking/request`,
      apiMethod: POST,
      apiPayload: { unitId, vehicleType, vehicleNumber, remarks },
    });

    yield put(requestParkingSpotSuccess(response.data));
  } catch (error: any) {
    yield put(
      requestParkingSpotFailure(
        error.message || 'Failed to request parking spot',
      ),
    );
  }
}

// Fetch My Parking Requests
function* fetchMyParkingRequestsSaga(action: any): Generator<any, void, any> {
  try {
    const { unitId } = action.payload;

    const response = yield call(MakeApiRequest, {
      apiUrl: `${API_BASE_URL}/resident/parking/requests`,
      apiMethod: GET,
      apiParams: { unitId },
    });

    yield put(fetchMyParkingRequestsSuccess(response.data));
  } catch (error: any) {
    yield put(
      fetchMyParkingRequestsFailure(
        error.message || 'Failed to fetch parking requests',
      ),
    );
  }
}

// Cancel Parking Request
function* cancelParkingRequestSaga(action: any): Generator<any, void, any> {
  try {
    const { requestId } = action.payload;

    const response = yield call(MakeApiRequest, {
      apiUrl: `${API_BASE_URL}/resident/parking/requests/${requestId}/cancel`,
      apiMethod: DELETE,
    });

    yield put(cancelParkingRequestSuccess(response.data));
  } catch (error: any) {
    yield put(
      cancelParkingRequestFailure(
        error.message || 'Failed to cancel parking request',
      ),
    );
  }
}

// Watcher Saga
export function* watchParking() {
  yield takeLatest(FETCH_MY_PARKING_SPOT, fetchMyParkingSpotSaga);
  yield takeLatest(REQUEST_PARKING_SPOT, requestParkingSpotSaga);
  yield takeLatest(FETCH_MY_PARKING_REQUESTS, fetchMyParkingRequestsSaga);
  yield takeLatest(CANCEL_PARKING_REQUEST, cancelParkingRequestSaga);
}

export default watchParking;
