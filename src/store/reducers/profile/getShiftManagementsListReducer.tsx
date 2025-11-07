import * as types from "../../actionType";

const initialState = {
  loading: false,
  getShiftManagementsListData: null,
  error: null,
  currentPage: 0,
  hasMore: true,
};

export const getShiftManagementsListReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.GET_SHIFT_MANAGEMENTS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_SHIFT_MANAGEMENTS_LIST_SUCCESS:
      const newShifts = action.payload?.data?.result?.shiftManagements || [];
      const pagination = action.payload?.data?.result?.pagination;
      const isFirstPage = action.page === 1;

      // Accumulate shifts: replace on page 1, append on subsequent pages
      const existingShifts = isFirstPage ? [] : (state.getShiftManagementsListData?.data?.result?.shiftManagements || []);
      const accumulatedShifts = [...existingShifts, ...newShifts];

      return {
        ...state,
        loading: false,
        getShiftManagementsListData: {
          ...action.payload,
          data: {
            ...action.payload?.data,
            result: {
              ...action.payload?.data?.result,
              shiftManagements: accumulatedShifts,
            },
          },
        },
        currentPage: action.page,
        hasMore: pagination ? pagination.currentPage < pagination.totalPages : newShifts.length > 0,
        error: null,
      };
    case types.GET_SHIFT_MANAGEMENTS_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.GET_SHIFT_MANAGEMENTS_LIST_CLEAR:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
