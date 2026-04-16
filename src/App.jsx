import { useEffect, useState } from "react";
import TaskForm from "./pages/TaskForm";
import TaskList from "./pages/TaskList";
import { fetchTasks } from "./services/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading,setLoading] = useState(true)
  const [error,setError]= useState("")
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        const data = await fetchTasks();

        const formatted = data.map((item) => ({
          id: item.id,
          title: item.title,
          completed: item.completed,
        }));

        setTasks(formatted); 

      } catch (err) { 
        
        setError("Something went wrong"); 

      } finally {
        setLoading(false);
      } 
    };

    loadTasks();
  }, []);


  const addTask = (task) => {
    setTasks([...tasks, { id: Date.now(), title: task, completed: false }]);
  };

  const deleteTask = (id) => {
    let newdata = tasks.filter((element,i)=> id !== element.id)
    setTasks(newdata)
  }

  const toggleComplete = (id) =>{
    let newdata = tasks.map((element)=> element.id === id ? {...element, completed:!element.completed} : element  )
    setTasks(newdata)
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