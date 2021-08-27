import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useTheme } from '../../context/theme/theme-state'
import ThemeButton from '../theme-button'
import Modal from '../modal'
import { modalTypeConstants } from '../../constants/modal'

import './index.scss'
import { useSelector } from 'react-redux'

const ThemeBackground = () => {

  const { t } = useTranslation()
  const [isOpenButton, setIsOpenButton] = useState(false)
  const [isModalInfoVisible, setIsModalInfoVisible] = useState(false)
  const [isModalPaymentVisible, setIsModalPaymentVisible] = useState(false)
  const [password, setPassword] = useState(null)
  const isTheme = useTheme()
  const { REPAYMENT, CONFIRM } = modalTypeConstants

  const handleThemeButton = (e) => {
    isTheme.change(e.currentTarget.value)
    handleOpenModal()
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
  const handleSubmit = useCallback(() => setIsModalPaymentVisible(false), [])
  const handleChange = useCallback((e) => setPassword(e.target.value), [])

  return (
    <>
      <div className='dropdown' onClick={handleClickButton}>
        <button className='dropdown__button'>{t('theme')}</button>
        {isOpenButton && (
          <ThemeButton themeButton={handleThemeButton} />
        )}
      </div>
      {
        isModalInfoVisible ?
          <Modal
            title={t('modalTitleConfirm')}
            type={CONFIRM}
            body={t('modalBodyConfirm')}
            onClickCancel={handleCancel}
            handlePayment={handlePayment}
          /> : null
      }
      {
        isModalPaymentVisible ?
          <Modal
            title={t('modalTitlePayment')}
            type={REPAYMENT}
            body={<input onChange={handleChange} className='body__input' />}
            password={password}
            btnSubmitTitle={'submit'}
            onClickSubmit={handleSubmit}
            onClickCancel={handleCancel}
          /> : null
      }
    </>
  )
}

export default ThemeBackground