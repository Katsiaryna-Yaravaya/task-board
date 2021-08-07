import { combineReducers } from 'redux'
import usersReducer from './test/reducer'

export default combineReducers({
  data: usersReducer
})
