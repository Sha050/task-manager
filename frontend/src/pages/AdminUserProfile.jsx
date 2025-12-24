import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AdminUserProfile() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const user = state?.user;
  useEffect(() => {
    if (!user) {
      navigate("/profile", { replace: true });
    }
  }, [user, navigate]);

  if (!user) return null; 

  return (
    <main className="flex justify-center py-10 px-4 bg-background-light min-h-screen">
      <div className="w-full max-w-4xl flex flex-col gap-8">
        <div>
          <button
            onClick={() => navigate("/admin")}
            className="text-sm text-primary hover:underline mb-2"
          >
            ← Back to Admin
          </button>

          <h1 className="text-4xl font-black tracking-tight">
            User Profile
          </h1>
          <p className="text-slate-500">
            Admin view of user account details.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="flex flex-col items-center pt-10 pb-6 border-b">
            <div
              className="h-32 w-32 rounded-full flex items-center justify-center
                         bg-primary/10 text-primary
                         border-4 border-white shadow-lg ring-4 ring-primary/10"
            >
              <span className="text-5xl font-black uppercase">
                {user.username.charAt(0)}
              </span>
            </div>

            <h2 className="mt-4 text-2xl font-bold">
              {user.username}
            </h2>

            <span
              className="mt-2 inline-flex items-center px-3 py-1 rounded-full
                         text-xs font-bold bg-primary/10 text-primary border border-primary/20"
            >
              {user.role}
            </span>
          </div>

          <div className="p-6 pb-2">
            <div className="flex gap-3 p-4 rounded-lg bg-blue-50 border border-blue-100">
              <span className="text-primary">ℹ️</span>
              <div>
                <p className="font-bold text-sm">Admin View</p>
                <p className="text-sm text-slate-600">
                  This profile is shown in read-only mode. Authentication
                  and identity are managed by the backend.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <Field label="User ID" value={user.id} mono />
            <Field label="Username" value={user.username} />
            <Field label="Email" value={user.email} />
            <Field label="Role" value={user.role} />
          </div>
        </div>
      </div>
    </main>
  );
}

function Field({ label, value, mono }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </label>
      <div className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 select-none">
        <span className={mono ? "font-mono" : ""}>
          {value}
        </span>
      </div>
    </div>
  );
}
