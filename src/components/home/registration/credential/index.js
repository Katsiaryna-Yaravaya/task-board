import '../index.scss'

const Credential = ({ required, autocomplete, type, name, value, onChange, className, label }) => {
  return (
    <div className='inputBox'>
      <input
        className={className}
        type={type}
        name={name}
        value={value}
        autoComplete={autocomplete}
        required={required}
        onChange={onChange}
      />
      <label className='inputBox__wrapText'>{label}</label>
    </div>
  )
}
export default Credential
