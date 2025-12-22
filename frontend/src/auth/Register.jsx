import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "USER",
  });

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/users/register", form);
    alert("Account created. Login now.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={submit} className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        <input className="w-full mb-3 p-2 border rounded"
          placeholder="Username"
          onChange={e => setForm({...form, username: e.target.value})}
        />

        <input className="w-full mb-3 p-2 border rounded"
          placeholder="Email"
          onChange={e => setForm({...form, email: e.target.value})}
        />

        <input type="password" className="w-full mb-3 p-2 border rounded"
          placeholder="Password"
          onChange={e => setForm({...form, password: e.target.value})}
        />

        <select className="w-full mb-4 p-2 border rounded"
          onChange={e => setForm({...form, role: e.target.value})}>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <button className="w-full bg-green-600 text-white py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
