import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import './index.scss'
import { BUTTON_THEME } from '../utils'

const ThemeButton = ({ themeButton }) => {
  const { t } = useTranslation()

  return (
    <div className="theme-choose">
      {BUTTON_THEME.map(({ className, value, label }, idx) => {
        return (
          <button
            key={idx}
            className={className}
            value={value}
            onClick={themeButton}
          >
            {t(label)}
          </button>
        )
      })}
    </div>
  )
}

ThemeButton.propTypes = {
  themeButton: PropTypes.func
}

export default ThemeButton
