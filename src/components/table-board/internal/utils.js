/*
export const dragOverHandler = (e) => {
  e.preventDefault()
  if (e.target.className === 'item') {
    e.target.style.boxShadow = '0 4px 3px gray'
  }
}

export const dragLeaveHandler = (e) =>  {
  e.target.style.boxShadow = 'none'
}

export const dragStartHandler = (e, board, item) => {
  setCurrentBoard(board)
  setCurrentItem(item)
}

export  const dragEndHandler = (e) => {
  e.target.style.boxShadow = 'none'
}

export const dropHandler = (e, board, item) => {
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

export const dropCardHandler = (e, board) => {

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
}*/
