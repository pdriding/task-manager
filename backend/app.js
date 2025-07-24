import express from "express";
import cors from "cors";
import fs from "fs/promises"; // promise-based fs
import path from "path";

const app = express();
const PORT = process.env.PORT ?? 3001;
// File path for tasks.json (in the same directory as server.mjs)
const TASKS_FILE = path.resolve("data", "tasks.json");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// --- Load tasks from file at startup ---
let tasks = [];

async function loadTasks() {
  try {
    const data = await fs.readFile(TASKS_FILE, "utf-8");
    tasks = JSON.parse(data);
  } catch (err) {
    if (err.code === "ENOENT") {
      // File does not exist, start with empty array
      tasks = [];
    } else {
      console.error("Failed to load tasks:", err);
    }
  }
}

// --- Save tasks to file ---
async function saveTasks() {
  try {
    await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2));
  } catch (err) {
    console.error("Failed to save tasks:", err);
  }
}

// Load tasks when server starts
await loadTasks();

// --- ROUTES ---

app.get("/tasks", async (req, res) => {
  try {
    const data = await fs.readFile(TASKS_FILE, "utf-8");
    const fileTasks = JSON.parse(data);
    res.json(fileTasks);
  } catch (err) {
    console.error("Failed to read tasks file:", err);
    res.status(500).json({ message: "Could not load tasks." });
  }
});

app.post("/tasks", async (req, res) => {
  const taskData = req.body;

  if (taskData === null) {
    return res.status(400).json({ message: "Missing data." });
  }

  const newTask = { id: Date.now().toString(), ...taskData };
  tasks.push(newTask);

  await saveTasks();

  return res.status(201).json(newTask);
});

app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  console.log(updates);
  const idx = tasks.findIndex((t) => t.id === id);

  if (idx === -1) {
    return res.status(404).json({ message: "Task not found." });
  }
  // TODO
  tasks[idx] = { ...tasks[idx], ...updates };
  console.log(tasks);
  await saveTasks();

  return res.json(tasks[idx]);
});

app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const beforeLength = tasks.length;
  tasks = tasks.filter((t) => t.id !== id);

  if (tasks.length === beforeLength) {
    return res.status(404).json({ message: "Task not found." });
  }

  await saveTasks();

  return res.sendStatus(204);
});

// 404 and error handling omitted for brevity

app.listen(PORT, () => {
  console.log(`🚀  Server listening on http://localhost:${PORT}`);
});
