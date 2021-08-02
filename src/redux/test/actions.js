import { testActionTypes } from './types'

const updateTestData = payload => ({
  type: testActionTypes.TEST_TYPE,
  payload
})

export const testActions = {
  updateTestData
}
