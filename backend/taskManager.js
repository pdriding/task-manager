import fs from "fs/promises";
import path from "path";

const TASKS_FILE = path.resolve("data", "tasks.json");

let tasks = [];

async function loadTasks() {
  try {
    const data = await fs.readFile(TASKS_FILE, "utf-8");
    tasks = JSON.parse(data);
  } catch (err) {
    if (err.code === "ENOENT") {
      tasks = [];
    } else {
      throw err;
    }
  }
}

async function saveTasks() {
  try {
    await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2));
  } catch (err) {
    throw err;
  }
}

async function getTasks(team) {
  await loadTasks();
  if (team) {
    return tasks.filter((t) => t.team === team);
  }
  return tasks;
}

async function addTask(taskData) {
  await loadTasks();
  const { team, title, description, priority } = taskData;
  if (!team || !title || !description || !priority) {
    throw new Error("Missing data");
  }
  const newTask = {
    id: Date.now().toString(),
    team,
    title,
    description,
    priority,
  };
  tasks.push(newTask);
  await saveTasks();
  return newTask;
}

async function updateTask(id, updates) {
  await loadTasks();
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) {
    throw new Error("Task not found");
  }
  tasks[idx] = { ...tasks[idx], ...updates };
  await saveTasks();
  return tasks[idx];
}

async function deleteTask(id) {
  await loadTasks();
  const beforeLength = tasks.length;
  tasks = tasks.filter((t) => t.id !== id);
  if (tasks.length === beforeLength) {
    throw new Error("Task not found");
  }
  await saveTasks();
}

export { getTasks, addTask, updateTask, deleteTask };
