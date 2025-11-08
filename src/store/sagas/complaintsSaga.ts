import { call, put, takeLatest } from 'redux-saga/effects';
import { MakeApiRequest } from '../../services/apiService';
import { GET, POST, PUT } from '../../constants/api';
import {
  FETCH_MY_COMPLAINTS,
  FETCH_COMPLAINT_DETAILS,
  CREATE_COMPLAINT,
  ADD_FOLLOW_UP,
  CANCEL_COMPLAINT,
  fetchMyComplaintsSuccess,
  fetchMyComplaintsFailure,
  fetchComplaintDetailsSuccess,
  fetchComplaintDetailsFailure,
  createComplaintSuccess,
  createComplaintFailure,
  addFollowUpSuccess,
  addFollowUpFailure,
  cancelComplaintSuccess,
  cancelComplaintFailure,
} from '../actions/complaints/complaintsAction';

const API_BASE_URL = 'http://10.0.2.2:5000/api'; // Android emulator
// const API_BASE_URL = 'http://localhost:5000/api'; // iOS simulator

// Fetch My Complaints
function* fetchMyComplaintsSaga(action: any): Generator<any, void, any> {
  try {
    const { unitId, status } = action.payload;

    const response = yield call(MakeApiRequest, {
      apiUrl: `${API_BASE_URL}/complaints`,
      apiMethod: GET,
      apiParams: status ? { unitId, status } : { unitId },
    });

    yield put(fetchMyComplaintsSuccess(response.data));
  } catch (error: any) {
    yield put(
      fetchMyComplaintsFailure(error.message || 'Failed to fetch complaints'),
    );
  }
}

// Fetch Complaint Details
function* fetchComplaintDetailsSaga(action: any): Generator<any, void, any> {
  try {
    const { complaintId } = action.payload;

    const response = yield call(MakeApiRequest, {
      apiUrl: `${API_BASE_URL}/complaints/${complaintId}`,
      apiMethod: GET,
    });

    yield put(fetchComplaintDetailsSuccess(response.data));
  } catch (error: any) {
    yield put(
      fetchComplaintDetailsFailure(
        error.message || 'Failed to fetch complaint details',
      ),
    );
  }
}

// Create Complaint
function* createComplaintSaga(action: any): Generator<any, void, any> {
  try {
    const { unitId, category, subject, description, priority, images } =
      action.payload;

    const response = yield call(MakeApiRequest, {
      apiUrl: `${API_BASE_URL}/complaints`,
      apiMethod: POST,
      apiPayload: { unitId, category, subject, description, priority, images },
    });

    yield put(createComplaintSuccess(response.data));
  } catch (error: any) {
    yield put(
      createComplaintFailure(error.message || 'Failed to create complaint'),
    );
  }
}

// Add Follow-up
function* addFollowUpSaga(action: any): Generator<any, void, any> {
  try {
    const { complaintId, message, images } = action.payload;

    const response = yield call(MakeApiRequest, {
      apiUrl: `${API_BASE_URL}/complaints/${complaintId}/follow-up`,
      apiMethod: POST,
      apiPayload: { message, images },
    });

    yield put(addFollowUpSuccess(response.data));
  } catch (error: any) {
    yield put(addFollowUpFailure(error.message || 'Failed to add follow-up'));
  }
}

// Cancel Complaint
function* cancelComplaintSaga(action: any): Generator<any, void, any> {
  try {
    const { complaintId } = action.payload;

    const response = yield call(MakeApiRequest, {
      apiUrl: `${API_BASE_URL}/complaints/${complaintId}`,
      apiMethod: PUT,
      apiPayload: { status: 'cancelled' },
    });

    yield put(cancelComplaintSuccess(response.data));
  } catch (error: any) {
    yield put(
      cancelComplaintFailure(error.message || 'Failed to cancel complaint'),
    );
  }
}

// Watcher Saga
export function* watchComplaints() {
  yield takeLatest(FETCH_MY_COMPLAINTS, fetchMyComplaintsSaga);
  yield takeLatest(FETCH_COMPLAINT_DETAILS, fetchComplaintDetailsSaga);
  yield takeLatest(CREATE_COMPLAINT, createComplaintSaga);
  yield takeLatest(ADD_FOLLOW_UP, addFollowUpSaga);
  yield takeLatest(CANCEL_COMPLAINT, cancelComplaintSaga);
}

export default watchComplaints;
