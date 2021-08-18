import {useState} from "react";
import { useDispatch } from 'react-redux'

import { saveTask } from '../../redux/users/actions'

import './index.scss'

const AddTask = () =>  {
  const [value, setValue] = useState("");
  const dispatch = useDispatch()

  const submitHandler = (event) => {
    event.preventDefault();
      dispatch(saveTask(value))
      setValue("");
  }

  const changeHandler = (event) =>  {
    setValue(event.target.value);
  }

  return (
    <form className="form-bord" onSubmit={submitHandler}>
      <input
        className="form-bord__todo"
        value={value}
        onChange={changeHandler}
      />
      <button className="form-bord__button" type="submit">Add</button>
    </form>
  );
}

export default AddTask;