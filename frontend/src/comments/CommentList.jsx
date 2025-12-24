import { useEffect, useState } from "react";
import api from "../api/api";

export default function CommentList({ taskId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!taskId) return;
    fetchComments();
  }, [taskId]);

  const fetchComments = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await api.get(`/tasks/${taskId}/comments`);
      setComments(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError("Failed to load comments.");
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-sm text-slate-500">Loading comments…</p>;
  }

  if (error) {
    return <p className="text-sm text-red-500">{error}</p>;
  }

  if (comments.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        No comments yet. Be the first to comment.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {comments.map((c) => (
        <div
          key={c.id}
          className="rounded-xl border border-slate-200 dark:border-[#2d3f50] bg-white dark:bg-[#1c2834] overflow-hidden"
        >
          <div className="px-4 py-2 border-b border-slate-200 dark:border-[#2d3f50] text-sm text-slate-600 dark:text-slate-400">
            <span className="font-medium text-slate-900 dark:text-white">
              {c.author}
            </span>{" "}
            commented
          </div>

          <div className="p-4 text-sm text-slate-700 dark:text-slate-300">
            {c.content}
          </div>
        </div>
      ))}
    </div>
  );
}
