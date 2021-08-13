const Tasks = ({ onDragOver, onDragLeave, onDragStart, onDragEnd, onDrop, task }) => {

  return (
    <div onDragOver={onDragOver}
         onDragLeave={onDragLeave}
         onDragStart={onDragStart}
         onDragEnd={onDragEnd}
         onDrop={onDrop}
         draggable={true}
         className='item'
    >
      {task}
    </div>
  )
}

export default Tasks
