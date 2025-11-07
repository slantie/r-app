import { call, put, takeLatest } from 'redux-saga/effects';

import * as types from "../../actionType";
import { employeeDetailsAction } from '../../actions/employee/employeeDetailsAction';

function* employeeDetailsSaga(action: any): Generator<any, void, any> {
    try {
        const response = yield call(employeeDetailsAction, action.payload);
        yield put({ type: types.EMPLOYEE_DETAILS_SUCCESS, payload: response });
    } catch (error: any) {
        yield put({ type: types.EMPLOYEE_DETAILS_FAILURE, payload: error.message });
    }
}

export default function* employeeDetailsWatcherSaga() {
    yield takeLatest(types.EMPLOYEE_DETAILS_REQUEST, employeeDetailsSaga);
}
