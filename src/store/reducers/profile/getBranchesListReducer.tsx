import * as types from "../../actionType";

const initialState = {
  loading: false,
  getBranchesListData: null,
  error: null,
  currentPage: 0,
  hasMore: true,
};

export const getBranchesListReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.GET_BRANCHES_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_BRANCHES_LIST_SUCCESS:
      const newBranches = action.payload?.data?.result?.branches || [];
      const pagination = action.payload?.data?.result?.pagination;
      const isFirstPage = action.page === 1;

      // Accumulate branches: replace on page 1, append on subsequent pages
      const existingBranches = isFirstPage ? [] : (state.getBranchesListData?.data?.result?.branches || []);
      const accumulatedBranches = [...existingBranches, ...newBranches];

      return {
        ...state,
        loading: false,
        getBranchesListData: {
          ...action.payload,
          data: {
            ...action.payload?.data,
            result: {
              ...action.payload?.data?.result,
              branches: accumulatedBranches,
            },
          },
        },
        currentPage: action.page,
        hasMore: pagination ? pagination.currentPage < pagination.totalPages : newBranches.length > 0,
        error: null,
      };
    case types.GET_BRANCHES_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.GET_BRANCHES_LIST_CLEAR:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
