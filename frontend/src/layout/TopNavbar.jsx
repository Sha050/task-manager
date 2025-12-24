import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function TopBar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="flex justify-between items-center px-6 py-3 border-b">
      <h1 className="font-bold text-lg">TaskFlow</h1>

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center"
        >
          {user.username[0].toUpperCase()}
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow rounded border z-50">
            <button
              onClick={() => {
                navigate("/profile");
                setOpen(false);
              }}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Profile
            </button>

            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
