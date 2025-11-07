import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from "../../actionType";
import { getBranchesListAction } from '../../actions/profile/getBranchesListAction';

function* getBranchesListSaga(action: any): Generator<any, void, any> {
  try {
    const page = action.payload || action.page || 1;
    const response = yield call(getBranchesListAction, page);
    yield put({ type: types.GET_BRANCHES_LIST_SUCCESS, payload: response, page });
  } catch (error: any) {
    yield put({ type: types.GET_BRANCHES_LIST_FAILURE, payload: error.message });
  }
}

export default function* getBranchesListWatcherSaga() {
  yield takeLatest(types.GET_BRANCHES_LIST_REQUEST, getBranchesListSaga);
}
