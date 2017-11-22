import {
  REQUEST,
  RECEIVE
} from '../actions/lectures'
import {
  LOGOUT
} from '../actions/login'

function lectures(
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

export default function lecturesByEvent(
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
        [action.categoryId]: lectures(state[action.categoryId], action),
        items: [...state.items, ...items]
      })
    case LOGOUT:
      return Object.assign({}, state, {})
    default:
      return state
  }
}