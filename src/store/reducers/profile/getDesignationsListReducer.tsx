import * as types from "../../actionType";

const initialState = {
  loading: false,
  getDesignationsListData: null,
  error: null,
  currentPage: 0,
  hasMore: true,
};

export const getDesignationsListReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.GET_DESIGNATIONS_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_DESIGNATIONS_LIST_SUCCESS:
      const newDesignations = action.payload?.data?.result?.designations || [];
      const pagination = action.payload?.data?.result?.pagination;
      const isFirstPage = action.page === 1;

      // Accumulate designations: replace on page 1, append on subsequent pages
      const existingDesignations = isFirstPage ? [] : (state.getDesignationsListData?.data?.result?.designations || []);
      const accumulatedDesignations = [...existingDesignations, ...newDesignations];

      return {
        ...state,
        loading: false,
        getDesignationsListData: {
          ...action.payload,
          data: {
            ...action.payload?.data,
            result: {
              ...action.payload?.data?.result,
              designations: accumulatedDesignations,
            },
          },
        },
        currentPage: action.page,
        hasMore: pagination ? pagination.currentPage < pagination.totalPages : newDesignations.length > 0,
        error: null,
      };
    case types.GET_DESIGNATIONS_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.GET_DESIGNATIONS_LIST_CLEAR:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
