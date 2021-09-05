import usersReducer from '../reducer'
import { saveUser } from '../actions'

const stateUser = {
  user: {
    id: 1,
    email: 'qwertty@mail.com',
    password: 'qwert',
    amount: 1,
    boards: [],
    theme: {}
  }
}

it('new user should be added', () => {
  let action = saveUser('ekaterina.com')
  let newState = usersReducer(stateUser, action)
  expect(newState.user.length).toBe(13)
})
