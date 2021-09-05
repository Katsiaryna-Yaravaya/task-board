import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Registration, Table, ExpandedTask, PrivateRoute } from '../components'

import {
  EXPANDED_TASK_ROUTE,
  REGISTRATION,
  TABLE_BOARD_ROUTE
} from '../constants/routs'

import { languageConstants } from '../constants/language'

import './index.scss'

const { EN, RU } = languageConstants

const App = () => {
  const { i18n } = useTranslation('translation')

  const isEnglishLanguage = i18n.language === EN

  const handleLanguageChange = () =>
    i18n.changeLanguage(isEnglishLanguage ? RU : EN)

  return (
    <BrowserRouter>
      <div className="app">
        <div className="language">
          <button className="language__button" onClick={handleLanguageChange}>
            {isEnglishLanguage ? 'Русский' : 'English'}
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
