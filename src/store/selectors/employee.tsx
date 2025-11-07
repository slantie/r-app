import { RootState } from '../reducers';
export const selectEmployeeDetailsLoading = (state: RootState) => state.employeeDetails.loading;
export const selectEmployeeDetailsData = (state: RootState) => state.employeeDetails.employeeDetailsData;
export const selectEmployeeDetailsError = (state: RootState) => state.employeeDetails.error;


export const selectPunchInData = (state: RootState) => state.punchIn.punchInData;
export const selectPunchInError = (state: RootState) => state.punchIn.error;
export const selectPunchInLoading = (state: RootState) => state.punchIn.loading;

export const selectPunchOutData = (state: RootState) => state.punchOut.punchOutData;
export const selectPunchOutError = (state: RootState) => state.punchOut.error;
export const selectPunchOutLoading = (state: RootState) => state.punchOut.loading;

export const selectPunchDetailsByDateData = (state: RootState) => state.punchDetailsByDate.punchDetailsByDateData;
export const selectPunchDetailsByDateError = (state: RootState) => state.punchDetailsByDate.error;
export const selectPunchDetailsByDateLoading = (state: RootState) => state.punchDetailsByDate.loading;

export const selectEmployeeMonthlyCalendarData = (state: RootState) => state.employeeMonthlyCalendar.monthlyCalendarData;
export const selectEmployeeMonthlyCalendarError = (state: RootState) => state.employeeMonthlyCalendar.error;
export const selectEmployeeMonthlyCalendarLoading = (state: RootState) => state.employeeMonthlyCalendar.loading;
