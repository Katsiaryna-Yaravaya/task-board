import { AddTask } from '../../index'
import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

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
