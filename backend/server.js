const express = require("express");


const cors = require("cors");

const mongoose = require("mongoose"); 



const app = express();
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

const taskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
});

const Task = mongoose.model("Task", taskSchema);

// GET all tasks 
mongoose.connect("mongodb://127.0.0.1:27017/taskmanager")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));



app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  console.log(tasks);
  res.json(tasks);
});

// ADD task
app.post("/addtasks", async (req, res) => {
  const newTask = new Task({
    title: req.body.title,
    completed: false,
  });
  
  await newTask.save();
  res.json(newTask);
});

// DELETE task
app.delete("/deletetasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});

// TOGGLE task
app.put("/tasks/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.completed = !task.completed;
  await task.save();

  res.json(task);
});
 

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});