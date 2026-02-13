import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

// отдельный компонент для формы добавления/редактирования
export const TaskForm = () => {
  const { tasks, addTask, updateTask } = useTasks();
  const { id } = useParams();
  const navigate = useNavigate();

  const task = tasks.find((t) => t.id === id);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // заполнение формы при редактировании
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
    }
  }, [task]);

  // Async/Await при сохранении
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (task) {
      await updateTask({ ...task, title: title.trim(), description: description.trim() });
    } else {
      await addTask({ title: title.trim(), description: description.trim() });
    }
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Заголовок"
        required
        className="w-full p-3 border rounded"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Описание"
        rows="4"
        className="w-full p-3 border rounded"
      />
      <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded">
        {task ? "Сохранить" : "Добавить"}
      </button>
    </form>
  );
};