import { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import ThemeContext from '../../context/theme/theme-context'
import { modalTypeConstants } from '../../constants/modal'

import './index.scss'

class Modal extends Component {
  static contextType = ThemeContext

  state = {
    error: ''
  }

  handleSubmit = () => {
    const { password, user, onClickSubmit, oneDollarPayment } = this.props
    if (password === user.password && user.amount > 0) {
      onClickSubmit()
      oneDollarPayment()
    } else this.setState({ error: this.props.t('errorModal') })
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
      <div className='modal'>
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

          <div className='modal__footer'>
            <button
              className='footer__button'
              onClick={() => handlePay()}
            >
              {this.props.t(btnSubmitTitle)}
            </button>
            <button className='footer__button' onClick={() => this.handleCancel()}>{this.props.t('cancel')}</button>
          </div>
          {error && <span className='modal__error-message'>{error}</span>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ data: { user } }) => ({
  user
})

const mapDispatchToProps = (dispatch) => ({
  oneDollarPayment: () => dispatch({ type: 'ONE_DOLLAR_PAYMENT' })
})

const Extended = withTranslation()(Modal)
Extended.static = Modal.static

Modal.propTypes = {
  title: PropTypes.string,
  body: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  handlePayment: PropTypes.func,
  btnSubmitTitle: PropTypes.string,
  type: PropTypes.string
}

export default compose(withTranslation(), connect(mapStateToProps, mapDispatchToProps))(Modal)
