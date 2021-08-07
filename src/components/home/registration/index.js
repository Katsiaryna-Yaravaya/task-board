import { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getUsers, postUser } from '../../../backend/api'

import './index.scss'
import { v4 as uuidv4 } from 'uuid'

const Registration = () => {

  const [login, setLogin] = useState({
    email: '',
    password: ''
  })
  const [isAuth, setIsAuth] = useState(null)

  let history = useHistory()

  const routToBord = () => {
    history.push('/table-board')
  }

  const createNewUser = useCallback(() => {
    if (!isAuth) {
      postUser({ ...login }).catch()
    }
  }, [isAuth, { ...login }])

  const validator = ({email}) => {
    const regExpValidEmail = /^\w+@\w+\.\w{2,}$/;
    if (!regExpValidEmail.test(email)) {
      alert('email не валиден')
      return false
    }
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const isValid = validator({...login})
    if (!isValid) {
      return
    }
    const { email, password } = login
    getUsers().then(res => {
        const isAuthorization = res.some(user => user.email === email && user.password === password)
        setIsAuth(isAuthorization)
      }
    )
    createNewUser()
    routToBord()
  }

  const handleChange = (event) => {
    let { name, value } = event.target
    setLogin({
      ...login,
      [name]: value
    })
  }

  return (
    <div className='content'>
      <div className='box'>
        <h2 className='box__title'>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='inputBox'>
            <input
              className='inputBox__userName'
              type='text'
              required
              value={login.email}
              name='email'
              onChange={handleChange}
            />
            <label className='inputBox__wrapText'>e-mail</label>
          </div>
          <div className='inputBox'>
            <input
              className='inputBox__userName'
              type='password'
              required
              value={login.password}
              name='password'
              onChange={handleChange}
            />
            <label className='inputBox__wrapText'>password</label>
          </div>
          <input
            className='signIn'
            type='submit'
            name=''
            value='Sign in'
          />
        </form>
      </div>
    </div>
  )
}

export default Registration