import { call, put, takeLatest } from 'redux-saga/effects';
import { MakeApiRequest } from '../../services/apiService';
import { GET, POST, DELETE } from '../../constants/api';
import {
  FETCH_AMENITIES,
  FETCH_AMENITY_DETAILS,
  FETCH_AVAILABLE_SLOTS,
  BOOK_AMENITY_SLOT,
  FETCH_MY_BOOKINGS,
  CANCEL_BOOKING,
  fetchAmenitiesSuccess,
  fetchAmenitiesFailure,
  fetchAmenityDetailsSuccess,
  fetchAmenityDetailsFailure,
  fetchAvailableSlotsSuccess,
  fetchAvailableSlotsFailure,
  bookAmenitySlotSuccess,
  bookAmenitySlotFailure,
  fetchMyBookingsSuccess,
  fetchMyBookingsFailure,
  cancelBookingSuccess,
  cancelBookingFailure,
} from '../actions/amenities/amenitiesAction';

const API_BASE_URL = 'http://10.0.2.2:5000/api'; // Android emulator
// const API_BASE_URL = 'http://localhost:5000/api'; // iOS simulator

// Fetch Amenities List
function* fetchAmenitiesSaga(action: any): Generator<any, void, any> {
  try {
    const { buildingId } = action.payload;

    const response = yield call(MakeApiRequest, {
      apiUrl: `${API_BASE_URL}/resident/amenities`,
      apiMethod: GET,
      apiParams: { buildingId },
    });

    yield put(fetchAmenitiesSuccess(response.data.data));
  } catch (error: any) {
    yield put(
      fetchAmenitiesFailure(error.message || 'Failed to fetch amenities'),
    );
  }
}

// Fetch Amenity Details
function* fetchAmenityDetailsSaga(action: any): Generator<any, void, any> {
  try {
    const { id, date } = action.payload;

    const response = yield call(MakeApiRequest, {
      apiUrl: `${API_BASE_URL}/resident/amenities/${id}`,
      apiMethod: GET,
      apiParams: date ? { date } : undefined,
    });

    yield put(fetchAmenityDetailsSuccess(response.data.data));
  } catch (error: any) {
    yield put(
      fetchAmenityDetailsFailure(
        error.message || 'Failed to fetch amenity details',
      ),
    );
  }
}

// Fetch Available Slots
function* fetchAvailableSlotsSaga(action: any): Generator<any, void, any> {
  try {
    const { amenityId, date } = action.payload;

    const response = yield call(MakeApiRequest, {
      apiUrl: `${API_BASE_URL}/resident/amenities/${amenityId}/slots`,
      apiMethod: GET,
      apiParams: { date },
    });

    yield put(fetchAvailableSlotsSuccess(response.data.data));
  } catch (error: any) {
    yield put(
      fetchAvailableSlotsFailure(
        error.message || 'Failed to fetch available slots',
      ),
    );
  }
}

// Book Amenity Slot
function* bookAmenitySlotSaga(action: any): Generator<any, void, any> {
  try {
    const { amenityId, slotId, memberId, unitId, bookingDate } = action.payload;

    const response = yield call(MakeApiRequest, {
      apiUrl: `${API_BASE_URL}/resident/amenities/book`,
      apiMethod: POST,
      apiPayload: { amenityId, slotId, memberId, unitId, bookingDate },
    });

    yield put(bookAmenitySlotSuccess(response.data.data));
  } catch (error: any) {
    yield put(
      bookAmenitySlotFailure(error.message || 'Failed to book amenity slot'),
    );
  }
}

// Fetch My Bookings
function* fetchMyBookingsSaga(action: any): Generator<any, void, any> {
  try {
    const { userId } = action.payload;

    const response = yield call(MakeApiRequest, {
      apiUrl: `${API_BASE_URL}/resident/amenities/my-bookings`,
      apiMethod: GET,
      apiParams: { userId },
    });

    yield put(fetchMyBookingsSuccess(response.data.data));
  } catch (error: any) {
    yield put(
      fetchMyBookingsFailure(error.message || 'Failed to fetch bookings'),
    );
  }
}

// Cancel Booking
function* cancelBookingSaga(action: any): Generator<any, void, any> {
  try {
    const { bookingId } = action.payload;

    const response = yield call(MakeApiRequest, {
      apiUrl: `${API_BASE_URL}/resident/amenities/bookings/${bookingId}/cancel`,
      apiMethod: DELETE,
    });

    yield put(cancelBookingSuccess(response.data.data));
  } catch (error: any) {
    yield put(
      cancelBookingFailure(error.message || 'Failed to cancel booking'),
    );
  }
}

// Watcher Saga
export function* watchAmenities() {
  yield takeLatest(FETCH_AMENITIES, fetchAmenitiesSaga);
  yield takeLatest(FETCH_AMENITY_DETAILS, fetchAmenityDetailsSaga);
  yield takeLatest(FETCH_AVAILABLE_SLOTS, fetchAvailableSlotsSaga);
  yield takeLatest(BOOK_AMENITY_SLOT, bookAmenitySlotSaga);
  yield takeLatest(FETCH_MY_BOOKINGS, fetchMyBookingsSaga);
  yield takeLatest(CANCEL_BOOKING, cancelBookingSaga);
}

export default watchAmenities;
