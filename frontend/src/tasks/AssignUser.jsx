import { useState } from "react";
import api from "../api/axios";

export default function AssignUser({ taskId }) {
  const [userId, setUserId] = useState("");

  const assign = async () => {
    await api.post(`/tasks/${taskId}/assign/${userId}`);
    alert("User assigned");
  };

  return (
    <div className="mt-4">
      <h4 className="font-semibold mb-2">Assign User</h4>

      <div className="flex gap-2">
        <input
          className="p-2 border rounded"
          placeholder="User ID"
          onChange={(e) => setUserId(e.target.value)}
        />
        <button
          onClick={assign}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Assign
        </button>
      </div>
    </div>
  );
}
