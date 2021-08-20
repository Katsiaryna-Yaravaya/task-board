import * as types from './types'

const INITIAL_STATE = {
  user: {},
  taskId: ''
}

const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.userActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload
      }
    case types.userActionTypes.ONE_DOLLAR_PAYMENT:
      return {
        ...state,
        user: {
          ...state.user,
          amount: state.user.amount - 1
        }
      }
    case types.userActionTypes.SET_TASK:
      const tempBoards = state.user.boards.map((board, idx) => {
        if (idx === 0) {
          return {
            id: board.id,
            title: board.title,
            tasks: board.tasks.concat({ id: state.user.boards[0].tasks.length + 1, title: action.payload })
          }
        }
        return board
      })
      return {
        ...state,
        user: {
          ...state.user,
          boards: tempBoards
        }
      }
    case types.userActionTypes.SET_TASK_ID:
      return {
        user:{
          ...state.user
        },
        taskId: action.payload
      }

    default:
      return state
  }
}

export default usersReducer
