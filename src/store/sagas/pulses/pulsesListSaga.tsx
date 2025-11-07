import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from "../../actionType";
import { pulsesListAction } from '../../actions/pulses/pulsesListAction';

function* pulsesListSaga(action: any): Generator<any, void, any> {
    try {
        const response = yield call(pulsesListAction, action.payload);
        yield put({ type: types.PULSES_LIST_SUCCESS, payload: response });
    } catch (error: any) {
        yield put({ type: types.PULSES_LIST_FAILURE, payload: error.message });
    }
}

export default function* pulsesListWatcherSaga() {
    yield takeLatest(types.PULSES_LIST_REQUEST, pulsesListSaga);
}
