const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for tasks
let tasks = [
  {
    id: uuidv4(),
    title: "Пример задачи",
    completed: false,
  },
];

// Routes

// GET /api/tasks - получить все задачи
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// POST /api/tasks - создать новую задачу
app.post("/api/tasks", (req, res) => {
  const { title, completed = false } = req.body;

  if (!title || typeof title !== "string") {
    return res
      .status(400)
      .json({ error: "Title is required and must be a string" });
  }

  const newTask = {
    id: uuidv4(),
    title: title.trim(),
    completed: Boolean(completed),
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PATCH /api/tasks/:id - обновить задачу
app.patch("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  // Обновляем только разрешенные поля
  if (updates.hasOwnProperty("title") && typeof updates.title === "string") {
    tasks[taskIndex].title = updates.title.trim();
  }

  if (updates.hasOwnProperty("completed")) {
    tasks[taskIndex].completed = Boolean(updates.completed);
  }

  res.json(tasks[taskIndex]);
});

// DELETE /api/tasks/:id - удалить задачу
app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;

  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];
  res.json(deletedTask);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api/tasks`);
});
