import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../auth/AuthContext";
import TaskCard from "../components/TaskCard";
import EmptyState from "../components/EmptyState";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const endpoint =
        user?.role === "ADMIN" ? "/tasks" : "/tasks/visible";

      const res = await api.get(endpoint);
      setTasks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark">
      <aside className="hidden lg:flex w-64 flex-col border-r border-slate-200 dark:border-[#233648] bg-white dark:bg-[#111a22] p-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 cursor-pointer">
            <span className="material-symbols-outlined text-primary">
              check_circle
            </span>
            <p className="text-primary text-sm font-medium">My Tasks</p>
          </div>

          {["Inbox", "Projects", "Team", "Reports"].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1e2b3a] cursor-pointer"
            >
              <span className="material-symbols-outlined text-slate-500">
                folder
              </span>
              <p className="text-sm">{item}</p>
            </div>
          ))}
        </div>
      </aside>

      <main className="relative z-10 flex-1 overflow-y-auto">
        <header className="flex items-center justify-between border-b border-slate-200 dark:border-[#233648] bg-white dark:bg-[#111a22] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="text-primary">
              <span className="material-symbols-outlined">
                task_alt
              </span>
            </div>
            <h2 className="font-bold text-lg">WorkManager</h2>
          </div>
        </header>

        <div className="max-w-[1200px] mx-auto p-6 flex flex-col gap-6">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-3xl font-black">My Tasks</h1>
              <p className="text-slate-500 dark:text-[#92adc9]">
                Overview of your pending work and deadlines
              </p>
            </div>

            <button
              onClick={() => {
                navigate("/tasks/new");
              }}
              className="relative z-20 flex items-center gap-2 rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-blue-600 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">
                add
              </span>
              New Task
            </button>
          </div>

          {loading ? (
            <p className="text-slate-500">Loading tasks…</p>
          ) : tasks.length === 0 ? (
            <EmptyState
              title="You're all caught up!"
              description="No tasks assigned to you at the moment."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {tasks
                .filter(Boolean)
                .map((task, index) => (
                  <TaskCard key={task.id ?? index} task={task} />
                ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
