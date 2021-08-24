import * as types from './types'
import { v4 as uuidv4 } from 'uuid'

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
            tasks: board.tasks.concat({ id: uuidv4(), title: action.payload, description: '' })
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
        user: {
          ...state.user
        },
        taskId: action.payload
      }
    case types.userActionTypes.DELETE_TASK:
      const deletedTask = state.user.boards.map(board => {
        return {
          id: board.id,
          title: board.title,
          tasks: board.tasks.filter(task => task.id !== action.payload)
        }
      })
      return {
        user: {
          ...state.user,
          boards: deletedTask

        }
      }
    case types.userActionTypes.SAVE_TASK:
      const savedTask = state.user.boards.map(board => {
        return {
          id: board.id,
          title: board.title,
          tasks: board.tasks.map(task => {
            if (task.id === action.payload.taskId) {
              return {
                id: task.id,
                title: task.title,
                description: action.payload.value
              }
            }
            return task
          })
        }
      })
      return {
        user: {
          ...state.user,
          boards: savedTask
        }
      }

    default:
      return state
  }
}

export default usersReducer
