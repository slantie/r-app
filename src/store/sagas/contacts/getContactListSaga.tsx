import { call, put, takeLatest } from 'redux-saga/effects';

import * as types from "../../actionType";
import { getContactListAction } from '../../actions/contacts/getContactListAction';

function* getContactListSaga(action: any): Generator<any, void, any>{
    try {
      const response = yield call(getContactListAction, action.payload);
      yield put({ type: types.GET_CONTACT_LIST_SUCCESS, payload: response });
    } catch (error: any) {
      yield put({ type: types.GET_CONTACT_LIST_FAILURE, payload: error.message });
    }
  }

export default function* getContactListWatcherSaga() {
  yield takeLatest(types.GET_CONTACT_LIST_REQUEST, getContactListSaga);
}