import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Registration, Table, ExpandedTask, PrivateRoute } from '../components'

import {
  EXPANDED_TASK_ROUTE,
  REGISTRATION,
  TABLE_BOARD_ROUTE
} from '../constants/routs'

import './index.scss'

const App = () => {
  const { i18n } = useTranslation('translation')

  return (
    <BrowserRouter>
      <div className="app">
        <div className="language">
          <button
            className="language__button"
            onClick={() => i18n.changeLanguage('en')}
          >
            English
          </button>
          <button
            className="language__button"
            onClick={() => i18n.changeLanguage('ru')}
          >
            Русский
          </button>
        </div>
        <Switch>
          <Route exact path={REGISTRATION} component={Registration} />
          <PrivateRoute exact path={TABLE_BOARD_ROUTE} component={Table} />
          <PrivateRoute
            exact
            path={EXPANDED_TASK_ROUTE}
            component={ExpandedTask}
          />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
