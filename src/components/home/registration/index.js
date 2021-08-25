import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { DATA_REGISTRATION_FORM, getFromLocalStorage } from '../../utils'
import { getUser, postUser } from '../../../backend/api'
import { saveUser } from '../../../redux/users/actions'
import { IS_NOT_REQUEST_VALID, TABLE_BOARD_ROUTE } from '../../../constants/routs'

import RegistrationButton from './registration-button'
import Credential from './credential'

import './index.scss'
import { DEFAULT_BOARDS } from '../../../constants/general'

const Registration = () => {
  const { t } = useTranslation()
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    amount: 3
  })
  const [credentialsError, setCredentialsError] = useState(null)
  const { email, password } = credentials

  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    const user = getFromLocalStorage('user')
    if (user) {
      dispatch(saveUser(user))
      history.push(TABLE_BOARD_ROUTE)
    }
  })

  const encodedUserCredentials = {
    ...credentials,
    password: window.btoa(unescape(encodeURIComponent(password)))
  }

  const decodedUserCredentials = {
    ...credentials,
    password: window.atob(encodedUserCredentials.password)
  }

  const createUser = async () => {
    let isError = false
    await getUser(email).then((user) => {
      user.data.forEach(item => {
        if (item.email === email) {
          setCredentialsError(t('credentialsErrorExists'))
          isError = true
        }
      })
    })

    if (isError) return

    const user = { ...credentials, ...DEFAULT_BOARDS }

    postUser(user).then((requestedUser) => {
      dispatch(saveUser(requestedUser))
      history.push(TABLE_BOARD_ROUTE)
    })
  }

  const isEmailValid = ({ email }) => {
    const regex = /^\w+@\w+\.\w{2,}$/
    return regex.test(email)
  }

  const signIn = () => {
    getUser(email)
      .then(({ data, statusText }) => {
        if (IS_NOT_REQUEST_VALID(statusText)) return

        if (!data.length) {
          setCredentialsError(t('credentialsErrorNoExists'))
          return
        }

        !!data[0] && data[0].password === password ?
          history.push(TABLE_BOARD_ROUTE) :
          setCredentialsError(t('credentialsErrorIncorrect'))

        dispatch(saveUser(data[0]))
        data[0].password = decodedUserCredentials.password
      })
  }

  const registration = () => {
    isEmailValid(credentials) && encodedUserCredentials ? createUser() : setCredentialsError(t('credentialsErrorNotValid'))
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
        <h2 className='box__title'>{t('Login')}</h2>
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
