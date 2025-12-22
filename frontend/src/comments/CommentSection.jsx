import { useEffect, useState } from "react";
import api from "../api/axios";

export default function CommentSection({ taskId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");

  const load = async () => {
    const res = await api.get(`/tasks/${taskId}/comments`);
    setComments(res.data);
  };

  useEffect(() => {
    load();
  }, [taskId]);

  const add = async () => {
    try {
      await api.post(`/tasks/${taskId}/comments`, { content });
      setContent("");
      load();
    } catch (err) {
      alert("You must be assigned to comment.");
    }
  };

  return (
    <section className="bg-white p-6 rounded shadow mt-6">
      <h3 className="font-semibold mb-4">Discussion</h3>

      {comments.map(c => (
        <div key={c.id} className="border-b py-2">
          <p>{c.content}</p>
          <span className="text-xs text-gray-500">— {c.author}</span>
        </div>
      ))}

      <div className="flex gap-2 mt-4">
        <input
          className="flex-1 border p-2 rounded"
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="Add a comment..."
        />
        <button onClick={add} className="bg-indigo-600 text-white px-4 rounded">
          Send
        </button>
      </div>
    </section>
  );
}
