import { combineReducers } from 'redux'
import {
  REQUEST_EVENTS,
  RECEIVE_EVENTS
} from '../actions/events'
import {
  SET_LOGIN_PENDING,
  SET_LOGIN_SUCCESS,
  SET_LOGIN_ERROR,
  SAVE_LOGIN_DATA
} from '../actions/login'

function events(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: null
  },
  action
) {
  switch (action.type) {
    case REQUEST_EVENTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_EVENTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.events,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function login(state = {
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
        loginData: action.loginData
      });

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  events,
  login
})

export default rootReducer