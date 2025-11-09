import { call, put, takeLatest } from 'redux-saga/effects';
import { MakeApiRequest } from '../../services/apiService';
import { GET, POST } from '../../constants/api';
import { SOCIETY_API_URL } from '../../config/environment';
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

// Fetch Notices List
function* fetchNoticesSaga(action: any): Generator<any, void, any> {
  try {
    const { unitId, buildingId } = action.payload;

    // Build query params - prefer unitId, fallback to buildingId
    const params: any = {};
    if (unitId) {
      params.unitId = unitId;
    } else if (buildingId) {
      params.buildingId = buildingId;
    }

    console.log('📢 Fetching notices with params:', params);

    const response = yield call(MakeApiRequest, {
      apiUrl: `${SOCIETY_API_URL}/resident/notices`,
      apiMethod: GET,
      apiParams: params,
    });

    console.log('✅ Notices API response:', response.data);

    // Extract the data array from the response
    const noticesData = response.data?.data || response.data || [];
    console.log(`✅ Found ${noticesData.length} notices`);

    yield put(fetchNoticesSuccess(noticesData));
  } catch (error: any) {
    console.error('❌ Fetch notices error:', error);
    yield put(fetchNoticesFailure(error.message || 'Failed to fetch notices'));
  }
}

// Fetch Notice Details
function* fetchNoticeDetailsSaga(action: any): Generator<any, void, any> {
  try {
    const { id } = action.payload;

    const response = yield call(MakeApiRequest, {
      apiUrl: `${SOCIETY_API_URL}/resident/notices/${id}`,
      apiMethod: GET,
    });

    // Extract the data from the response
    const noticeData = response.data?.data || response.data;
    console.log('✅ Notice details:', noticeData);

    yield put(fetchNoticeDetailsSuccess(noticeData));
  } catch (error: any) {
    console.error('❌ Fetch notice details error:', error);
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
      apiUrl: `${SOCIETY_API_URL}/resident/notices/${id}/mark-read`,
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
