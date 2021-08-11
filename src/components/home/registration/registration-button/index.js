import './index.scss'

const RegistrationButton = ({ type, name, value, className, clickHandler }) => {

  return (
      <input
        className={className}
        type={type}
        name={name}
        value={value}
        onClick={(e) => clickHandler(e, name)}
      />
  )
}
export default RegistrationButton
