import { CHANGE_TORCH, SET_SCANNED, SET_MANUAL_CODE } from './constants';

const initialState = {
  manualCode: false,
  torch: false,
  scanned: false,
};

const scannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MANUAL_CODE:
      return {
        ...state,
        manualCode: action.payload,
      };
    case CHANGE_TORCH:
      return {
        ...state,
        torch: action.payload,
      };
    case SET_SCANNED:
      return {
        ...state,
        scanned: action.payload,
      };
    default:
      return state;
  }
};
export default scannerReducer;
