import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { useTheme } from '../../context/theme/theme-state'
import ThemeBackground from '../theme-background'
import Modal from '../modal'
import Tasks from './tasks'

import './index.scss'

const Table = () => {

  const [boards, setBoards] = useState([
    { id: 1, title: 'Do It', tasks: [{ id: 1, title: 'Go' }, { id: 2, title: 'Went' }, { id: 3, title: 'Gone' }] },
    { id: 2, title: 'In progress', tasks: [{ id: 4, title: 'Be' }, { id: 5, title: 'Was' }, { id: 6, title: 'Been' }] },
    { id: 3, title: 'Done', tasks: [{ id: 7, title: 'Do' }, { id: 8, title: 'Did' }, { id: 9, title: 'Done' }] }
  ])

  const user = useSelector(state => state.data.user)
  // console.log('user', user)

  const [currentBoard, setCurrentBoard] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)
  const [isOpenModalInfo, setIsOpenModalInfo] = useState(false)
  const [isOpenModalPayment, setIsOpenModalPayment] = useState(false)
  const [password, setPassword] = useState(null)
  const theme = useTheme()

  const dragOverHandler = (e) => {
    e.preventDefault()
    if (e.target.className === 'item') e.target.style.boxShadow = '0 4px 3px gray'
  }
  const dragLeaveHandler = (e) => {
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

  const handleOpenModal = () => {
    setIsOpenModalInfo(true);
  }
  const handlePayment = () => {
    setIsOpenModalInfo(false);
    setIsOpenModalPayment(true);
  }
  const handleCancel = () => {
    setIsOpenModalPayment(false);
    setIsOpenModalInfo(false);
  }
  const handleSubmit = () =>{
    setIsOpenModalPayment(false);
  }
  const handleChange =(event) => {
    setPassword(event.target.value)
  }

  return (
    <>
      <ThemeBackground openModal={handleOpenModal} />
      <div className='app' style={theme.theme}>
        {boards.map(board =>
          <div
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropCardHandler(e, board)}
            className='board'
            key={board.id}
          >
            <div className='board__title'>{board.title}</div>
            {board.tasks.map((task) => {
              return <Tasks
                onDragOver={(e) => dragOverHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragStart={(e) => dragStartHandler(e, board, task)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDrop={(e) => dropHandler(e, board, task)}
                key={task.id}
                task={task.title}
              />
            })}
          </div>
        )}
        <Modal
          title={'Pay for your new theme'}
          body={'Only ONE dollar and this topic is yours!'}
          show={isOpenModalInfo}
          onClickPayment={handlePayment}
          onClickCancel={handleCancel}
        />
        <Modal
          title={'Confirm the payment by entering the correct password'}
          body={<input onChange={handleChange} className='body__input'/>}
          password={password}
          btnSubmitTitle={'submit'}
          show={isOpenModalPayment}
          onClickSubmit={handleSubmit}
          onClickCancel={handleCancel}
        />
      </div>
    </>
  )
}

export default Table
