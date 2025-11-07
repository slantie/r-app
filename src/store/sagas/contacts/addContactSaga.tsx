import { call, put, takeLatest } from 'redux-saga/effects';

import * as types from "../../actionType";
import { addContactAction } from '../../actions/contacts/addContactAction';

function* addContactSaga(action: any): Generator<any, void, any>{
    try {
      const response = yield call(addContactAction, action.payload.contactData, action.payload.params);
      yield put({ type: types.ADD_CONTACT_SUCCESS, payload: response });
    } catch (error: any) {
      yield put({ type: types.ADD_CONTACT_FAILURE, payload: error.message });
    }
  }

export default function* addContactWatcherSaga() {
  yield takeLatest(types.ADD_CONTACT_REQUEST, addContactSaga);
}