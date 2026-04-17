import { useEffect, useState } from "react";
import TaskForm from "./pages/TaskForm";
import TaskList from "./pages/TaskList";
import { addTaskAPI, deleteTaskAPI, fetchTasks, toggleTaskAPI } from "./services/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading,setLoading] = useState(true)
  const [error,setError]= useState("")

const loadTasks = async () => {
  try {
    setLoading(true);
    const data = await fetchTasks();
    setTasks(data); 
  } catch (err) {
    setError("Something went wrong");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  loadTasks();
}, []);


  const addTask = async (task) => {
    await addTaskAPI(task)
     loadTasks();
  }; 


  const deleteTask = async (id) => {
    await deleteTaskAPI(id)
  loadTasks();
  }

  const toggleComplete = async (id) =>{
      await toggleTaskAPI(id) 
       loadTasks();
  }
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;



  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Manager</h1>
      <TaskForm addTask={addTask} /> 
      <TaskList tasks={tasks} deleteTask={deleteTask} toggleComplete={toggleComplete} />
    </div>
  );
}

export default App;