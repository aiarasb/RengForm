import {
  REQUEST,
  RECEIVE
} from '../actions/registrations'
import {
  LOGOUT
} from '../actions/login'

function registrations(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
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
    default:
      return state
  }
}

export default function registrationsByEvent(
    state = {
      items: []
    },
    action
  ) {
  switch (action.type) {
    case REQUEST:
    case RECEIVE:
      const items = action.items || []
      return Object.assign({}, state, {
        [action.lectureId]: registrations(state[action.lectureId], action),
        items: [...state.items, ...items]
      })
    case LOGOUT:
      return Object.assign({}, state, {})
    default:
      return state
  }
}