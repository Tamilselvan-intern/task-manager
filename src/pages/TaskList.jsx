import "../App.css";
function TaskList({ tasks, deleteTask, toggleComplete }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>
          <span
            className={`task-text ${task.completed ? "completed" : ""}`}
            onClick={() => toggleComplete(task._id)}
          >
            {task.title}
          </span>

          <button onClick={() => deleteTask(task._id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;