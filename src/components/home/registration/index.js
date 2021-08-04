import './index.scss'

const Registration = () => {
  return (
    <div className='content'>
      <div className='box'>
        <h2 className='box__title'>Login</h2>
        <form>
          <div className='inputBox'>
            <input className="inputBox__userName" type='text' name='' required />
            <label className="inputBox__wrapText">Username</label>
          </div>
          <div className='inputBox'>
            <input className="inputBox__userName" type='password' name='' required />
            <label className="inputBox__wrapText">password</label>
          </div>
          <input className='signIn' type='submit' name='' value='Sign in' />
        </form>
      </div>
    </div>

  )
}

export default Registration