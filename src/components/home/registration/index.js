import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { DATA_REGISTRATION_FORM } from '../../utils'
import { getUser, postUser } from '../../../backend/api'
import { saveUser } from '../../../redux/users/actions'
import { IS_NOT_REQUEST_VALID, TABLE_BOARD_ROUTE } from '../../../constants/routs'

import RegistrationButton from './registration-button'
import Credential from './credential'

import './index.scss'

const Registration = () => {
  const { t } = useTranslation()
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    amount: 3
  })
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const [credentialsError, setCredentialsError] = useState(null)
  const { email, password } = credentials

  // TODO you can build useEffect with checking for user in the "user store"
  // const user = useSelector(state => state.data.user) зачем нам надо проверять на юзера в сторе?

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
    const boards = {
      'boards': [
        {
          'id': 1,
          'title': 'Do It',
          'tasks': []
        },
        {
          'id': 2,
          'title': 'In progress',
          'tasks': []
        },
        {
          'id': 3,
          'title': 'Done',
          'tasks': []
        }
      ]
    }
    let isError = false
    if (!isAuthenticated) {
      await getUser(email).then((user) => {
        user.data.forEach(item => {
          if (item.email === email) {
            setCredentialsError(t('credentialsErrorExists'))
            isError = true
          }
        })
      })

      if (isError) return

      const user = { ...credentials, ...boards }
      postUser(user).then((requestedUser) => {
        dispatch(saveUser(requestedUser))
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

        if (data.length === 0) {
          setCredentialsError(t('credentialsErrorNoExists'))
          return
        }

        data[0].password = decodedUserCredentials.password
        const registeredUser = data[0]
        setIsAuthenticated(!!registeredUser)

        !!registeredUser && (registeredUser.password === password) ?
          history.push(TABLE_BOARD_ROUTE) :
          setCredentialsError(t('credentialsErrorIncorrect'))

        dispatch(saveUser(registeredUser))
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
