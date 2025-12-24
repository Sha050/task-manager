import { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Profile() {
  const { user: me, logout } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const viewedUserId = params.get("user");
  const isAdminViewingOther =
    me?.role === "ADMIN" && viewedUserId;

  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        if (isAdminViewingOther) {
          const res = await api.get("/users");
          const found = res.data.find(
            (u) => String(u.id) === String(viewedUserId)
          );
          if (!found) throw new Error();
          setUser(found);
        } else {
          const res = await api.get("/users/me");
          setUser(res.data);
        }
      } catch {
        setError("Failed to load profile.");
      }
    };

    loadProfile();
  }, [viewedUserId, isAdminViewingOther]);

  const updateRole = async (newRole) => {
    if (!user || user.role === newRole) return;

    try {
      setSaving(true);
      await api.patch(`/users/${user.id}/role`, { role: newRole });
      setUser({ ...user, role: newRole });
    } catch {
      alert("Failed to update role.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (error) {
    return (
      <p className="text-red-600 text-center mt-10">
        {error}
      </p>
    );
  }

  if (!user) {
    return (
      <p className="text-center mt-10 text-slate-500">
        Loading profile…
      </p>
    );
  }

  return (
    <div className="font-display bg-background-light min-h-screen text-slate-900">
      <main className="flex justify-center py-10 px-4">
        <div className="w-full max-w-3xl flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-black tracking-tight">
              Profile Settings
            </h1>
            <p className="text-slate-500">
              Manage your account details and identity status.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="flex flex-col items-center pt-10 pb-6 border-b border-slate-100">
              <div className="relative">
                <div className="h-32 w-32 rounded-full bg-primary/10 text-primary flex items-center justify-center text-5xl font-black ring-4 ring-primary/10 border-4 border-white">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div
                  className="absolute bottom-1 right-1 bg-green-500 rounded-full p-1.5 border-4 border-white"
                  title="Active"
                />
              </div>

              <div className="mt-4 text-center">
                <h2 className="text-2xl font-bold tracking-tight">
                  {user.username}
                </h2>

                <span className="inline-flex items-center gap-1 mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                  <span className="material-symbols-outlined text-[14px]">
                    verified_user
                  </span>
                  {user.role}
                </span>
              </div>
            </div>

            <div className="p-6 pb-2">
              <div className="flex gap-4 p-4 rounded-lg bg-blue-50 border border-blue-100">
                <span className="material-symbols-outlined text-primary">
                  info
                </span>
                <div>
                  <p className="text-sm font-bold">
                    Identity Verification
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Your identity is verified using JWT authentication.
                    Profile attributes are managed by the system and
                    cannot be edited directly.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field
                label="Username"
                icon="person"
                value={user.username}
                mono
              />

              <Field
                label="Role"
                icon="badge"
                value={
                  me?.role === "ADMIN" ? (
                    <select
                      value={user.role}
                      disabled={saving}
                      onChange={(e) =>
                        updateRole(e.target.value)
                      }
                      className="bg-transparent text-sm font-medium outline-none"
                    >
                      <option value="USER">USER</option>
                      <option value="ADMIN">ADMIN</option>
                    </select>
                  ) : (
                    user.role
                  )
                }
              />

              <Field
                label="User ID"
                icon="fingerprint"
                value={user.id}
                mono
                full
              />

              <Field
                label="Authentication"
                icon="key"
                value="JWT (JSON Web Token)"
                full
              />
            </div>

            {!isAdminViewingOther && (
              <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
                <button
                  onClick={handleLogout}
                  className="text-sm font-bold text-red-500 hover:underline"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function Field({ label, icon, value, mono = false, full = false }) {
  return (
    <div
      className={`flex flex-col gap-2 ${
        full ? "md:col-span-2" : ""
      }`}
    >
      <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </label>

      <div className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 select-none">
        <span className="material-symbols-outlined text-[18px]">
          {icon}
        </span>
        <span
          className={`text-sm ${
            mono ? "font-mono" : "font-medium"
          }`}
        >
          {value}
        </span>
      </div>
    </div>
  );
}
