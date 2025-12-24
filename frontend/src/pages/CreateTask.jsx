import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function CreateTask() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "LOW",
    dueDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
  e.preventDefault();
  setError("");

  console.log("🟡 SUBMIT CLICKED");

  const token = localStorage.getItem("token");
  console.log("🟡 TOKEN FROM LOCALSTORAGE:", token);

  if (!token) {
    setError("No auth token found. Please login again.");
    return;
  }

  if (!form.title.trim()) {
    setError("Title is required");
    return;
  }

  const payload = {
    title: form.title,
    description: form.description,
    priority: form.priority,
  };

  if (form.dueDate) {
    payload.dueDate = form.dueDate;
  }


  try {
    setLoading(true);
    await api.post("/tasks", payload);
    navigate("/dashboard");
  } catch (err) {
    setError(
      err.response?.data?.message ||
        "Failed to create task. Please try again."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-xl bg-white dark:bg-[#111a22] border border-slate-200 dark:border-[#233648] shadow-lg p-6">
        <h1 className="text-2xl font-black mb-1">Create New Task</h1>
        <p className="text-slate-500 dark:text-[#92adc9] mb-6">
          Add a new task to your workspace
        </p>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium mb-1">
              Title
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Task title"
              className="w-full h-11 rounded-lg border border-slate-300 px-4 bg-white dark:bg-[#192633]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the task..."
              rows={4}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 bg-white dark:bg-[#192633]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Priority
            </label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full h-11 rounded-lg border border-slate-300 px-4 bg-white dark:bg-[#192633]"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Due Date (optional)
            </label>
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              className="w-full h-11 rounded-lg border border-slate-300 px-4 bg-white dark:bg-[#192633]"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 rounded-lg text-sm border border-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-lg bg-primary text-white text-sm font-bold hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
