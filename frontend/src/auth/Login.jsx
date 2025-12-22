import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "./AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await api.post("/users/login", { username, password });
    login(res.data);
    navigate("/tasks");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={submit} className="bg-white p-8 rounded shadow w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Task Manager Login
        </h1>

        <input
          className="w-full mb-4 p-2 border rounded"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-6 p-2 border rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>
        <p className="mt-4 text-center text-sm">
            No account? <a href="/register" className="text-blue-600">Sign up</a>
        </p>
      </form>
    </div>
  );
}
