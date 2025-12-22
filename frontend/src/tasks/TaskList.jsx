import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../layout/Navbar";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get("/tasks/me").then(res => setTasks(res.data));
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-8 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">My Tasks</h2>

        {tasks.length === 0 && (
          <p className="text-gray-500">You have no assigned tasks yet.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tasks.map(task => (
            <Link
              key={task.id}
              to={`/tasks/${task.id}`}
              className="bg-white rounded-lg shadow p-5 hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
              <p className="text-gray-600 mb-2">{task.description}</p>
              <span className="text-sm text-gray-500">
                Due: {task.dueDate || "No deadline"}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
