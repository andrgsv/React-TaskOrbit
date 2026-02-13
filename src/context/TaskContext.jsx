import { createContext, useContext, useState, useEffect } from "react";

// Context API
const TaskContext = createContext();

// Имитация бэкенда (localStorage + задержка)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const STORAGE_KEY = "tasks";

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect для начальной загрузки данных
  useEffect(() => {
    const loadTasks = async () => {
      await delay(300); // имитация сетевой задержки
      const saved = localStorage.getItem(STORAGE_KEY);
      setTasks(saved ? JSON.parse(saved) : []);
      setLoading(false);
    };
    loadTasks();
  }, []);

  // Async/Await
  const saveTasks = async (newTasks) => {
    await delay(300);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
    setTasks(newTasks);
  };

  const addTask = async (task) => {
    const newTask = { id: Date.now().toString(), ...task, completed: false };
    await saveTasks([...tasks, newTask]);
  };

  const updateTask = async (updated) => {
    await saveTasks(tasks.map((t) => (t.id === updated.id ? updated : t)));
  };

  const deleteTask = async (id) => {
    await saveTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleTask = async (id) => {
    await saveTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const clearCompleted = async () => {
    await saveTasks(tasks.filter((t) => !t.completed));
    
  };  

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        addTask,
        updateTask,
        deleteTask,
        toggleTask,
        clearCompleted,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);


