import { BrowserRouter, Routes, Route, Link, useLocation, Outlet } from "react-router-dom";
import { TaskProvider, useTasks } from "./context/TaskContext";
import { TaskList } from "./components/TaskList";
import { TaskForm } from "./components/TaskForm";

const Header = () => (
  <header className="bg-blue-600 text-white p-6 text-center">
    <h1 className="text-3xl font-bold">TaskOrbit</h1>
  </header>
);

const Nav = () => {
  const location = useLocation();
  const getLinkClass = (path) => {
    const isActive = location.pathname === path || location.pathname.startsWith(path);
    return isActive ? "font-bold underline" : "";
  };

  return (
    <nav className="bg-blue-500 text-white py-4 flex justify-center gap-10 text-lg">
      <Link to="/" className={getLinkClass("/")}>Все</Link>
      <Link to="/active" className={getLinkClass("/active")}>Активные</Link>
      <Link to="/completed" className={getLinkClass("/completed")}>Выполненные</Link>
    </nav>
  );
};

const Layout = () => (
  <>
    <Header />
    <Nav />
    <Outlet />
  </>
);

const MainPage = () => {
  const { tasks, loading, clearCompleted } = useTasks();
  const location = useLocation();

  if (loading) return <p className="text-center mt-20 text-xl">Загрузка...</p>;

  const filtered = location.pathname.startsWith("/active")
    ? tasks.filter(t => !t.completed)
    : location.pathname.startsWith("/completed")
    ? tasks.filter(t => t.completed)
    : tasks;

  const hasCompleted = tasks.some(t => t.completed);

  return (
    <div className="p-6 max-w-4xl mx-auto min-h-screen bg-gray-100">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold">
          {location.pathname.startsWith("/active") ? "Активные" : location.pathname.startsWith("/completed") ? "Выполненные" : "Все"} задачи ({filtered.length})
        </h2>
        <Link to="/new" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">
          + Новая задача
        </Link>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-20">Нет задач</p>
      ) : (
        <TaskList tasks={filtered} />
      )}

      {location.pathname.startsWith("/completed") && hasCompleted && (
        <div className="text-center mt-10">
          <button onClick={clearCompleted} className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Очистить выполненные
          </button>
        </div>
      )}
    </div>
  );
};

const App = () => (
  <TaskProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/active" element={<MainPage />} />
          <Route path="/completed" element={<MainPage />} />
          <Route path="/new" element={<TaskForm />} />
          <Route path="/edit/:id" element={<TaskForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </TaskProvider>
);

export default App;





