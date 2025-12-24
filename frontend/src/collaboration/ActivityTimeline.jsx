import { useEffect, useState } from "react";
import api from "../api/api";

export default function ActivityTimeline({ taskId }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!taskId) return;
    fetchActivity();
  }, [taskId]);

  const fetchActivity = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/tasks/${taskId}/activity`);
      setEvents(Array.isArray(res.data) ? res.data : []);
    } catch {
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <p className="text-sm text-slate-500">
        Loading activity…
      </p>
    );
  }

  if (events.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        No activity yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {events.map((e, index) => (
        <div key={index} className="flex gap-3 items-start">
          <div className="mt-1 size-2 rounded-full bg-primary"></div>

          <div className="text-sm text-slate-600 dark:text-slate-300">
            <span className="font-medium text-slate-900 dark:text-white">
              {e.actor}
            </span>{" "}
            {renderAction(e.action)}
            <div className="text-xs text-slate-400">
              {new Date(e.timestamp).toLocaleString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function renderAction(action) {
  switch (action) {
    case "TASK_CREATED":
      return "created this task";
    case "USER_ASSIGNED":
      return "assigned a user";
    case "COMMENT_ADDED":
      return "added a comment";
    case "STATUS_CHANGED":
      return "changed the status";
    default:
      return action;
  }
}
