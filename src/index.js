import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'

import ErrorBoundary from './components/error-boundary'
import App from './app'

import { ThemeState } from './context'

import './core/i18n'

import './index.scss'

render(
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
