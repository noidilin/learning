import { type Task } from "./types"

type Props = {
  tasks: Task[],
  toggleTask: ({ id }: { id: string }) => void
}

export default function List({ tasks, toggleTask }: Props) {
  return (
    <ul className="list">
      {tasks.map((task: Task) => (
        <li key={task.id}>
          <p className="task-text">{task.description}</p>
          <input
            type="checkbox"
            checked={task.isCompleted}
            onChange={() => toggleTask({ id: task.id })}
          />
        </li>
      ))}
    </ul>
  )
}
