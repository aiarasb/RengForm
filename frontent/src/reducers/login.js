import {
  SET_LOGIN_PENDING,
  SET_LOGIN_SUCCESS,
  SET_LOGIN_ERROR,
  SAVE_LOGIN_DATA,
  LOGOUT
} from '../actions/login'

export default function login(state = {
  isLoginSuccess: false,
  isLoginPending: false,
  loginError: null,
  loginData: null
}, action) {
  switch (action.type) {
    case SET_LOGIN_PENDING:
      return Object.assign({}, state, {
        isLoginPending: action.isLoginPending
      });

    case SET_LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isLoginSuccess: action.isLoginSuccess
      });

    case SET_LOGIN_ERROR:
      return Object.assign({}, state, {
        loginError: action.loginError
      });

    case SAVE_LOGIN_DATA:
      return Object.assign({}, state, {
        loginData: action.loginData,
        isLoginPending: action.isLoginPending,
        isLoginSuccess: action.isLoginSuccess
      });

    case LOGOUT:
      return Object.assign({}, state, {
        loginData: null,
        isLoginPending: false,
        isLoginSuccess: false,
        loginError: null,
      });

    default:
      return state;
  }
}