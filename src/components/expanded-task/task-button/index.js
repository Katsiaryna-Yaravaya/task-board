import { deleteIcon, download, save } from '../../../assets'

import './index.scss'

const TaskButton = ({ removeTask, saveTask, id }) => (
  <div className="task-block-buttons" onClick={() => saveTask(id)}>
    <button className="task-block-buttons__save task-button">
      <img className="task-button__img" src={save} alt="" />
    </button>
    <button
      className="task-block-buttons__delete task-button"
      onClick={() => removeTask(id)}
    >
      <img className="task-button__img" src={deleteIcon} alt="" />
    </button>
    <button className="task-block-buttons__download task-button">
      <img className="task-button__img" src={download} alt="" />
    </button>
    <p className="task-block-buttons__text">coming soon...</p>
  </div>
)

export default TaskButton
