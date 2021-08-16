import React, { Component } from 'react'
import ThemeContext from '../../context/theme/theme-context'
import './index.scss'
import { connect } from 'react-redux'
import store from '../../redux/store'
import { putUser } from '../../backend/api'

class Modal extends Component {

  static contextType = ThemeContext

  state = {
    error: ''
  }

  // componentDidMount() {
  //   this.setState({
  //     ...this.state,
  //     user: this.props.user
  //   })
  // }

  /*
     componentDidUpdate() {
       let value = this.context;
       /!* ... *!/
     }

   */

  // componentWillUnmount() {
  //   console.log('componentWillUnmount')
  // }

  handlePayment = () => {
    this.props.onClickPayment()
  }

  handleSubmit = () => {
    if (this.props.password === this.props.user.password) {
      this.props.onClickSubmit()
      this.props.onePayment()
    } else {
      this.setState({
        ...this.state,
        error: 'password not correct'
      })
    }
    // достать юзера и провести оплату по правильно введённому паролю
  }

  handleCancel = () => {
    this.props.onClickCancel()
    this.context.change(null)
  }

  render() {
    if (!this.props.show) {
      return null
    }

    return (
      <div className='modal'>
        <div className='modal-content' onClick={e => e.stopPropagation()}>

          {this.props.title && (
            <div className='modal__header'>
              <h4 className='header__title'>
                {this.props.title}
              </h4>
            </div>
          )}

          {this.props.body && (
            <div className='modal__body'>
              {this.props.body}
            </div>
          )}

          <div className='modal__footer'>
            <button
              className='footer__button'
              onClick={e => this.props.onClickPayment ? this.handlePayment() : this.handleSubmit()}
            >
              {this.props.btnSubmitTitle ? this.props.btnSubmitTitle : 'payment'}
            </button>
            <button className='footer__button' onClick={this.handleCancel}>cancel</button>
          </div>
          {this.state.error}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.data.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // user: (id) => dispatch(putUser(id)),
    onePayment: () => dispatch({ type: 'ONE_PAYMENT' })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)