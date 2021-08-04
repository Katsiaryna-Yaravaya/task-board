/*import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import i18n from '../core/i18n'


import { TestContext } from '../context'
import { testActions } from '../redux/test/actions'*/

import './index.scss'
import Table from '../components/table-board'

import {Switch, Route} from "react-router-dom"
import Registration from '../components/home/registration'

const App = () => {
  /*
    const { t } = useTranslation('translation')
    const [nestedComponentState, setNestedComponentState] = useState({
      text: 'string data',
      modified: false
    })
    const { testContextData, setTestContextData } = useContext(TestContext)
    const dispatch = useDispatch()
    const { testData } = useSelector(state => state.test)

    const { text, modified } = nestedComponentState

    const handleContextUpdate = () => setTestContextData('updated context data')
    const handleReduxUpdate = () =>
      dispatch(testActions.updateTestData('updated redux data'))

    const handleLanguageChange = () => {
      const RU_LOCALE = 'ru'
      const EN_LOCALE = 'en'
      const currentLanguage = i18n.language
      const isRussianLocale = currentLanguage === RU_LOCALE

      i18n.changeLanguage(isRussianLocale ? EN_LOCALE : RU_LOCALE)
    }

    const handleClick = () =>
      setNestedComponentState(({ modified }) => ({
        text: 'new nested container string',
        modified: !modified
      }))

  */


  return (
    <div className='app'>
      {/*<div className="state-data">
        <span className="state-data__text">{testContextData}</span>
        <span className="state-data__text">{testData}</span>
      </div>

      <div className="triggers">
        <button onClick={handleContextUpdate}>{t('updateContext')}</button>
        <button onClick={handleReduxUpdate}>{t('updateRedux')}</button>
      </div>

      <button onClick={handleLanguageChange}>{t('changeLanguage')}</button>

      <NestedComponent
        updateNestedComponentState={handleClick}
        stringData={text}
        modified={modified}
      />*/}

      <Switch>
        <Route exact path="/" component={Registration}/>
      </Switch>


      {/*<Table />*/}
    </div>
  )
}

export default App
