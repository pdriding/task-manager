import express from "express";
import cors from "cors";
import path from "path";
import { getTasks, addTask, updateTask, deleteTask } from "./taskManager.js";

const app = express();
const PORT = process.env.PORT ?? 3001;

// Serve static files from the project root (where index.html is)
app.use(express.static(path.resolve("..")));

// Middleware
app.use(cors());
app.use(express.json());

// --- ROUTES ---

app.get("/tasks", async (req, res) => {
  try {
    const team = req.query.team;
    const tasks = await getTasks(team);
    res.json(tasks);
  } catch (err) {
    console.error("Failed to load tasks:", err);
    res.status(500).json({ message: "Could not load tasks." });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const newTask = await addTask(req.body);

    res.status(201).json(newTask);
  } catch (err) {
    if (err.message === "Missing data") {
      res.status(400).json({ message: "Missing data." });
    } else {
      console.error("Failed to add task:", err);
      res.status(500).json({ message: "Could not add task." });
    }
  }
});

app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updatedTask = await updateTask(id, updates);
    console.log(updatedTask);
    res.json(updatedTask);
  } catch (err) {
    if (err.message === "Task not found") {
      res.status(404).json({ message: "Task not found." });
    } else {
      console.error("Failed to update task:", err);
      res.status(500).json({ message: "Could not update task." });
    }
  }
});

app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await deleteTask(id);
    res.sendStatus(204);
  } catch (err) {
    if (err.message === "Task not found") {
      res.status(404).json({ message: "Task not found." });
    } else {
      console.error("Failed to delete task:", err);
      res.status(500).json({ message: "Could not delete task." });
    }
  }
});

// Catch-all route to serve index.html for SPA
app.get("*", (req, res) => {
  res.sendFile(path.resolve("..", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
