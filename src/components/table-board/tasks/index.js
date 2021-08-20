import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { EXPANDED_TASK_ROUTE } from '../../../constants/routs'
import { saveIdTask } from '../../../redux/users/actions'

import './index.scss'

const Tasks = ({ onDragOver, onDragLeave, onDragStart, onDragEnd, onDrop, task }) => {

  const history = useHistory()
  const dispatch = useDispatch()

  const clickHandler =()=> {
    dispatch(saveIdTask(task.id))
    history.push(EXPANDED_TASK_ROUTE)
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
         title={task.title}
    >
      {task.title}
    </div>
  )
}

Tasks.propTypes ={
  onDragOver: PropTypes.func,
  onDragLeave: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDrop: PropTypes.func,
  task: PropTypes.object
}

export default Tasks
