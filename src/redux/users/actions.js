import * as types from './types'
import axios from 'axios'

export const saveUser = (user) => ({
  type: types.userActionTypes.SET_USER,
  payload: user
})
