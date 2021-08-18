import { useState } from 'react'

import edit from "./edit.png"
import download from "./download.png"
import deleteIcon from "./delete.png"

import './index.scss'

const ExpandedTask = () => {
  const [task, setTask] = useState([
    {
      id: 123,
      title: 'Go',
      description: 'dktgynjyhmyutjyugflgynjyhmyutjyugflgynjyhmyutjyugflgynjyhmyutjyugflgynjyhmyutjyugflgynj yhmyutjyugflmjbhs'

    }])

  return (
    <div className='task'>

      <div className='task__title'>
        {task.map(item => {
          return <h2>{item.title}</h2>
        })}
      </div>

      <textarea placeholder='Write a description of your task!' className='task__edit' />

      {task.map(item => {
        return <p className='task__description'>{item.description}</p>
      })}

      <div className='task-block-buttons'>
        <button className='task-block-buttons__change task-button'><img className="task-button__img" src={edit}alt=""/></button>
        <button className='task-block-buttons__delete task-button'><img className="task-button__img" src={deleteIcon} alt=""/></button>
        <button className='task-block-buttons__download task-button'><img className="task-button__img" src={download} alt=""/></button>
      </div>

    </div>
  )
}

export default ExpandedTask
