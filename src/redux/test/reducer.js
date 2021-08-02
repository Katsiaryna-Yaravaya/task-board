import { testActionTypes } from './types'

const INITIAL_STATE = {
  testData: 'initial redux state'
}

const previewItemReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case testActionTypes.TEST_TYPE:
      return {
        ...state,
        testData: action.payload
      }
    default:
      return state
  }
}

export default previewItemReducer
