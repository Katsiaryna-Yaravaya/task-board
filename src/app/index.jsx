import { useState } from 'react'
/*import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import i18n from '../core/i18n'

import { NestedComponent } from '../components'

import { TestContext } from '../context'
import { testActions } from '../redux/test/actions'*/

import './index.scss'
// import Table from '../components/internal'

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

  const [boards, setBoards] = useState([
    { id: 1, title: 'Do It', items: [{ id: 1, title: 'Go' }, { id: 2, title: 'Went' }, { id: 3, title: 'Gone' }] },
    { id: 2, title: 'In progress', items: [{ id: 4, title: 'Be' }, { id: 5, title: 'Was' }, { id: 6, title: 'Been' }] },
    { id: 3, title: 'Done', items: [{ id: 7, title: 'Do' }, { id: 8, title: 'Did' }, { id: 9, title: 'Done' }] }
  ])

  const [currentBoard, setCurrentBoard] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)


  function dragOverHandler(e) {
    e.preventDefault()
    if (e.target.className === 'item') {
      e.target.style.boxShadow = '0 4px 3px gray'
    }
  }

  function dragLeaveHandler(e) {
    e.target.style.boxShadow = 'none'
  }

  function dragStartHandler(e, board, item) {
    setCurrentBoard(board)
    setCurrentItem(item)
  }

  function dragEndHandler(e) {
    e.target.style.boxShadow = 'none'
  }

  function dropHandler(e, board, item) {
    e.preventDefault()
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)

    const dropIndex = board.items.indexOf(item)
    board.items.splice(dropIndex + 1, 0, currentItem)

    setBoards(boards.map(b => {
      if (b.id === board.id) {
        return board
      }
      if (b.id === currentBoard.id) {
        return currentBoard
      }
      return b
    }))
    e.target.style.boxShadow = 'none'
  }

  function dropCardHandler(e, board) {
    board.items.push(currentItem)
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)

    setBoards(boards.map(b => {
      if (b.id === board.id) {
        return board
      }
      if (b.id === currentBoard.id) {
        return currentBoard
      }
      return b

    }))

  }

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
      {/*<Table />*/}

      {boards.map(board =>
        <div
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropCardHandler(e, board)}
          className='board'
        >
          <div className='board__title'>{board.title}</div>
          {board.items.map(item =>
            <div
              onDragOver={(e) => dragOverHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragStart={(e) => dragStartHandler(e, board, item)}
              onDragEnd={(e) => dragEndHandler(e)}
              onDrop={(e) => dropHandler(e, board, item)}
              draggable={true}
              className='item'
            >
              {item.title}</div>
          )}
        </div>
      )}
    </div>
  )
}

export default App
