import * as types from "../../actionType";

const initialState = {
  loading: false,
  getProfessionalListData: null,
  error: null,
  currentPage: 0,
  hasMore: true,
};

export const getProfessionalListReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.GET_PROFESSIONAL_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_PROFESSIONAL_LIST_SUCCESS:
      const newProfessionals = action.payload?.data?.result?.professionals || [];
      const pagination = action.payload?.data?.result?.pagination;
      const isFirstPage = action.page === 1;

      // Accumulate professionals: replace on page 1, append on subsequent pages
      const existingProfessionals = isFirstPage ? [] : (state.getProfessionalListData?.data?.result?.professionals || []);
      const accumulatedProfessionals = [...existingProfessionals, ...newProfessionals];

      return {
        ...state,
        loading: false,
        getProfessionalListData: {
          ...action.payload,
          data: {
            ...action.payload?.data,
            result: {
              ...action.payload?.data?.result,
              professionals: accumulatedProfessionals,
            },
          },
        },
        currentPage: action.page,
        hasMore: pagination ? pagination.currentPage < pagination.totalPages : newProfessionals.length > 0,
        error: null,
      };
    case types.GET_PROFESSIONAL_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.GET_PROFESSIONAL_LIST_CLEAR:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

