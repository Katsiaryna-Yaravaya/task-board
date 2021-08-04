import { useState } from 'react'

import './index.scss'
import Tasks from './internal/tasks'

import { dragOverHandler, dropCardHandler } from './internal/utils'

const Table = () => {

  const [boards, setBoards] = useState([
    { id: 1, title: 'Do It', tasks: [{ id: 1, title: 'Go' }, { id: 2, title: 'Went' }, { id: 3, title: 'Gone' }] },
    { id: 2, title: 'In progress', items: [{ id: 4, title: 'Be' }, { id: 5, title: 'Was' }, { id: 6, title: 'Been' }] },
    { id: 3, title: 'Done', items: [{ id: 7, title: 'Do' }, { id: 8, title: 'Did' }, { id: 9, title: 'Done' }] }
  ])

  const [currentBoard, setCurrentBoard] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)

  /*const dragOverHandler = (e) => {
    e.preventDefault()
    if (e.target.className === 'item') {
      e.target.style.boxShadow = '0 4px 3px gray'
    }
  }

  const dragLeaveHandler = (e) =>  {
    e.target.style.boxShadow = 'none'
  }

  const dragStartHandler = (e, board, item) => {
    setCurrentBoard(board)
    setCurrentItem(item)
  }

  const dragEndHandler = (e) => {
    e.target.style.boxShadow = 'none'
  }

  const dropHandler = (e, board, item) => {
    e.preventDefault()
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex, 1)

    const dropIndex = board.items.indexOf(item)
    board.items.splice(dropIndex + 1, 0, currentItem)

    setBoards(boards.map(b => {
      if (b.id === board.id) return board
      if (b.id === currentBoard.id) return currentBoard

      return b
    }))

    e.target.style.boxShadow = 'none'
  }

  const dropCardHandler = (e, board) => {

    const currentId = board.items.map(item => item.id)
    if (!currentId.includes(currentItem.id)) {
      board.items.push(currentItem)

      const currentIndex = currentBoard.items.indexOf(currentItem)
      currentBoard.items.splice(currentIndex, 1)

      setBoards(boards.map(b => {
        if (b.id === board.id) return board
        if (b.id === currentBoard.id) return currentBoard

        return b
      }))
    }
    e.target.style.boxShadow = 'none'
  }*/

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
          {board.items.map(item => {
              return <Tasks />
            }
          )}
        </div>
      )}
    </div>
  )
}

export default Table