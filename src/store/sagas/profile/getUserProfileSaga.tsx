import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from "../../actionType";
import { getUserProfileAction } from '../../actions/profile/getUserProfileAction';

function* getUserProfileSaga(): Generator<any, void, any> {
  try {
    const response = yield call(getUserProfileAction);
    yield put({ type: types.GET_USER_PROFILE_SUCCESS, payload: response });
  } catch (error: any) {
    yield put({ type: types.GET_USER_PROFILE_FAILURE, payload: error.message });
  }
}

export default function* getUserProfileWatcherSaga() {
  yield takeLatest(types.GET_USER_PROFILE_REQUEST, getUserProfileSaga);
}
