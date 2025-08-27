import { useEffect, useState } from "react"
import { type Task } from "./component/types"
import Form from "./component/Form"

function loadTasks(): Task[] {
  const storedTasks = localStorage.getItem('tasks')
  return storedTasks ? JSON.parse(storedTasks) : []
}

function updateStorage(tasks: Task[]) {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks());

  const addTask = (task: Task) => setTasks([...tasks, task])

  useEffect(() => {
    updateStorage(tasks)
  }, [tasks])

  return (
    <section>
      <Form addTask={addTask} />
    </section>
  )
}
