import React from 'react'
import { AddTask } from '../../index'
import { shallow } from 'enzyme'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

Enzyme.configure({ adapter: new Adapter() })

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

describe('add-task', () => {
  it('add-task shallow', () => {
    const tree = shallow(
      <Provider store={mockStore()}>
        <AddTask />
      </Provider>
    )
    expect(tree).toMatchSnapshot()
  })
})
