import { SET_TOKEN } from '../Reducers/constants';

export function set_token(value) {
  return {
    type: SET_TOKEN,
    payload: value,
  };
}
