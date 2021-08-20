import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import { useTheme } from '../../context/theme/theme-state'
import ThemeButton from '../theme-button'

import './index.scss'

const ThemeBackground = ({ openModal }) => {

  const {t} = useTranslation()
  const [isOpenButton, setIsOpenButton] = useState(false)

  const isTheme = useTheme()

  const handleThemeButton = (e) => {
    isTheme.change(e.currentTarget.value)
    openModal()
  }

  const handleClickButton = () => {
    setIsOpenButton(change => !change)
  }

  return (
    <div className='dropdown' onClick={handleClickButton}>
      <button className='dropdown__button'>{t('theme')}</button>
      {isOpenButton && (
        <ThemeButton themeButton={handleThemeButton}/>
      )}
    </div>
  )
}

ThemeBackground.propTypes = {
  // openModal: PropTypes.
}

export default ThemeBackground