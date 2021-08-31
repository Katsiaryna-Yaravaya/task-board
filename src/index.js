import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import './core/i18n'
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from './redux/store'
import { ThemeState } from './context'
import ErrorBoundary from './components/error-boundary'
import App from './app'

import './index.scss'

ReactDOM.render(
  <Router>
    <ReduxProvider store={store}>
      <ErrorBoundary>
        <ThemeState>
          <PersistGate persistor={persistor}>
            <App />
          </PersistGate>
        </ThemeState>
      </ErrorBoundary>
    </ReduxProvider>
  </Router>,
  document.getElementById('root')
)
