import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { TABLE_BOARD_ROUTE } from '../../constants/routs'
import { deleteTask, savedTask } from '../../redux/users/actions'
import Advice from '../advice'
import ThemeBackground from '../theme-background'
import { useTheme } from '../../context/theme/theme-state'

import save from './save.png'
import download from './download.png'
import deleteIcon from './delete.png'
import arrow from './arrowLeft.jpg'

import './index.scss'

const ExpandedTask = () => {
  const [task, setTask] = useState(null)
  const [value, setValue] = useState('')
  const { t } = useTranslation()
  const theme = useTheme()
  const history = useHistory()
  const dispatch = useDispatch()
  const taskId = useSelector(state => state.data.taskId)
  const boards = useSelector(state => state.data.user.boards)

  useEffect(() => {
    getInformationTask()
  })

  const getInformationTask = () => {
    boards.forEach((board) => {
      board.tasks.forEach((task) => {
        if (task.id === taskId) setTask(task)
      })
    })
  }

  const removeTask = (taskId) => {
    dispatch(deleteTask(taskId))
    history.push(TABLE_BOARD_ROUTE)
  }

  const saveTask = (taskId) => {
    dispatch(savedTask({ taskId, value }))
  }

  const changeHandler = (e) => {
    return setValue(e.target.value)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      return task.description = value
    }
  }

  return (
    <div style={theme.theme} className='app'>
      <ThemeBackground />
      <div className='task'>
        <button className='arrow' onClick={() => history.push(TABLE_BOARD_ROUTE)}>
          <img className='arrow__img' src={arrow} alt='' />
        </button>

        <div className='task__title'>
          {task ? (<h2>{task.title}</h2>) : null}
        </div>

        <textarea
          value={value}
          onChange={changeHandler}
          onKeyDown={handleKeyDown}
          placeholder={t('placeholder')}
          className='task__edit'
        />

        {task ? (<p className='task__description'>{task.description}</p>) : null}

        <div className='task-block-buttons' onClick={() => saveTask(task.id)}>
          <button className='task-block-buttons__save task-button'>
            <img className='task-button__img' src={save} alt='' />
          </button>
          <button className='task-block-buttons__delete task-button' onClick={() => removeTask(task.id)}>
            <img className='task-button__img' src={deleteIcon} alt='' />
          </button>
          <button className='task-block-buttons__download task-button'>
            <img className='task-button__img' src={download} alt='' />
          </button>
        </div>
      </div>
      <div>
        <Advice />
      </div>
    </div>
  )
}

export default ExpandedTask
