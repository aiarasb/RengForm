import { combineReducers } from 'redux'
import login from './login'
import events from './events'
import forms from './forms'

export default combineReducers({
  login,
  events,
  forms
})