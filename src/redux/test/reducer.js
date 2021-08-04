import { testActionTypes } from './types'

const INITIAL_STATE = {
  users: [],
  user: {}
}

const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case testActionTypes.TEST_TYPE:
      return {
        ...state,
        testData: action.payload
      }
    case testActionTypes.SET_USERS:
      return {
        ...state,
        users: action.payload
      }
    default:
      return state
  }
}

export default usersReducer
