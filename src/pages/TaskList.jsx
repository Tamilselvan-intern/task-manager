import "../App.css";
function TaskList({ tasks, deleteTask, toggleComplete }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <span
            className={`task-text ${task.completed ? "completed" : ""}`}
            onClick={() => toggleComplete(task.id)}
          >
            {task.title}
          </span>

          <button onClick={() => deleteTask(task.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;