import { useState } from "react";
import api from "../api/api";

export default function CommentEditor({ taskId, onCommentAdded }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    if (!content.trim()) return;

    setLoading(true);
    setError("");

    try {
      await api.post(`/tasks/${taskId}/comments`, { content });
      setContent("");
      onCommentAdded(); 
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to add comment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 dark:border-[#2d3f50] bg-white dark:bg-[#1c2834] overflow-hidden">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Leave a comment…"
        className="w-full bg-transparent border-none focus:ring-0 p-4 min-h-[120px] text-sm text-slate-900 dark:text-white placeholder:text-slate-400"
      />

      {error && (
        <p className="px-4 text-sm text-red-500">{error}</p>
      )}

      <div className="flex justify-between items-center px-4 py-3 border-t border-slate-200 dark:border-[#2d3f50]">
        <span className="text-xs text-slate-400">
          Markdown supported
        </span>

        <button
          onClick={submit}
          disabled={loading}
          className="bg-primary hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
        >
          {loading ? "Posting…" : "Comment"}
        </button>
      </div>
    </div>
  );
}
