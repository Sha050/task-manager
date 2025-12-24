import { useEffect, useState } from "react";
import api from "../api/api";

export default function AssigneesPanel({ taskId }) {
  const [users, setUsers] = useState([]);
  const [assignees, setAssignees] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const [usersRes, assigneesRes] = await Promise.all([
        api.get("/users"),
        api.get(`/tasks/${taskId}/assignees`)
      ]);

      setUsers(Array.isArray(usersRes.data) ? usersRes.data : []);
      setAssignees(Array.isArray(assigneesRes.data) ? assigneesRes.data : []);
    } catch (err) {
      console.error("FETCH DATA ERROR:", err);
      setError("Failed to load assignees");
    }
  };

  useEffect(() => {
    fetchData();
  }, [taskId]);

  const token = localStorage.getItem("token");
  const myUsername = token
    ? JSON.parse(atob(token.split(".")[1])).username
    : null;

  const assignedUserIds = new Set(assignees.map(a => a.userId));
  const availableUsers = users.filter(u => !assignedUserIds.has(u.id));

  const assignUser = async () => {
    if (!selectedUserId) return;

    setError("");
    setLoading(true);

    try {
      await api.post(`/tasks/${taskId}/assign/${selectedUserId}`);
      await fetchData();
      setSelectedUserId("");
    } catch (err) {
      console.error("ASSIGN USER ERROR:", err);
      setError("Failed to assign user");
    } finally {
      setLoading(false);
    }
  };

  const assignMe = async () => {
    setError("");
    setLoading(true);

    try {
      await api.post(`/tasks/${taskId}/assign/me`);
      await fetchData();
    } catch (err) {
      console.error("ASSIGN ME ERROR:", err);
      setError("Failed to assign yourself");
    } finally {
      setLoading(false);
    }
  };

  const updateMyStatus = async (status) => {
    setError("");
    setLoading(true);

    try {
      await api.patch(
        `/tasks/${taskId}/status`,
        null,
        { params: { status } }
      );
      await fetchData(); 
    } catch (err) {
      console.error("STATUS UPDATE ERROR:", err);
      setError("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 dark:border-[#2d3f50] bg-white dark:bg-[#1c2834] p-5">
      <h4 className="text-xs font-bold uppercase text-slate-500 mb-3">
        Assignees
      </h4>

      {assignees.length === 0 ? (
        <p className="text-sm text-slate-500 mb-3">
          No one assigned yet
        </p>
      ) : (
        <div className="flex flex-col gap-2 mb-3">
          {assignees.map(a => {
            const isMe = a.username === myUsername;

            return (
              <div
                key={a.userId}
                className="flex items-center gap-2 px-2 py-1 rounded bg-slate-100 dark:bg-[#233648] text-sm"
              >
                <span>{a.username}</span>

                {isMe && (
                  <select
                    value={a.status}
                    onChange={(e) => updateMyStatus(e.target.value)}
                    disabled={loading}
                    className="ml-auto border rounded px-2 py-0.5 text-xs dark:bg-[#1c2834]"
                  >
                    <option value="TODO">TODO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                )}
              </div>
            );
          })}
        </div>
      )}

      <button
        type="button"
        onClick={assignMe}
        disabled={loading}
        className="mb-3 w-full px-3 py-1 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 disabled:opacity-50"
      >
        {loading ? "Assigning..." : "Assign Me"}
      </button>

      {availableUsers.length > 0 && (
        <>
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
            className="w-full border rounded px-2 py-1 text-sm mb-2 dark:bg-[#233648]"
          >
            <option value="">Select user</option>
            {availableUsers.map(u => (
              <option key={u.id} value={u.id}>
                {u.username}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={assignUser}
            disabled={!selectedUserId || loading}
            className="w-full px-3 py-1 rounded-lg bg-primary text-white text-sm font-medium hover:bg-blue-600 disabled:opacity-50"
          >
            Assign User
          </button>
        </>
      )}

      {error && (
        <p className="text-sm text-red-600 mt-3">
          {error}
        </p>
      )}
    </div>
  );
}
