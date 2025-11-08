import { call, put, takeLatest } from 'redux-saga/effects';
import { MakeApiRequest } from '../../services/apiService';
import { GET, POST, DELETE } from '../../constants/api';
import {
  FETCH_EVENTS,
  FETCH_EVENT_DETAILS,
  REGISTER_FOR_EVENT,
  FETCH_MY_REGISTRATIONS,
  CANCEL_REGISTRATION,
  fetchEventsSuccess,
  fetchEventsFailure,
  fetchEventDetailsSuccess,
  fetchEventDetailsFailure,
  registerForEventSuccess,
  registerForEventFailure,
  fetchMyRegistrationsSuccess,
  fetchMyRegistrationsFailure,
  cancelRegistrationSuccess,
  cancelRegistrationFailure,
} from '../actions/events/eventsAction';

const API_BASE_URL = 'http://10.0.2.2:5000/api'; // Android emulator
// const API_BASE_URL = 'http://localhost:5000/api'; // iOS simulator

// Fetch Events List
function* fetchEventsSaga(action: any): Generator<any, void, any> {
  try {
    const { buildingId } = action.payload;

    const response = yield call(MakeApiRequest, {
      apiUrl: `${API_BASE_URL}/resident/events`,
      apiMethod: GET,
      apiParams: { buildingId },
    });

    yield put(fetchEventsSuccess(response.data));
  } catch (error: any) {
    yield put(fetchEventsFailure(error.message || 'Failed to fetch events'));
  }
}

// Fetch Event Details
function* fetchEventDetailsSaga(action: any): Generator<any, void, any> {
  try {
    const { id } = action.payload;

    const response = yield call(MakeApiRequest, {
      apiUrl: `${API_BASE_URL}/resident/events/${id}`,
      apiMethod: GET,
    });

    yield put(fetchEventDetailsSuccess(response.data));
  } catch (error: any) {
    yield put(
      fetchEventDetailsFailure(
        error.message || 'Failed to fetch event details',
      ),
    );
  }
}

// Register for Event
function* registerForEventSaga(action: any): Generator<any, void, any> {
  try {
    const { eventId, memberId, numberOfGuests, unitId } = action.payload;

    const response = yield call(MakeApiRequest, {
      apiUrl: `${API_BASE_URL}/resident/events/register`,
      apiMethod: POST,
      apiPayload: { eventId, memberId, numberOfGuests, unitId },
    });

    yield put(registerForEventSuccess(response.data));
  } catch (error: any) {
    yield put(
      registerForEventFailure(error.message || 'Failed to register for event'),
    );
  }
}

// Fetch My Registrations
function* fetchMyRegistrationsSaga(action: any): Generator<any, void, any> {
  try {
    const { memberId } = action.payload;

    const response = yield call(MakeApiRequest, {
      apiUrl: `${API_BASE_URL}/resident/events/registrations/my-registrations`,
      apiMethod: GET,
      apiParams: { memberId },
    });

    yield put(fetchMyRegistrationsSuccess(response.data));
  } catch (error: any) {
    yield put(
      fetchMyRegistrationsFailure(
        error.message || 'Failed to fetch registrations',
      ),
    );
  }
}

// Cancel Registration
function* cancelRegistrationSaga(action: any): Generator<any, void, any> {
  try {
    const { registrationId } = action.payload;

    const response = yield call(MakeApiRequest, {
      apiUrl: `${API_BASE_URL}/resident/events/registrations/${registrationId}/cancel`,
      apiMethod: DELETE,
    });

    yield put(cancelRegistrationSuccess(response.data));
  } catch (error: any) {
    yield put(
      cancelRegistrationFailure(
        error.message || 'Failed to cancel registration',
      ),
    );
  }
}

// Watcher Saga
export function* watchEvents() {
  yield takeLatest(FETCH_EVENTS, fetchEventsSaga);
  yield takeLatest(FETCH_EVENT_DETAILS, fetchEventDetailsSaga);
  yield takeLatest(REGISTER_FOR_EVENT, registerForEventSaga);
  yield takeLatest(FETCH_MY_REGISTRATIONS, fetchMyRegistrationsSaga);
  yield takeLatest(CANCEL_REGISTRATION, cancelRegistrationSaga);
}

export default watchEvents;
