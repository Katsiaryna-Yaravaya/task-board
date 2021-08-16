import * as types from './types'

const INITIAL_STATE = {
  user: {},
}

const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.userActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload
      }
    case types.userActionTypes.ONE_PAYMENT:
      return {
        ...state,
        user: {
          ...state.user,
          amount: state.user.amount-1
        }
      }
    default:
      return state
  }
}

export default usersReducer
