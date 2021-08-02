import { useState } from 'react'

import TestContext from './test-context'

const TestState = (props) => {
  const [testContextData, setTestContextData] = useState('initial context data')

  return (
    <TestContext.Provider
      value={{
        testContextData,
        setTestContextData
      }}
    >
      {props.children}
    </TestContext.Provider>
  )
}

export default TestState
