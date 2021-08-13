import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { DATA_REGISTRATION_FORM } from '../../utils'
import { getUser, postUser } from '../../../backend/api'
import { saveUser } from '../../../redux/users/actions'
import { IS_NOT_REQUEST_VALID, TABLE_BOARD_ROUTE } from '../../../constants/routs'

import RegistrationButton from './registration-button'
import Credential from './credential'

import './index.scss'

const Registration = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    mount: null
  })
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [credentialsError, setCredentialsError] = useState(null)
  const { email, password } = credentials

  // TODO you can build useEffect with checking for user in the "user store"
  // const user = useSelector(state => state.data.user) зачем нам надо проверять на юзера в сторе?

  let history = useHistory()
  const dispatch = useDispatch()

  const encodedUserCredentials = {
    ...credentials,
    password: window.btoa(password)
  }

  const decodedUserCredentials = {
    ...credentials,
    password: window.atob(encodedUserCredentials.password)
  }

  const createUser = () => {
    if (!isAuthenticated) {
      getUser(email).then((user) => {
        if (user.data.email === email) setCredentialsError('User already exists')
      })
      if (credentialsError) return
      postUser(credentials).then(() => {
        history.push(TABLE_BOARD_ROUTE)
      })
    }
  }

  const isEmailValid = ({ email }) => {
    const regex = /^\w+@\w+\.\w{2,}$/
    return regex.test(email)
  }

  const signIn = () => {
    getUser(email)
      .then(({ data, statusText }) => {

        if (IS_NOT_REQUEST_VALID(statusText)) return
        data[0].password = decodedUserCredentials.password
        const registeredUser = data[0]
        setIsAuthenticated(!!registeredUser)

        !!registeredUser && registeredUser.password === password ?
          history.push(TABLE_BOARD_ROUTE) :
          setCredentialsError('Email or password are incorrect')

        dispatch(saveUser(registeredUser))
      })
  }

  const registration = () => {
    isEmailValid(credentials) && encodedUserCredentials ? createUser() : setCredentialsError('User is not valid')
  }

  const handleSubmit = (e, name) => {
    e.preventDefault()

    if (name === 'Sign in') signIn()
    if (name === 'registration') registration()
  }

  const handleChange = (event) => {
    setCredentialsError(null)

    let { name, value } = event.target
    setCredentials({
      ...credentials,
      [name]: value
    })
  }

  return (
    <div className='content'>
      <div className='box'>
        <h2 className='box__title'>Login</h2>
        <form>
          {DATA_REGISTRATION_FORM.length > 0 && DATA_REGISTRATION_FORM.map((inputData, idx) => {
              if (inputData.type === 'submit') {
                return (
                  <RegistrationButton
                    key={idx}
                    type={inputData.type}
                    name={inputData.name}
                    value={inputData.value}
                    clickHandler={handleSubmit}
                    className={inputData.className}
                  />
                )
              }
              return (
                <Credential
                  key={idx}
                  type={inputData.type}
                  name={inputData.name}
                  value={credentials[inputData.value]}
                  onChange={handleChange}
                  className={inputData.className}
                  autocomplete={inputData.autocomplete}
                  label={inputData.label}
                  required
                />
              )
            }
          )}
        </form>
        {credentialsError && <span className='error-message'>{credentialsError}</span>}
      </div>
    </div>
  )
}

export default Registration
