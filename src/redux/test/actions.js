import { testService } from '../../servces/test'
import { testActionTypes } from './types'

const updateTestData = payload => ({
  type: testActionTypes.TEST_TYPE,
  payload
})

const getUsers = () => async (dispatch, getState) => {
  console.log('getState', getState().test)
  // const users = await axios.get('http://localhost:5000/users')
  try {
    const { data: users, status } = await testService.getUsers()
    const response = await testService.getUsers()
    console.log('response', response)
    if (status !== 200) return

    dispatch({
      type: testActionTypes.SET_USERS,
      payload: users
    })
    console.log(users)
  } catch (e) {
    console.log(e)
  }
}

export const testActions = {
  updateTestData,
  getUsers
}