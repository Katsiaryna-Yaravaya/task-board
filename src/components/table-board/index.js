import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { Tasks, Logout, AddTask, ThemeBackground } from '../index'

import { updateUsers } from '../../backend/api'
import { logout } from '../../redux/users/actions'

import { REGISTRATION } from '../../constants/routs'
import { isEmpty } from '../utils'

import { useTheme } from '../../context/theme/theme-state'

import './index.scss'

const Table = () => {
  const [boards, setBoards] = useState(null)
  const [currentBoard, setCurrentBoard] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)
  const history = useHistory()
  const theme = useTheme()
  const { user } = useSelector(state => state.data)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!isEmpty(user)) {
      setBoards(user.boards)
      if (!isEmpty(user.theme)) theme.change(user.theme.currentTheme)
    }
  }, [user, user?.boards])

  useEffect(() => {
    if (boards && user) updateUsers(user.id, user).then()
  }, [boards])

  const dragOverHandler = e => {
    e.preventDefault()
    if (e.target.className === 'item')
      e.target.style.boxShadow = '0 4px 3px gray'
  }

  const dragLeaveHandler = e => (e.target.style.boxShadow = 'none')
  const dragStartHandler = (e, board, task) => {
    setCurrentBoard(board)
    setCurrentItem(task)
  }

  const dragEndHandler = e => (e.target.style.boxShadow = 'none')
  const dropHandler = (e, board, task) => {
    e.preventDefault()
    const currentIndex = currentBoard.tasks.indexOf(currentItem)
    currentBoard.tasks.splice(currentIndex, 1)
    const dropIndex = board.tasks.indexOf(task)
    board.tasks.splice(dropIndex + 1, 0, currentItem)
    setBoards(
      boards.map(b => {
        if (b.id === board.id) return board
        if (b.id === currentBoard.id) return currentBoard
        return b
      })
    )
    e.target.style.boxShadow = 'none'
  }
  const dropCardHandler = (e, board) => {
    const currentId = board.tasks.map(item => item.id)
    if (!currentId.includes(currentItem.id)) {
      board.tasks.push(currentItem)
      const currentIndex = currentBoard.tasks.indexOf(currentItem)
      currentBoard.tasks.splice(currentIndex, 1)
      setBoards(
        boards.map(b => {
          if (b.id === board.id) return board
          if (b.id === currentBoard.id) return currentBoard
          return b
        })
      )
    }
    e.target.style.boxShadow = 'none'
  }

  const logoutUser = () => {
    dispatch(logout())
    history.push(REGISTRATION)
  }

  return (
    <>
      <ThemeBackground />
      <AddTask />
      <div className="app" style={theme.theme}>
        {boards
          ? boards.map(board => (
              <div
                onDragOver={e => dragOverHandler(e)}
                onDrop={e => dropCardHandler(e, board)}
                className="board"
                key={board.id}
              >
                <div className="board__title">{board.title}</div>
                {board.tasks.map(task => (
                  <Tasks
                    onDragOver={e => dragOverHandler(e)}
                    onDragLeave={e => dragLeaveHandler(e)}
                    onDragStart={e => dragStartHandler(e, board, task)}
                    onDragEnd={e => dragEndHandler(e)}
                    onDrop={e => dropHandler(e, board, task)}
                    key={task.id}
                    task={task}
                  />
                ))}
              </div>
            ))
          : null}
        <Logout path={logoutUser} />
      </div>
    </>
  )
}

export default Table
