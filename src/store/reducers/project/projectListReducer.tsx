import * as types from "../../actionType";

const initialState = {
    loading: false,
    projectListData: null,
    projects: [], // Array to store all projects for pagination
    pagination: {
        currentPage: 1,
        totalPages: 0,
        totalItems: 0,
        hasMore: true,
    },
    error: null,
    searchTerm: '',
};

const projectListReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case types.PROJECT_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case types.PROJECT_LIST_SUCCESS:
            const { payload, meta } = action;
            const currentPage = meta?.page || 1;
            const searchTerm = meta?.search || '';
            const newProjects = payload?.data?.result?.projects || [];
            const totalItems = payload?.data?.result?.total || 0;

            // If it's the first page or search term changed, replace projects array
            // If it's a subsequent page with same search, append to existing projects
            const updatedProjects = (currentPage === 1 || searchTerm !== state.searchTerm) ? newProjects : [...state.projects, ...newProjects];

            return {
                ...state,
                loading: false,
                projectListData: payload,
                projects: updatedProjects,
                searchTerm,
                pagination: {
                    currentPage,
                    totalItems,
                    hasMore: updatedProjects.length < totalItems,
                },
                error: null,
            };
        case types.PROJECT_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case types.PROJECT_LIST_CLEAR:
            return {
                ...initialState,
                searchTerm: '',
            };
        default:
            return state;
    }
};

export default projectListReducer;