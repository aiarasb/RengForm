import {
  REQUEST_EVENTS,
  RECEIVE_EVENTS
} from '../actions/events'
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