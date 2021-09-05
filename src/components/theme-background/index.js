import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../context/theme/theme-state'

import { Modal, ThemeButton } from '../index'

import { updateUsers } from '../../backend/api'
import { saveUser } from '../../redux/users/actions'

import { modalTypeConstants } from '../../constants/modal'

import './index.scss'

const ThemeBackground = () => {
  const { t } = useTranslation()
  const [isOpenButton, setIsOpenButton] = useState(false)
  const [isModalInfoVisible, setIsModalInfoVisible] = useState(false)
  const [isModalPaymentVisible, setIsModalPaymentVisible] = useState(false)
  const [password, setPassword] = useState(null)
  const [valueTheme, setValueTheme] = useState('')
  const isTheme = useTheme()
  const dispatch = useDispatch()
  const { REPAYMENT, CONFIRM } = modalTypeConstants

  const { user } = useSelector(state => state.data)

  const handleThemeButton = e => {
    const themeValue = e.currentTarget.value

    isTheme.change(themeValue)
    setValueTheme(themeValue)

    if (user.theme) {
      let isPayedTheme = user.theme.paymentTheme.includes(themeValue)
      if (!isPayedTheme) handleOpenModal()
      else {
        const userWithTheme = userConcatenation(user, themeValue)
        dispatch(saveUser(userWithTheme))
      }
    } else {
      const userWithDefaultTheme = userCreateTheme(themeValue)

      dispatch(saveUser(userWithDefaultTheme))
      handleOpenModal()
    }
  }

  const handleClickButton = () => setIsOpenButton(change => !change)
  const handleOpenModal = useCallback(() => setIsModalInfoVisible(true), [])
  const handlePayment = useCallback(() => {
    setIsModalInfoVisible(false)
    setIsModalPaymentVisible(true)
  }, [])
  const handleCancel = useCallback(() => {
    setIsModalPaymentVisible(false)
    setIsModalInfoVisible(false)
  }, [])

  const userConcatenation = (user, concat) => ({
    ...user,
    theme: {
      currentTheme: concat,
      paymentTheme: [...user.theme.paymentTheme].concat(concat)
    }
  })

  const userCreateTheme = theme => ({
    ...user,
    theme: {
      currentTheme: theme,
      paymentTheme: []
    }
  })

  const handleButtonCancel = () => {
    handleCancel()
    !user.theme.paymentTheme.length
      ? isTheme.change((user.theme.currentTheme = null))
      : isTheme.change(user.theme.currentTheme)
  }

  const handleSubmit = () => {
    const userWithTheme = userConcatenation(user, valueTheme)
    dispatch(saveUser(userWithTheme))
    updateUsers(user.id, userWithTheme).then()
    setIsModalPaymentVisible(false)
  }

  const handleChange = useCallback(e => setPassword(e.target.value), [])

  return (
    <>
      <div className="dropdown" onClick={handleClickButton}>
        <button className="dropdown__button">{t('theme')}</button>
        {isOpenButton ? <ThemeButton themeButton={handleThemeButton} /> : null}
      </div>
      {isModalInfoVisible ? (
        <Modal
          title={t('modalTitleConfirm')}
          type={CONFIRM}
          body={t('modalBodyConfirm')}
          onClickCancel={handleButtonCancel}
          handlePayment={handlePayment}
        />
      ) : null}
      {isModalPaymentVisible ? (
        <Modal
          title={t('modalTitlePayment')}
          type={REPAYMENT}
          body={<input onChange={handleChange} className="body__input" />}
          password={password}
          btnSubmitTitle={'submit'}
          onClickSubmit={handleSubmit}
          onClickCancel={handleButtonCancel}
        />
      ) : null}
    </>
  )
}

export default ThemeBackground
