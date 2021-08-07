import { SET_IS_AUTHORISATION, testActionTypes } from './types'
import * as types from './types'


const INITIAL_STATE = {
  users: [],
  user: {},
  loading: true,
  isAuthorize: false,
}

const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      }
    case types.SET_IS_AUTHORISATION:
      return {
        ...state,
        isAuthorize: action.payload,
      }
    case types.ADD_USER:
      return {
        ...state,
        loading: false,
      }
    default:
      return state
  }
}

export default usersReducer


/*

case testActionTypes.TEST_TYPE:
return {
  ...state,
  testData: action.payload
}
case testActionTypes.SET_USERS:
return {
  ...state,
  users: action.payload
}*/
