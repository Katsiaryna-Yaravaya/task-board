import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { persistStore } from 'redux-persist'

import rootReducer from './root-reducer'

const middlewares = [thunkMiddleware]

// const store = createStore(rootReducer, applyMiddleware(...middlewares))

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
)

export const persistor = persistStore(store)

export default { store, persistor }
