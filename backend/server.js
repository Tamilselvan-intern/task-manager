const express = require("express");
console.log(express)
const cors = require("cors");

const app = express();
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

let tasks = [
  { id: 1, title: "Learn React", completed: false },
  { id: 2, title: "Build App", completed: true },
];

// GET all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// ADD task
app.post("/tasks", (req, res) => {
  const newTask = {
    id: Date.now(),
    title: req.body.title,
    completed: false,
  };
  tasks.push(newTask);
  res.json(newTask);
});

// DELETE task
app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  tasks = tasks.filter((task) => task.id !== id);
  res.json({ message: "Deleted" });
});

// TOGGLE task
app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  res.json({ message: "Updated" });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});