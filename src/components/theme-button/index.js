import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import { THEME_DARK, THEME_LIGHT, THEME_NEUTRAL } from '../../constants/theme'

import './index.scss'

const ThemeButton = ({themeButton}) => {

  const {t} = useTranslation()

  return (
    <div className='theme-choose'>
      <button className='button-theme-light theme__button' value={THEME_LIGHT} onClick={themeButton}>{t('light')}
      </button>
      <button className='button-theme-dark theme__button' value={THEME_DARK} onClick={themeButton}>{t('dark')}
      </button>
      <button className='button-theme-neutral theme__button' value={THEME_NEUTRAL} onClick={themeButton}>{t('neutral')}
      </button>
    </div>
  )
}

ThemeButton.propTypes = {
  themeButton: PropTypes.func
}

export default ThemeButton