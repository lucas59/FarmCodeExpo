import { SET_MANUAL_CODE, SET_SCANNED, SET_STEP } from '../Reducers/constants';

export function set_manual_code(value) {
  return {
    type: SET_MANUAL_CODE,
    payload: value,
  };
}

export function set_step(value) {
  return {
    type: SET_STEP,
    payload: value,
  };
}

export function set_scanned(value) {
  return {
    type: SET_SCANNED,
    payload: value,
  };
}
