import * as types from './types'
import axios from 'axios'

const getUsers = (users) => ({
  type: types.GET_USERS,
  payload: users
})

const userAdded = () => ({
  type: types.ADD_USER
})

export const addUser = (user) => {
  return function(dispatch) {
    axios
      .post(`${process.env.REACT_APP_HOST}`, user)
      .then((res) => {
        console.log('resp', res)
        dispatch(userAdded(res.data))
      })
      .catch(error => console.log(error))
  }
}
