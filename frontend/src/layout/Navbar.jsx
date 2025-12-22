import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();          
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white px-8 py-4 flex justify-between items-center shadow">
      <span className="text-xl font-bold">TaskForge</span>

      <div className="flex gap-5 items-center">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/tasks" className="hover:underline">Tasks</Link>
        <Link to="/tasks/create" className="hover:underline">Create</Link>
        <Link to="/profile" className="hover:underline">Profile</Link>

        {user?.role === "ADMIN" && (
          <Link to="/admin/tasks" className="hover:underline">Admin</Link>
        )}

        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-1 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
