import { combineReducers } from 'redux'
import login from './login'
import events from './events'
import forms from './forms'
import categories from './categories'
import lectures from './lectures'

export default combineReducers({
  login,
  events,
  forms,
  categories,
  lectures
})