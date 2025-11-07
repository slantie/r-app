import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from "../../actionType";
import { profileAction } from '../../actions/auth/profileAction';

function* profileSaga(action: any): Generator<any, void, any>{
    try {
      const response = yield call(profileAction, action.payload);
      yield put({ type: types.PROFILE_SUCCESS, payload: response });
    } catch (error: any) {
      yield put({ type: types.PROFILE_FAILURE, payload: error.message });
    }
  }

export default function* profileWatcherSaga() {
  yield takeLatest(types.PROFILE_REQUEST, profileSaga);
}
