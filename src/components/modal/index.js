import React, { Component } from 'react'
import './index.scss'
import ThemeContext from '../../context/theme/theme-context'

class Modal extends Component {

  static contextType = ThemeContext;
/*

  componentDidMount() {

    let value = this.context;
    /!* perform a side-effect at mount using the value of MyContext *!/
  }

  componentDidUpdate() {
    let value = this.context;
    /!* ... *!/
  }
  componentWillUnmount() {
    let value = this.context;
    /!* ... *!/
  }
*/
  handlePayment = () => {
    // достать юзера и провести оплату по правильно введённому паролю
  }

  handleCancel = () => {
    this.props.closeModal()
    this.context.change(null)
  }

  render() {
    if (!this.props.show) {
      return null
    }

    return (
      <div className='modal'>
        <div className='modal-content' onClick={e => e.stopPropagation()}>
          <div className='modal__header'>
            <h4 className='header__title'>Pay your new theme</h4>
          </div>

          <div className='modal__body'>
            Only ONE dollar and this topic is yours!
          </div>

          <div className='modal__footer'>
            <button className='footer__button' onClick={this.handlePayment}>payment</button>
            <button className='footer__button' onClick={this.handleCancel}>cancel</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal