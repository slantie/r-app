import { RootState } from "../reducers";

// Create a stable empty array reference
const EMPTY_ARRAY: any[] = [];

// Pulses List selectors
export const selectPulsesListData = (state: RootState) => state.pulsesList?.pulsesList || EMPTY_ARRAY;
export const selectPulsesListLoading = (state: RootState) => state.pulsesList?.loading || false;
export const selectPulsesListError = (state: RootState) => state.pulsesList?.error || null;

// Derived selectors
export const selectPulsesListIsEmpty = (state: RootState) => {
  const data = state.pulsesList?.pulsesList;
  return !data || data.length === 0;
};
