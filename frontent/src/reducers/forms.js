import {
  REQUEST,
  RECEIVE
} from '../actions/forms'
import {
  LOGOUT
} from '../actions/login'

export default function events(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: null
  },
  action
) {
  switch (action.type) {
    case REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.items,
      })
    case LOGOUT:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: null,
      })
    default:
      return state
  }
}