import {
    GET_AREA_BY_PINCODE_REQUEST,
    GET_AREA_BY_PINCODE_SUCCESS,
    GET_AREA_BY_PINCODE_FAILURE,
    CLEAR_AREA_DATA
} from '../../actionType';

interface AreaState {
    loading: boolean;
    data: any[];
    error: string | null;
    localities: string[];
}

const initialState: AreaState = {
    loading: false,
    data: [],
    error: null,
    localities: []
};

const areaByPincodeReducer = (state = initialState, action: any): AreaState => {
    switch (action.type) {
        case GET_AREA_BY_PINCODE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case GET_AREA_BY_PINCODE_SUCCESS:
            const localities = action.payload?.results?.[0]?.postcode_localities || [];
            return {
                ...state,
                loading: false,
                data: action.payload?.results || [],
                localities: localities,
                error: null
            };

        case GET_AREA_BY_PINCODE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                data: [],
                localities: []
            };

        case CLEAR_AREA_DATA:
            return {
                ...initialState
            };

        default:
            return state;
    }
};

export default areaByPincodeReducer;