import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { saveTask } from '../../redux/users/actions'

import './index.scss'

const AddTask = () => {
  const [value, setValue] = useState('')
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const submitHandler = event => {
    event.preventDefault()

    if (value.trim()) {
      dispatch(saveTask(value))
      setValue('')
    }
  }

  const changeHandler = ({ target }) => setValue(target.value)

  return (
    <form className="form-bord" onSubmit={submitHandler}>
      <input
        className="form-bord__todo"
        value={value}
        onChange={changeHandler}
      />
      <button className="form-bord__button" type="submit">
        {t('add')}
      </button>
    </form>
  )
}

export default AddTask
