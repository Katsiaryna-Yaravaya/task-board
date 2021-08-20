import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'

import './index.scss'

const Credential = ({ required, autocomplete, type, name, value, onChange, className, label }) => {

  const { t } = useTranslation()

  return (
    <div className='input-box'>
      <input
        className={className}
        type={type}
        name={name}
        value={value}
        autoComplete={autocomplete}
        required={required}
        onChange={onChange}
      />
      <label className='input-box__wrap-text'>{t(label)}</label>
    </div>
  )
}
Credential.propTypes ={
  required: PropTypes.bool,
  autocomplete: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  label: PropTypes.string
}

export default Credential
