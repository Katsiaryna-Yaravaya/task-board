import { applyMiddleware, createStore } from 'redux'
import {persistStore} from 'redux-persist'
import thunkMiddleware from 'redux-thunk'

import rootReducer from './root-reducer'

const middlewares = [thunkMiddleware]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(...middlewares)
));

export const persistor = persistStore(store)

export default { store, persistor }
