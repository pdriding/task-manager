// server.mjs
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT ?? 3001;

// --- MIDDLEWARE ---
app.use(cors()); // Allow CORS from any origin
app.use(express.json()); // Parse JSON bodies
app.use(express.static("public")); // Serve static files from "public/"

// --- IN‑MEMORY STORE ---
let tasks = [];

// --- ROUTES ---
// GET  /tasks        → all tasks
app.get("/tasks", async (req, res) => {
  return res.json(tasks);
});

// POST /tasks        → create new task
app.post("/tasks", async (req, res) => {
  const { title, completed = false } = req.body;
  if (!title || typeof title !== "string") {
    return res
      .status(400)
      .json({ message: 'Invalid payload: "title" is required.' });
  }

  const newTask = { id: Date.now().toString(), title, completed };
  tasks.push(newTask);
  return res.status(201).json(newTask);
});

// PUT  /tasks/:id    → update existing task
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const idx = tasks.findIndex((t) => t.id === id);

  if (idx === -1) {
    return res.status(404).json({ message: "Task not found." });
  }

  tasks[idx] = { ...tasks[idx], ...updates };
  return res.json(tasks[idx]);
});

// DELETE /tasks/:id  → delete task
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const beforeLength = tasks.length;
  tasks = tasks.filter((t) => t.id !== id);

  if (tasks.length === beforeLength) {
    return res.status(404).json({ message: "Task not found." });
  }

  return res.sendStatus(204);
});

// --- 404 & ERROR HANDLING ---
app.use((req, res) => res.status(404).json({ message: "Not found" }));
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error." });
});

// --- START SERVER ---
app.listen(PORT, () => {
  console.log(`🚀  Server listening on http://localhost:${PORT}`);
});
