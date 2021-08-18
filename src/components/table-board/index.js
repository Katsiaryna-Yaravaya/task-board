import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { useTheme } from '../../context/theme/theme-state'
import ThemeBackground from '../theme-background'
import Modal from '../modal'
import Tasks from './tasks'

import { modalTypeConstants } from '../../constants/modal'

import './index.scss'
import AddTask from '../add-task'
import { EXPANDED_TASK_ROUTE } from '../../constants/routs'

const Table = () => {
  const [currentBoard, setCurrentBoard] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)
  const [isModalInfoVisible, setIsModalInfoVisible] = useState(false)
  const [isModalPaymentVisible, setIsModalPaymentVisible] = useState(false)
  const [password, setPassword] = useState(null)
  const theme = useTheme()

  const { PAYMENT, CONFIRM } = modalTypeConstants

  const user = useSelector(state => state.data.user)
  const [boards, setBoards] = useState(null)

  useEffect(() => {
    if (user) {
      setBoards(user.boards)
    }
  }, [user, user.boards])

  const dragOverHandler = (e) => {
    e.preventDefault()
    if (e.target.className === 'item') e.target.style.boxShadow = '0 4px 3px gray'
  }
  const dragLeaveHandler = (e) => e.target.style.boxShadow = 'none'
  const dragStartHandler = (e, board, item) => {
    setCurrentBoard(board)
    setCurrentItem(item)
  }
  const dragEndHandler = (e) => e.target.style.boxShadow = 'none'
  const dropHandler = (e, board, item) => {
    e.preventDefault()
    const currentIndex = currentBoard.tasks.indexOf(currentItem)
    currentBoard.tasks.splice(currentIndex, 1)
    const dropIndex = board.tasks.indexOf(item)
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

  const handleOpenModal = () => setIsModalInfoVisible(true)
  const handlePayment = () => {
    setIsModalInfoVisible(false)
    setIsModalPaymentVisible(true)
  }
  const handleCancel = () => {
    setIsModalPaymentVisible(false)
    setIsModalInfoVisible(false)
  }
  const handleSubmit = () => setIsModalPaymentVisible(false)
  const handleChange = (e) => setPassword(e.target.value)

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
                task={task.title}
              />
            )}
          </div>
        ) : null}
        {
          isModalInfoVisible ?
            <Modal
              title={'Pay for your new theme'}
              type={CONFIRM}
              body={'Only ONE dollar and this topic is yours!'}
              onClickCancel={handleCancel}
              handlePayment={handlePayment}
            /> : null
        }
        {
          isModalPaymentVisible ?
            <Modal
              title={'Confirm the payment by entering the correct password'}
              type={PAYMENT}
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
