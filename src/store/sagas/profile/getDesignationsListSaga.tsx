import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from "../../actionType";
import { getDesignationsListAction } from '../../actions/profile/getDesignationsListAction';

function* getDesignationsListSaga(action: any): Generator<any, void, any> {
  try {
    const page = action.payload || action.page || 1;
    const response = yield call(getDesignationsListAction, page);
    yield put({ type: types.GET_DESIGNATIONS_LIST_SUCCESS, payload: response, page });
  } catch (error: any) {
    yield put({ type: types.GET_DESIGNATIONS_LIST_FAILURE, payload: error.message });
  }
}

export default function* getDesignationsListWatcherSaga() {
  yield takeLatest(types.GET_DESIGNATIONS_LIST_REQUEST, getDesignationsListSaga);
}
