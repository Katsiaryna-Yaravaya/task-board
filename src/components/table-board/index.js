import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { useTheme } from '../../context/theme/theme-state'
import { updateUsers } from '../../backend/api'
import ThemeBackground from '../theme-background'
import Modal from '../modal'
import Tasks from './tasks'
import AddTask from '../add-task'

import { LOGOUT } from '../../constants/routs'
import { modalTypeConstants } from '../../constants/modal'

import './index.scss'
import Logout from '../loguot'
import { v4 as uuidv4 } from 'uuid'

const Table = () => {
  const { t } = useTranslation()
  const [boards, setBoards] = useState(null)
  const [currentBoard, setCurrentBoard] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)
  const [isModalInfoVisible, setIsModalInfoVisible] = useState(false)
  const [isModalPaymentVisible, setIsModalPaymentVisible] = useState(false)
  const [password, setPassword] = useState(null)
  const theme = useTheme()
  const history = useHistory()

  const { REPAYMENT, CONFIRM } = modalTypeConstants

  const user = useSelector(state => state.data.user)

  const update = () => {
    updateUsers(user.id, user).then()
  }

  useEffect(() => {
    return () => update()
  }, [user]);

  useEffect(() => {
    if (user) setBoards(user.boards)
  }, [user, user?.boards])

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

  const handleOpenModal = useCallback(() => setIsModalInfoVisible(true), [])
  const handlePayment = useCallback(() => {
    setIsModalInfoVisible(false)
    setIsModalPaymentVisible(true)
  }, [])
  const handleCancel = useCallback(() => {
    setIsModalPaymentVisible(false)
    setIsModalInfoVisible(false)
  }, [])
  const handleSubmit = useCallback(() => setIsModalPaymentVisible(false), [])
  const handleChange = useCallback((e) => setPassword(e.target.value), [])

  return (
    <>
      <ThemeBackground openModal={handleOpenModal} />
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
        <Logout path={()=>history.push(LOGOUT)}/>
        {
          isModalInfoVisible ?
            <Modal
              title={t('modalTitleConfirm')}
              type={CONFIRM}
              body={t('modalBodyConfirm')}
              onClickCancel={handleCancel}
              handlePayment={handlePayment}
            /> : null
        }
        {
          isModalPaymentVisible ?
            <Modal
              title={t('modalTitlePayment')}
              type={REPAYMENT}
              body={<input onChange={handleChange} className='body__input' />}
              password={password}
              btnSubmitTitle={'submit'}
              onClickSubmit={handleSubmit}
              onClickCancel={handleCancel}
            /> : null
        }
      </div>
    </>
  )
}

export default Table
