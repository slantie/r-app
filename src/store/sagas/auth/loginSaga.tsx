import { call, put, takeLatest } from 'redux-saga/effects';

import * as types from "../../actionType";
import { loginAction } from '../../actions/auth/loginAction';

function* loginSaga(action: any): Generator<any, void, any>{
    try {
      const response = yield call(loginAction, action.payload);
      yield put({ type: types.LOGIN_SUCCESS, payload: response });
    } catch (error: any) {
      yield put({ type: types.LOGIN_FAILURE, payload: error.message });
    }
  }

export default function* authWatcherSaga() {
  yield takeLatest(types.LOGIN_REQUEST, loginSaga);
}
