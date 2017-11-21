import { combineReducers } from 'redux'
import login from './login'
import events from './events'

export default combineReducers({
  login,
  events
})