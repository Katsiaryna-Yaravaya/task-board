import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import './core/i18n'

import store from './redux/store'
import { ThemeState } from './context'
import ErrorBoundary from './components/error-boundary'
import App from './app'

import './index.scss'

ReactDOM.render(
  <Router>
    <ReduxProvider store={store}>
      <ErrorBoundary>
        <ThemeState>
          <App />
        </ThemeState>
      </ErrorBoundary>
    </ReduxProvider>
  </Router>,
  document.getElementById('root')
)
