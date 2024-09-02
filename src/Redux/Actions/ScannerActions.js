import { SET_MANUAL_CODE, CHANGE_TORCH, SET_SCANNED } from '../Reducers/constants';

export function set_manual_code(value) {
  return {
    type: SET_MANUAL_CODE,
    payload: value,
  };
}

export function set_torch(value) {
  return {
    type: CHANGE_TORCH,
    payload: value,
  };
}

export function set_scanned(value) {
  return {
    type: SET_SCANNED,
    payload: value,
  };
}
