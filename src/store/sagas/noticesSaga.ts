import { call, put, takeLatest } from 'redux-saga/effects';
import { MakeApiRequest } from '../../services/apiService';
import { GET, POST } from '../../constants/api';
import {
  FETCH_NOTICES,
  FETCH_NOTICE_DETAILS,
  MARK_NOTICE_READ,
  fetchNoticesSuccess,
  fetchNoticesFailure,
  fetchNoticeDetailsSuccess,
  fetchNoticeDetailsFailure,
  markNoticeReadSuccess,
  markNoticeReadFailure,
} from '../actions/notices/noticesAction';

const API_BASE_URL = 'http://10.0.2.2:5000/api'; // Android emulator
// const API_BASE_URL = 'http://localhost:5000/api'; // iOS simulator

// Fetch Notices List
function* fetchNoticesSaga(action: any): Generator<any, void, any> {
  try {
    const { unitId } = action.payload;

    const response = yield call(MakeApiRequest, {
      apiUrl: `${API_BASE_URL}/resident/notices`,
      apiMethod: GET,
      apiParams: { unitId },
    });

    yield put(fetchNoticesSuccess(response.data));
  } catch (error: any) {
    yield put(fetchNoticesFailure(error.message || 'Failed to fetch notices'));
  }
}

// Fetch Notice Details
function* fetchNoticeDetailsSaga(action: any): Generator<any, void, any> {
  try {
    const { id } = action.payload;

    const response = yield call(MakeApiRequest, {
      apiUrl: `${API_BASE_URL}/resident/notices/${id}`,
      apiMethod: GET,
    });

    yield put(fetchNoticeDetailsSuccess(response.data));
  } catch (error: any) {
    yield put(
      fetchNoticeDetailsFailure(
        error.message || 'Failed to fetch notice details',
      ),
    );
  }
}

// Mark Notice as Read
function* markNoticeReadSaga(action: any): Generator<any, void, any> {
  try {
    const { id, unitId } = action.payload;

    const response = yield call(MakeApiRequest, {
      apiUrl: `${API_BASE_URL}/resident/notices/${id}/mark-read`,
      apiMethod: POST,
      apiPayload: { unitId },
    });

    yield put(markNoticeReadSuccess(response.data));
  } catch (error: any) {
    yield put(
      markNoticeReadFailure(error.message || 'Failed to mark notice as read'),
    );
  }
}

// Watcher Saga
export function* watchNotices() {
  yield takeLatest(FETCH_NOTICES, fetchNoticesSaga);
  yield takeLatest(FETCH_NOTICE_DETAILS, fetchNoticeDetailsSaga);
  yield takeLatest(MARK_NOTICE_READ, markNoticeReadSaga);
}

export default watchNotices;
