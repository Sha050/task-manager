import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../layout/Navbar";

export default function AdminTaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get("/tasks").then((res) => setTasks(res.data));
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">All Tasks (Admin)</h1>

        <div className="grid gap-4">
          {tasks.map((t) => (
            <div key={t.id} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{t.title}</h2>
              <p>{t.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
