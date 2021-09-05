import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Credential, RegistrationButton } from '../index'

import { DATA_REGISTRATION_FORM, isNotRequestValid } from '../utils'
import { getUser, postUser } from '../../backend/api'
import { saveUser } from '../../redux/users/actions'
import { TABLE_BOARD_ROUTE } from '../../constants/routs'
import { DEFAULT_BOARDS, SIGN_IN } from '../../constants/general'

import './index.scss'

const Registration = () => {
  const { t } = useTranslation()
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    amount: 4
  })
  const [credentialsError, setCredentialsError] = useState(null)
  const { email, password } = credentials

  const history = useHistory()
  const dispatch = useDispatch()

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

    await getUser(email).then(({ data }) => {
      data.forEach(item => {
        if (item.email === email) {
          setCredentialsError(t('credentialsErrorExists'))
          isError = true
        }
      })
    })

    if (isError) return

    const user = { ...credentials, ...DEFAULT_BOARDS }

    postUser(user).then(requestedUser => {
      dispatch(saveUser(requestedUser))
      history.push(TABLE_BOARD_ROUTE)
    })
  }

  const isEmailValid = ({ email }) => {
    const regex = /^\w+@\w+\.\w{2,}$/
    return regex.test(email)
  }

  const signIn = () => {
    getUser(email).then(({ data, statusText }) => {
      if (isNotRequestValid(statusText)) return

      if (!data.length) {
        setCredentialsError(t('credentialsErrorNoExists'))
        return
      }

      data[0].password === password
        ? history.push(TABLE_BOARD_ROUTE)
        : setCredentialsError(t('credentialsErrorIncorrect'))

      dispatch(saveUser(data[0]))
      data[0].password = decodedUserCredentials.password
    })
  }

  const registration = () =>
    isEmailValid(credentials) && encodedUserCredentials
      ? createUser()
      : setCredentialsError(t('credentialsErrorNotValid'))

  const handleSubmit = (e, name) => {
    e.preventDefault()
    name === SIGN_IN ? signIn() : registration()
  }

  const handleChange = event => {
    setCredentialsError(null)

    let { name, value } = event.target
    setCredentials({
      ...credentials,
      [name]: value
    })
  }

  return (
    <div className="content">
      <div className="box">
        <h2 className="box__title">{t('login')}</h2>
        <form>
          {DATA_REGISTRATION_FORM.map(
            ({ type, name, value, className, label, autocomplete }, idx) =>
              type === 'submit' ? (
                <RegistrationButton
                  key={idx}
                  type={type}
                  name={name}
                  value={value}
                  clickHandler={handleSubmit}
                  className={className}
                />
              ) : (
                <Credential
                  key={idx}
                  type={type}
                  name={name}
                  value={credentials[value]}
                  onChange={handleChange}
                  className={className}
                  autocomplete={autocomplete}
                  label={label}
                  required
                />
              )
          )}
        </form>
        {credentialsError && (
          <span className="error-message">{credentialsError}</span>
        )}
      </div>
    </div>
  )
}

export default Registration
