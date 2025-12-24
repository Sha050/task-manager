import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <header className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-[#324d67]">
        <h1 className="font-bold text-lg">TaskFlow</h1>
        <div className="flex items-center gap-6 relative">
          <div className="relative z-10">
          </div>
          {user && (
            <div className="relative z-20">
              <button
                onClick={() => setOpen(!open)}
                className="w-9 h-9 rounded-full bg-indigo-600 text-white font-semibold flex items-center justify-center shadow"
              >
                {user.username?.charAt(0).toUpperCase()}
              </button>
              {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-[#1c2834] border border-slate-200 dark:border-[#324d67] rounded shadow-lg">
                  <button
                    onClick={() => {
                      setOpen(false);
                      navigate("/profile");
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-[#233648]"
                  >
                    Profile
                  </button>

                  <button
                    onClick={() => {
                      setOpen(false);
                      logout();
                      navigate("/login");
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-100 dark:hover:bg-[#233648]"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
