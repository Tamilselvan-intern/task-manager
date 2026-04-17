require("dotenv").config();
const express = require("express");


const cors = require("cors");

const mongoose = require("mongoose"); 



const app = express();
// app.use(cors());
app.use(
  cors({
    origin: [
       "http://localhost:5173",
      "https://task-manager-rosy-zeta.vercel.app"
    ],
  })
);

app.use(express.json());

const taskSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
});

const Task = mongoose.model("Task", taskSchema);

// GET all tasks 
// mongoose.connect("mongodb+srv://tamilguru2:tamil123@cluster0.yxzh3.mongodb.net/taskmanager?retryWrites=true&w=majority")
mongoose.connect(process.env.MONGO_URI)  
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
 

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});