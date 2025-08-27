import type { Task } from "./types";

const tasks: Task[] = loadTasks();

function loadTasks(): Task[] {
  const storedTasks = localStorage.getItem('tasks');
  return storedTasks ? JSON.parse(storedTasks) : [];
}

function updateStorage(): void {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(task: Task): void {
  tasks.push(task);
}

function renderTask(task: Task): void {
}

tasks.forEach(renderTask);
