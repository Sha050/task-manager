import { useState } from "react";
import api from "../api/axios";
import Navbar from "../layout/Navbar";

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [dueDate, setDueDate] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/tasks", {
      title,
      description,
      priority,
      dueDate,
    });
    alert("Task created");
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Create Task</h2>

        <form onSubmit={submit} className="space-y-4">
          <input
            className="w-full p-2 border rounded"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="w-full p-2 border rounded"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            className="w-full p-2 border rounded"
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>LOW</option>
            <option>MEDIUM</option>
            <option>HIGH</option>
          </select>

          <input
            type="date"
            className="w-full p-2 border rounded"
            onChange={(e) => setDueDate(e.target.value)}
          />

          <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Create
          </button>
        </form>
      </div>
    </>
  );
}
