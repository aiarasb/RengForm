import { combineReducers } from 'redux'
import {
  REQUEST_EVENTS,
  RECEIVE_EVENTS
} from '../actions/events'

function events(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
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

const rootReducer = combineReducers({
  events
})

export default rootReducer