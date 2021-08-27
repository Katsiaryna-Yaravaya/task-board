import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { updateUsers } from '../../backend/api'
import ThemeBackground from '../theme-background'
import { useTheme } from '../../context/theme/theme-state'
import Tasks from './tasks'
import AddTask from '../add-task'
import Logout from '../loguot'
import { getFromLocalStorage, isEmpty } from '../utils'
import { logout, saveUser } from '../../redux/users/actions'
import { LOGOUT } from '../../constants/routs'

import './index.scss'

const Table = () => {

  const [boards, setBoards] = useState(null)
  const [currentBoard, setCurrentBoard] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)
  const history = useHistory()
  const theme = useTheme()
  const user = useSelector(state => state.data.user)
  const isLogout = useSelector(state => state.data.isLogout)

  const dispatch = useDispatch()

  useEffect(() => {
    const localUser = getFromLocalStorage('user')
    if (localUser) {
      dispatch(saveUser(localUser))
    }
  }, [])

  useEffect(() => {
    return () => update()
  }, [])

  useEffect(() => {
    if (!isEmpty(user) && !isLogout) {
      localStorage.setItem('user', JSON.stringify(user))
      setBoards(user.boards)
    }
  }, [user, user?.boards, isLogout])

  const update = useCallback(() => {
    if (!isLogout) {
      updateUsers(user.id, user).then()
      localStorage.setItem('user', JSON.stringify(user))
    }
  }, [isLogout, user.id, user ])

  const dragOverHandler = (e) => {
    e.preventDefault()
    if (e.target.className === 'item') e.target.style.boxShadow = '0 4px 3px gray'
  }
  const dragLeaveHandler = (e) => e.target.style.boxShadow = 'none'
  const dragStartHandler = (e, board, task) => {
    setCurrentBoard(board)
    setCurrentItem(task)
  }
  const dragEndHandler = (e) => e.target.style.boxShadow = 'none'
  const dropHandler = (e, board, task) => {
    e.preventDefault()
    const currentIndex = currentBoard.tasks.indexOf(currentItem)
    currentBoard.tasks.splice(currentIndex, 1)
    const dropIndex = board.tasks.indexOf(task)
    board.tasks.splice(dropIndex + 1, 0, currentItem)
    setBoards(boards.map(b => {
      if (b.id === board.id) return board
      if (b.id === currentBoard.id) return currentBoard
      return b
    }))
    e.target.style.boxShadow = 'none'
  }
  const dropCardHandler = (e, board) => {
    const currentId = board.tasks.map(item => item.id)
    if (!currentId.includes(currentItem.id)) {
      board.tasks.push(currentItem)
      const currentIndex = currentBoard.tasks.indexOf(currentItem)
      currentBoard.tasks.splice(currentIndex, 1)
      setBoards(boards.map(b => {
        if (b.id === board.id) return board
        if (b.id === currentBoard.id) return currentBoard
        return b
      }))
    }
    e.target.style.boxShadow = 'none'
  }

  const logoutUser = () => {
    window.localStorage.clear()
    dispatch(logout())
    history.push(LOGOUT)
  }

  return (
    <>
      <ThemeBackground />
      <AddTask />
      <div className='app' style={theme.theme}>
        {boards ? boards.map(board =>
          <div
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropCardHandler(e, board)}
            className='board'
            key={board.id}
          >
            <div className='board__title'>{board.title}</div>
            {board.tasks.map((task) => <Tasks
                onDragOver={(e) => dragOverHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragStart={(e) => dragStartHandler(e, board, task)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDrop={(e) => dropHandler(e, board, task)}
                key={task.id}
                task={task}
              />
            )}
          </div>
        ) : null}
        <Logout path={logoutUser} />
      </div>
    </>
  )
}

export default Table
