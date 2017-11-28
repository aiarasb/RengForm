import {
  REQUEST,
  RECEIVE
} from '../actions/categories'
import {
  LOGOUT
} from '../actions/login'
import _ from 'lodash'

function categories(
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

export default function categoriesByEvent(
    state = {
      items: []
    },
    action
  ) {
  switch (action.type) {
    case REQUEST:
    case RECEIVE:
      var oldItems = state.items
      const items = action.items || []
      _.forEach(items, (item) => {
        _.remove(oldItems, (oldItem) => {
          return item.id === oldItem.id
        })
      })
      return Object.assign({}, state, {
        [action.eventId]: categories(state[action.eventId], action),
        items: [...oldItems, ...items]
      })
    case LOGOUT:
      return Object.assign({}, state, {})
    default:
      return state
  }
}