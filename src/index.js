import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'

import store from './redux/store'
import { ThemeState } from './context'

import App from './app'

import './index.scss'

ReactDOM.render(
  <Router>
    <ReduxProvider store={store}>
      <ThemeState>
        <App />
      </ThemeState>
    </ReduxProvider>
  </Router>,
  document.getElementById('root')
)
