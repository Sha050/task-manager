import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("tasks"); // tasks | users
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setLoading(true);

    const request =
      activeTab === "tasks"
        ? api.get("/tasks")
        : api.get("/users");

    request
      .then((res) => {
        if (activeTab === "tasks") {
          setTasks(Array.isArray(res.data) ? res.data : []);
        } else {
          setUsers(Array.isArray(res.data) ? res.data : []);
        }
      })
      .finally(() => setLoading(false));
  }, [activeTab]);

  return (
    <div className="flex min-h-screen w-full bg-background-light">
      <aside className="w-64 bg-[#1a2633] border-r border-[#324d67] text-white flex flex-col">
        <div className="p-4 flex items-center gap-3 border-b border-[#324d67]">
          <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black">
            TF
          </div>
          <div>
            <h1 className="text-sm font-bold">TaskFlow</h1>
            <p className="text-xs text-[#92adc9]">Admin Console</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          <NavItem
            icon="dashboard"
            label="Tasks"
            active={activeTab === "tasks"}
            onClick={() => setActiveTab("tasks")}
          />
          <NavItem
            icon="group"
            label="Users"
            active={activeTab === "users"}
            onClick={() => setActiveTab("users")}
          />
        </nav>
      </aside>

      <main className="flex-1 px-8 py-6 overflow-y-auto">
        <div className="mb-8 flex flex-col gap-2">
          <span className="inline-block w-fit px-2 py-0.5 text-xs font-bold uppercase tracking-wider rounded bg-primary/10 text-primary">
            Admin Mode
          </span>

          <h2 className="text-4xl font-black tracking-tight">
            {activeTab === "tasks" ? "Admin Dashboard" : "User Management"}
          </h2>

          <p className="text-slate-500">
            {activeTab === "tasks"
              ? "View and manage all tasks in the system."
              : "View registered users and their roles."}
          </p>
        </div>

        <div className="mb-6 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="relative max-w-md">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                activeTab === "tasks"
                  ? "Search tasks by title, ID, or creator…"
                  : "Search users by username…"
              }
              className="w-full h-11 pl-11 pr-4 rounded-lg border border-slate-300 focus:border-primary focus:ring-1 focus:ring-primary text-sm"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined">
              search
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {activeTab === "tasks" ? (
            <TasksTable
              tasks={tasks}
              loading={loading}
              query={query}
              onEdit={(task) =>
                navigate(`/tasks/${task.id}`, { state: { task } })
              }
            />
          ) : (
            <UsersTable
              users={users}
              loading={loading}
              query={query}
              onOpen={(user) =>
                navigate(`/profile`, { state: { user } })
              }
            />
          )}
        </div>
      </main>
    </div>
  );
}

function TasksTable({ tasks, loading, query, onEdit }) {
  const filtered = tasks.filter(
    (t) =>
      t.title?.toLowerCase().includes(query.toLowerCase()) ||
      String(t.id).includes(query) ||
      t.createdBy?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <table className="w-full border-collapse">
      <thead className="bg-slate-50 border-b">
        <tr>
          <Th>ID</Th>
          <Th>Title</Th>
          <Th>Creator</Th>
          <Th>Status</Th>
          <Th>Priority</Th>
          <Th align="right">Action</Th>
        </tr>
      </thead>

      <tbody>
        {renderRows(filtered, loading, "No tasks found.", (task) => (
          <tr key={task.id} className="hover:bg-slate-50 transition">
            <Td mono>#{task.id}</Td>
            <Td>
              <div className="font-semibold">{task.title}</div>
              <div className="text-xs text-slate-500">
                {task.description || "No description"}
              </div>
            </Td>
            <Td>{task.createdBy}</Td>
            <Td><Badge>{task.status}</Badge></Td>
            <Td><Badge>{task.priority}</Badge></Td>
            <Td align="right">
              <button
                onClick={() => onEdit(task)}
                className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-primary/10"
              >
                <span className="material-symbols-outlined">edit</span>
              </button>
            </Td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function UsersTable({ users, loading, query, onOpen }) {
  const filtered = users.filter((u) =>
    u.username?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <table className="w-full border-collapse">
      <thead className="bg-slate-50 border-b">
        <tr>
          <Th>ID</Th>
          <Th>Username</Th>
          <Th>Role</Th>
          <Th align="right">Action</Th>
        </tr>
      </thead>

      <tbody>
        {renderRows(filtered, loading, "No users found.", (user) => (
          <tr key={user.id} className="hover:bg-slate-50 transition">
            <Td mono>#{user.id}</Td>
            <Td className="font-semibold">{user.username}</Td>
            <Td><Badge>{user.role}</Badge></Td>
            <Td align="right">
              <button
                onClick={() => onOpen(user)}
                className="text-primary hover:underline text-sm font-medium"
              >
                Open Profile
              </button>
            </Td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function renderRows(data, loading, emptyText, renderRow) {
  if (loading) {
    return (
      <tr>
        <td colSpan={6} className="p-8 text-center text-slate-500">
          Loading…
        </td>
      </tr>
    );
  }

  if (data.length === 0) {
    return (
      <tr>
        <td colSpan={6} className="p-8 text-center text-slate-500">
          {emptyText}
        </td>
      </tr>
    );
  }

  return data.map(renderRow);
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition ${
        active
          ? "bg-primary text-white"
          : "text-[#92adc9] hover:bg-[#233648] hover:text-white"
      }`}
    >
      <span className="material-symbols-outlined">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

function Th({ children, align }) {
  return (
    <th
      className={`px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500 ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      {children}
    </th>
  );
}

function Td({ children, align, mono }) {
  return (
    <td
      className={`px-6 py-4 text-sm ${
        align === "right" ? "text-right" : ""
      } ${mono ? "font-mono text-slate-500" : ""}`}
    >
      {children}
    </td>
  );
}

function Badge({ children }) {
  return (
    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
      {children}
    </span>
  );
}
