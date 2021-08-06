import { SET_TOKEN } from './constants';

const initialState = {
  token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      console.log(action.payload);
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};
export default authReducer;
