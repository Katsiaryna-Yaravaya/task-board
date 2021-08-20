import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import './index.scss'

const RegistrationButton = ({ type, name, value, className, clickHandler }) => {

  const { t } = useTranslation()

  return (
      <input
        className={className}
        type={type}
        name={name}
        value={t(value)}
        onClick={(e) => clickHandler(e, name)}
      />
  )
}

RegistrationButton.propTypes ={
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  className: PropTypes.string,
  clickHandler:PropTypes.func
}

export default RegistrationButton
