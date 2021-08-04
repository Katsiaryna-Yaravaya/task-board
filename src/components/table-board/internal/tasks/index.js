import { dragEndHandler, dragLeaveHandler, dragOverHandler, dragStartHandler, dropHandler } from '../utils'

const Tasks = () => {


  return (
    <div
      onDragOver={(e) => dragOverHandler(e)}
      onDragLeave={(e) => dragLeaveHandler(e)}
      onDragStart={(e) => dragStartHandler(e, board, item)}
      onDragEnd={(e) => dragEndHandler(e)}
      onDrop={(e) => dropHandler(e, board, item)}
      draggable={true}
      className='item'
    >
      {item.title}
    </div>
  )
}

export default Tasks
