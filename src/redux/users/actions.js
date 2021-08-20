import * as types from './types'
import axios from 'axios'

export const saveUser = (user) => ({
  type: types.userActionTypes.SET_USER,
  payload: user
})

export const saveTask = (task) => ({
  type: types.userActionTypes.SET_TASK,
  payload: task
})

export const saveIdTask = (taskId) => ({
  type: types.userActionTypes.SET_TASK_ID,
  payload: taskId
})
