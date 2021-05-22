import { SET_MANUAL_CODE } from '../Reducers/constants';

export function set_manual_code(value) {
  return {
    type: SET_MANUAL_CODE,
    payload: value,
  };
}
