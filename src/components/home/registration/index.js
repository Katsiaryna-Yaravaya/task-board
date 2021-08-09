import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { DATA_REGISTRATION_FORM } from '../../utils'
import { getUser, postUser } from '../../../backend/api'
import { saveUser } from '../../../redux/users/actions'
import { TABLE_BOARD_ROUTE } from '../../../constants/routs'

import RegistrationButton from './registration-button'
import Credential from './credential'

import './index.scss'

const Registration = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const state = { button: 1 }

  // TODO you can build useEffect with checking for user in the "user store"

  let history = useHistory()
  const dispatch = useDispatch()

  const createUser = () => {

    if (!isAuthenticated) {
      postUser(credentials).then(() => {
        // TODO send request to check is user already exists, if does => throw error, if not => create new one

        history.push(TABLE_BOARD_ROUTE)
      })
    }
  }

  const isEmailValid = ({ email }) => {
    const regex = /^\w+@\w+\.\w{2,}$/
    return regex.test(email)
  }

  const isNotRequestValid = (statusText) => statusText !== 'OK'

  const signIn = () => {
    const { email } = credentials

    getUser(email)
      .then(({ data, statusText }) => {
          if (isNotRequestValid(statusText)) return
          const registeredUser = data[0]
          setIsAuthenticated(!!registeredUser)
          //TODO  alert('User is not found') => setError(e.message)
          !!registeredUser ? history.push(TABLE_BOARD_ROUTE) : alert('User is not found')
         dispatch(saveUser(registeredUser))
        }
      )
  }
  // TODO please change null to setError
  const registration = () => {
    isEmailValid(credentials) ? createUser() : console.log('error')
  }

  const handleSubmit = (e, name) => {
    e.preventDefault()
    if (name === 'Sign in') {
      signIn()
    }
    if (name === 'registration') {
      registration()
    }
  }

  const handleChange = (event) => {
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
      </div>
    </div>
  )
}

export default Registration
