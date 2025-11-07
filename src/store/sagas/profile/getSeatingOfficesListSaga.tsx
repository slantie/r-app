import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from "../../actionType";
import { getSeatingOfficesListAction } from '../../actions/profile/getSeatingOfficesListAction';

function* getSeatingOfficesListSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(getSeatingOfficesListAction, action.payload);
    yield put({ type: types.GET_SEATING_OFFICES_LIST_SUCCESS, payload: response });
  } catch (error: any) {
    yield put({ type: types.GET_SEATING_OFFICES_LIST_FAILURE, payload: error.message });
  }
}

export default function* getSeatingOfficesListWatcherSaga() {
  yield takeLatest(types.GET_SEATING_OFFICES_LIST_REQUEST, getSeatingOfficesListSaga);
}
