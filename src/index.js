import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'

import store from './redux/store'
// import './core/i18n'

import { TestState } from './context'

import App from './app'

import './index.scss'

ReactDOM.render(
  <Router>
    <ReduxProvider store={store}>
      <TestState>
        <App />
      </TestState>
    </ReduxProvider>
  </Router>,
  document.getElementById('root')
)
