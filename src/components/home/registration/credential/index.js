import './index.scss'

const Credential = ({ required, autocomplete, type, name, value, onChange, className, label }) => {
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
      <label className='input-box__wrap-text'>{label}</label>
    </div>
  )
}
export default Credential
