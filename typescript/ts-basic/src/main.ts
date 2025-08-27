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
  // create: list
  const taskElement = document.createElement('li');
  taskElement.textContent = task.description;
  // create: checkbox
  const taskCheckbox = document.createElement('input');
  taskCheckbox.type = 'checkbox';
  taskCheckbox.checked = task.isCompleted;
  taskCheckbox.addEventListener('change', () => {
    task.isCompleted = !task.isCompleted;
    updateStorage();
  });
  // render
  taskElement.appendChild(taskCheckbox);
  taskListElement?.appendChild(taskElement);
}

const taskForm = document.querySelector<HTMLFormElement>('.form');
const formInput = document.querySelector<HTMLInputElement>('.form-input');
const taskListElement = document.querySelector<HTMLUListElement>('.list');

taskForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const taskDescription = formInput?.value;
  // receive input
  if (taskDescription) {
    const task: Task = {
      description: taskDescription,
      isCompleted: false,
    };
    // add, render and store task
    addTask(task);
    renderTask(task);
    updateStorage();
    // reset input
    formInput.value = '';
    return;
  }
  alert('Please enter a task description');
});

tasks.forEach(renderTask);
