import { SET_MANUAL_CODE } from "./constants";

const initialState  = {
    manualCode: false
}

const scannerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MANUAL_CODE:
            return {
                ...state,
                manualCode: action.payload
            };
        default:
            return state;
    }
}
export default scannerReducer;  