function TaskList({ tasks , deleteTask, toggleComplete }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>

        <span 
            onClick={()=>{
                toggleComplete(task.id)
            }}
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            {task.title}
          </span>


          <button onClick={()=>{
            deleteTask(task.id)
          }}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;