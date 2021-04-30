import { SET_MANUAL_CODE } from "../Reducers/constants";

export function set_manual_code(value) {
    console.log("qweqweqwe");
    return {
        type: SET_MANUAL_CODE,
        payload: value
    }
}