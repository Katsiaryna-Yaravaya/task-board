import * as types from './types'
import axios from 'axios'

export const saveUser = (user) => {
  // localStorage.setItem('user', JSON.stringify(user))
  return {
    type: types.userActionTypes.SET_USER,
    payload: user
  }
}

export const saveTask = (task) => {
  return {
    type: types.userActionTypes.SET_TASK,
    payload: task
  }
}

export const saveIdTask = (taskId) => ({
  type: types.userActionTypes.SET_TASK_ID,
  payload: taskId
})

export const deleteTask = (id) => ({
  type: types.userActionTypes.DELETE_TASK,
  payload: id
})

export const savedTask = (description) => ({
  type: types.userActionTypes.SAVE_TASK,
  payload: description
})

// export const getFromLocal = (payload) => ({
//   type: types.userActionTypes.GET_FROM_LOCAL_STORAGE,
//   payload
// })

export const logout = (user) => {
  localStorage.clear()
  return {
    type: types.userActionTypes.LOGOUT_USER,
    payload: user
  }
}