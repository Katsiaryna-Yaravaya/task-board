import { EXPANDED_TASK_ROUTE } from '../../../constants/routs'

import './index.scss'

const Tasks = ({ onDragOver, onDragLeave, onDragStart, onDragEnd, onDrop, task }) => {

  const clickHandler =()=> {
    if (task) history.push(EXPANDED_TASK_ROUTE)
  }

  return (
    <div onDragOver={onDragOver}
         onDragLeave={onDragLeave}
         onDragStart={onDragStart}
         onDragEnd={onDragEnd}
         onDrop={onDrop}
         draggable={true}
         onClick={clickHandler}
         className='item'
    >
      {task}
    </div>
  )
}

export default Tasks
