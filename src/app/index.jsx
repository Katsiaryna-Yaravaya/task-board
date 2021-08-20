import { Switch, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Registration from '../components/home/registration'
import Table from '../components/table-board'
import ExpandedTask from '../components/expanded-task'

import './index.scss'

const App = () => {

  const { t, i18n } = useTranslation('translation')

  const handleClick = (lang) => {
    i18n.changeLanguage(lang).then()
  }

  return (
    <div className='app'>
      <div className='language'>
        <button className='language__button' onClick={() => handleClick('en')}>English</button>
        <button className='language__button' onClick={() => handleClick('ru')}>Русский</button>
      </div>
      <Switch>
        <Route exact path='/' component={Registration} />
        <Route exact path='/table-board' component={Table} />
        <Route exact path='/table-board/task' component={ExpandedTask} />
      </Switch>
    </div>
  )
}

export default App
