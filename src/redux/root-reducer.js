import { combineReducers } from 'redux'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import usersReducer from './users/reducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['data']
}

const rootReducer = combineReducers({
  data: usersReducer
})

export default persistReducer(persistConfig, rootReducer)
