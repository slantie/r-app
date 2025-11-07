import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from "../../actionType";
import { otpVarifyAction } from '../../actions/auth/otpVarifyAction';

function* otpVarifySaga(action: any): Generator<any, void, any>{
    try {
      const response = yield call(otpVarifyAction, action.payload);
      yield put({ type: types.OTP_VARIFY_SUCCESS, payload: response });
    } catch (error: any) {
      yield put({ type: types.OTP_VARIFY_FAILURE, payload: error.message });
    }
  }


export default function* otpVarifyWatcherSaga() {
  yield takeLatest(types.OTP_VARIFY_REQUEST, otpVarifySaga);
}
