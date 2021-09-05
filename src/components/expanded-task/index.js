import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { useTheme } from '../../context/theme/theme-state'

import { Advice, TaskButton } from '../index'

import { TABLE_BOARD_ROUTE } from '../../constants/routs'
import { KEY_DOWN_ENTER } from '../../constants/general'

import { deleteTask, savedTask } from '../../redux/users/actions'

import { arrow } from '../../assets'

import './index.scss'

const ExpandedTask = () => {
  const [task, setTask] = useState(null)
  const [value, setValue] = useState('')
  const { t } = useTranslation()
  const { theme } = useTheme()
  const history = useHistory()
  const dispatch = useDispatch()
  const { taskId } = useSelector(state => state.data)
  const { boards } = useSelector(state => state.data.user)

  useEffect(() => {
    getInformationTask()
  })

  const getInformationTask = () => {
    boards.map(b => {
      b.tasks.map(t => {
        if (t.id === taskId) setTask(t)
      })
    })
  }

  const removeTask = taskId => {
    dispatch(deleteTask(taskId))
    history.push(TABLE_BOARD_ROUTE)
  }

  const saveTask = taskId => dispatch(savedTask({ taskId, value }))

  const changeHandler = ({ target }) => setValue(target.value)

  const handleKeyDown = ({ key }) =>
    key === KEY_DOWN_ENTER && (task.description = value)

  return task ? (
    <div style={theme} className="app aside">
      <button className="arrow" onClick={() => history.push(TABLE_BOARD_ROUTE)}>
        <img className="arrow__img" src={arrow} alt="" />
      </button>

      <div className="task">
        <div className="task__title">
          <h2 title={task.title}>{task.title}</h2>
        </div>
        <textarea
          value={value}
          onChange={changeHandler}
          onKeyDown={handleKeyDown}
          placeholder={t('placeholder')}
          className="task__edit"
        />
        <p className="task__description">{task.description}</p>

        <TaskButton removeTask={removeTask} saveTask={saveTask} id={task.id} />
      </div>
      <div>
        <Advice />
      </div>
    </div>
  ) : null
}

export default ExpandedTask
