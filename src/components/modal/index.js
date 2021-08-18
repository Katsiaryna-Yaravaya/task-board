import { Component } from 'react'
import { connect } from 'react-redux'

import ThemeContext from '../../context/theme/theme-context'
import { modalTypeConstants } from '../../constants/modal'
import { updateUsersAmount } from '../../backend/api'

import './index.scss'
// import store from '../../redux/store'

class Modal extends Component {
  static contextType = ThemeContext

  state = {
    // user: this.props.user,
    error: ''
  }
  // componentDidMount() {
  //   this.setState({
  //     ...this.state,
  //     user: this.props.user
  //   })
  // }
  // componentDidUpdate() {
  //     console.log('componentDidUpdate')
  // }
  // componentWillUnmount() {
  //   console.log('componentWillUnmount')
  // }

  handleSubmit = () => {
    const {password, user, onClickSubmit, oneDollarPayment} = this.props
    if (password === user.password) {
      onClickSubmit()
      oneDollarPayment()
    } else this.setState({ error: 'password not correct' })

    // достать юзера и провести оплату по правильно введённому паролю
  }

    handleUserAmountUpdate = () => {
      // console.log('user', this.props.user)
      // this.props.updateUserAmount(this.props.user.id, {amount: 20})
    }

  handleCancel = () => {
    this.props.onClickCancel()
    this.context.change(null)
  }

  render() {
    const { title, body, handlePayment, btnSubmitTitle = 'payment', type } = this.props
    const { error } = this.state

    const isConfirmType = type === modalTypeConstants.CONFIRM

    const handlePay = () => isConfirmType ? handlePayment() : this.handleSubmit()

    return (
      <div className='modal' onClick={this.handleUserAmountUpdate}>
        <div className='modal-content'>

          {title ? (
            <div className='modal__header'>
              <h4 className='header__title'>
                {title}
              </h4>
            </div>
          ) : null}

          {body ? (
            <div className='modal__body'>
              {body}
            </div>
          ) : null}

          {/*<div className='modal-footer'>*/}
          <div className='modal__footer'>
            <button
              // className='modal-footer__button'
              className='footer__button'
              onClick={() => handlePay()}
            >
              {btnSubmitTitle}
            </button>
            <button className='footer__button' onClick={() => this.handleCancel()}>cancel</button>
          </div>
          {error}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ data: { user } }) => ({
  user
})

const mapDispatchToProps = (dispatch) => ({
  // updateUserAmount: (id, data) => dispatch(updateUsersAmount(id, data)),
  oneDollarPayment: () => dispatch({ type: 'ONE_DOLLAR_PAYMENT' })
})

export default connect(mapStateToProps, mapDispatchToProps)(Modal)