import { isEmpty, isNotRequestValid } from '../utils'

let mockObject = {
  id: 1,
  email: 'abcdef@mail.com',
  password: 'qwert',
  amount: 1,
  boards: [
    {
      id: 1,
      title: 'Do It',
      tasks: []
    }
  ],
  theme: {
    currentTheme: 'dark',
    paymentTheme: ['light', 'neutral']
  }
}

describe('isEmpty', () => {
  it('normal object should be false', () => {
    expect(isEmpty(mockObject)).toEqual(false)
  })
  it('empty object should be true ', () => {
    expect(isEmpty({})).toEqual(true)
  })
  it('null should be true', () => {
    expect(isEmpty(null)).toEqual(true)
  })
  it('undefined should be true', () => {
    expect(isEmpty(undefined)).toEqual(true)
  })
})

describe('isNotRequestValid', () => {
  it('statusText should be ok', () => {
    expect(isNotRequestValid('OK')).toEqual(false)
  })
})
