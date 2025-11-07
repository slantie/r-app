import { call, put, takeLatest } from 'redux-saga/effects';

import * as types from "../../actionType";
import { whoAmIAction } from '../../actions/auth/whoAmIAction';

function* whoAmISaga(action: any): Generator<any, void, any>{
    try {
      const response = yield call(whoAmIAction, action.payload);
      yield put({ type: types.WHO_AM_I_SUCCESS, payload: response });
    } catch (error: any) {
      yield put({ type: types.WHO_AM_I_FAILURE, payload: error.message });
    }
  }

export default function* whoAmIWatcherSaga() {
  yield takeLatest(types.WHO_AM_I_REQUEST, whoAmISaga);
}
