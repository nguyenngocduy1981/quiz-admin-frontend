export const LOGIN = '[LoginPage] LOGIN';
export const LOGIN_SUCCESS = '[LoginPage] LOGIN_SUCCESS';
export const LOGIN_FAIL = '[LoginPage] LOGIN_FAIL';


export function login(user) {
  return {
    type: LOGIN,
    user
  };
}
export function loginSuccess(payload) {
  return {
    type: LOGIN_SUCCESS,
    payload
  };
}
export function loginFail(payload) {
  return {
    type: LOGIN_FAIL,
    payload
  };
}
