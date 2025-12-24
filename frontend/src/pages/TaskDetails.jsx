import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";

import ActivityTimeline from "../collaboration/ActivityTimeline";
import CommentList from "../comments/CommentList";
import CommentEditor from "../comments/CommentEditor";
import AssigneesPanel from "../collaboration/AssigneesPanel";
import { useAuth } from "../auth/AuthContext";

export default function TaskDetails() {
  const { id } = useParams();
  const { state } = useLocation();
  const { user } = useAuth();

  const isAdmin = user?.role === "ADMIN";

  const [task, setTask] = useState(state?.task || null);
  const [loading, setLoading] = useState(!state?.task);
  const [error, setError] = useState("");

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({
    title: "",
    description: "",
  });

  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (task) {
      setDraft({
        title: task.title,
        description: task.description || "",
      });
      return;
    }

    const fetchTask = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/tasks/${id}`);
        setTask(res.data);
      } catch {
        setError("Task not found or access denied.");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, task]);
  const saveChanges = async () => {
    try {
      const payload = {};

      if (draft.title !== task.title) {
        payload.title = draft.title.trim();
      }

      if (draft.description !== (task.description || "")) {
        payload.description = draft.description.trim();
      }

      if (Object.keys(payload).length === 0) {
        setEditing(false);
        return;
      }

      const res = await api.patch(`/tasks/${task.id}`, payload);

      setTask(res.data);
      setEditing(false);
    } catch (err) {
      console.error("UPDATE FAILED:", err.response || err);
      alert(
        err.response?.status === 403
          ? "You are not allowed to update this task."
          : "Failed to update task."
      );
    }
  };

  if (loading) {
    return (
      <p className="p-10 text-center text-slate-500">
        Loading task…
      </p>
    );
  }

  if (error || !task) {
    return (
      <p className="p-10 text-center text-red-600">
        {error}
      </p>
    );
  }

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="border-b pb-6">
              {editing ? (
                <input
                  value={draft.title}
                  onChange={(e) =>
                    setDraft({ ...draft, title: e.target.value })
                  }
                  className="w-full text-3xl font-bold border rounded px-3 py-2"
                />
              ) : (
                <h1 className="text-3xl font-bold">
                  {task.title}
                  <span className="ml-2 text-slate-400 font-normal">
                    #{task.id}
                  </span>
                </h1>
              )}

              <div className="mt-3 flex gap-3 text-sm text-slate-500">
                <span className="px-2 py-1 rounded bg-primary/20 text-primary">
                  {task.status}
                </span>
                <span>Priority: {task.priority}</span>
              </div>

              {(isAdmin || user?.id === task.createdById) && (
                <div className="mt-4 flex gap-3">
                  {editing ? (
                    <>
                      <button
                        onClick={saveChanges}
                        className="px-4 py-2 bg-primary text-white rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditing(false)}
                        className="px-4 py-2 border rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setEditing(true)}
                      className="px-4 py-2 border rounded"
                    >
                      Edit Task
                    </button>
                  )}
                </div>
              )}
            </div>
            <div>
              {editing ? (
                <textarea
                  rows={4}
                  value={draft.description}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      description: e.target.value,
                    })
                  }
                  className="w-full border rounded px-3 py-2"
                />
              ) : (
                <p>
                  {task.description || "No description provided."}
                </p>
              )}
            </div>

            <section className="mt-8 flex flex-col gap-6">
              <h3 className="text-lg font-bold border-b pb-2">
                Discussion
              </h3>

              <ActivityTimeline
                key={refreshKey}
                taskId={task.id}
              />

              <CommentList
                key={refreshKey}
                taskId={task.id}
              />

              <CommentEditor
                taskId={task.id}
                onCommentAdded={() =>
                  setRefreshKey((k) => k + 1)
                }
              />
            </section>
          </div>

          <aside className="lg:col-span-4 flex flex-col gap-6">
            <AssigneesPanel taskId={task.id} />

            <div className="rounded-xl border p-5">
              <h4 className="text-xs font-bold uppercase mb-2">
                Properties
              </h4>

              <div className="text-sm space-y-1">
                <div>Status: {task.status}</div>
                <div>Priority: {task.priority}</div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
