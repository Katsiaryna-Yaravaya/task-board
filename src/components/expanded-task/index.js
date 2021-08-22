import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'

import { TABLE_BOARD_ROUTE } from '../../constants/routs'
import Advice from '../advice'

import edit from './edit.png'
import download from './download.png'
import deleteIcon from './delete.png'
import arrow from './arrowLeft.jpg'

import './index.scss'

const ExpandedTask = () => {
  const [task, setTask] = useState(null)
  const { t } = useTranslation()
  const history = useHistory()
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

  return (
    <div>
      <div className='task'>
        <button className='arrow' onClick={() => history.push(TABLE_BOARD_ROUTE)}>
          <img className='arrow__img' src={arrow} alt='' />
        </button>

        <div className='task__title'>
          {task ? (<h2>{task.title}</h2>) : null}
        </div>

        <textarea placeholder={t('placeholder')} className='task__edit' />

        {task ? (<p className='task__description'>{task.description}</p>) : null}


        <div className='task-block-buttons'>
          <button className='task-block-buttons__change task-button'>
            <img className='task-button__img' src={edit} alt='' />
          </button>
          <button className='task-block-buttons__delete task-button'>
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
