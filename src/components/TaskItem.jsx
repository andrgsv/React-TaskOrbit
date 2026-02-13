import { useTasks } from "../context/TaskContext";
import { Link } from "react-router-dom";

// отдельный компонент для одной задачи
// PascalCase для компонента
export const TaskItem = ({ task }) => {
  const { toggleTask, deleteTask } = useTasks();

  return (
    <div className="bg-white p-4 rounded shadow flex items-center justify-between">
      {/* Checkbox для отметки выполненной задачи */}
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
        className="mr-4 w-5 h-5"
      />
      <div className={task.completed ? "line-through" : ""}>
        <h3 className="font-medium">{task.title}</h3>
        {task.description && <p className="text-sm text-gray-600">{task.description}</p>}
      </div>
      <div className="flex gap-2">
        {/* Routing: ссылка на редактирование */}
        <Link to={`/edit/${task.id}`} className="px-3 py-1 bg-yellow-500 text-white rounded">
          Edit
        </Link>
        <button
          onClick={() => deleteTask(task.id)}
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};