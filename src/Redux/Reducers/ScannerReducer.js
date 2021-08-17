import { SET_MANUAL_CODE, SET_STEP, SET_SCANNED } from './constants';

const initialState = {
  manualCode: false,
  step: 0,
  scanned: false,
};

const scannerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MANUAL_CODE:
      return {
        ...state,
        manualCode: action.payload,
      };

    case SET_STEP:
      return {
        ...state,
        step: action.payload,
      };

    case SET_SCANNED:
      return {
        ...state,
        step: action.payload,
      };

    default:
      return state;
  }
};
export default scannerReducer;
