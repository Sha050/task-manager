import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "USER",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/users/register", form);
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed. Please check your input."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-display bg-background-light dark:bg-background-dark min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[440px] flex flex-col gap-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
            <span className="material-symbols-outlined text-3xl text-primary">
              person_add
            </span>
          </div>
          <h1 className="text-slate-900 dark:text-white text-[22px] font-bold tracking-[-0.015em] text-center">
            TaskFlow
          </h1>
        </div>
        <div className="flex flex-col rounded-xl bg-white dark:bg-[#1A2634] shadow-lg border border-slate-200 dark:border-[#324d67] overflow-hidden">
          <div className="p-8 flex flex-col gap-6">
            <div className="flex flex-col gap-2 text-center">
              <p className="text-slate-900 dark:text-white text-2xl font-bold">
                Create your account
              </p>
              <p className="text-slate-500 dark:text-[#92adc9] text-sm">
                Join TaskFlow and start collaborating.
              </p>
            </div>
            {error && (
              <div className="flex items-start gap-3 rounded-lg bg-red-50 dark:bg-red-900/20 px-4 py-3 border border-red-100 dark:border-red-900/30">
                <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-[20px] mt-0.5">
                  error
                </span>
                <div>
                  <p className="text-red-700 dark:text-red-400 text-sm font-medium">
                    Registration failed
                  </p>
                  <p className="text-red-600 dark:text-red-400/80 text-xs">
                    {error}
                  </p>
                </div>
              </div>
            )}
            <form className="flex flex-col gap-5" onSubmit={submit}>
              <label className="flex flex-col w-full">
                <p className="text-slate-900 dark:text-white text-sm font-medium pb-2">
                  Username
                </p>
                <input
                  type="text"
                  required
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                  className="form-input w-full rounded-lg border border-slate-300 dark:border-[#324d67] bg-white dark:bg-[#192633] h-12 px-4 text-base text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#92adc9]"
                  placeholder="yourname"
                />
              </label>

              <label className="flex flex-col w-full">
                <p className="text-slate-900 dark:text-white text-sm font-medium pb-2">
                  Email Address
                </p>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className="form-input w-full rounded-lg border border-slate-300 dark:border-[#324d67] bg-white dark:bg-[#192633] h-12 px-4 text-base text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#92adc9]"
                  placeholder="name@company.com"
                />
              </label>

              <label className="flex flex-col w-full">
                <p className="text-slate-900 dark:text-white text-sm font-medium pb-2">
                  Password
                </p>
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="form-input w-full rounded-lg border border-slate-300 dark:border-[#324d67] bg-white dark:bg-[#192633] h-12 px-4 text-base text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#92adc9]"
                  placeholder="••••••••"
                />
              </label>

              <label className="flex flex-col w-full">
                <p className="text-slate-900 dark:text-white text-sm font-medium pb-2">
                  Role
                </p>
                <select
                  value={form.role}
                  onChange={(e) =>
                    setForm({ ...form, role: e.target.value })
                  }
                  className="form-select w-full rounded-lg border border-slate-300 dark:border-[#324d67] bg-white dark:bg-[#192633] h-12 px-4 text-base text-slate-900 dark:text-white"
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </label>
              <button
                disabled={loading}
                className="mt-2 flex h-12 w-full items-center justify-center rounded-lg bg-primary text-white text-base font-bold hover:bg-blue-600 focus:ring-2 focus:ring-primary transition disabled:opacity-50"
              >
                {loading ? "Creating account…" : "Create Account"}
              </button>
            </form>
          </div>
          <div className="bg-slate-50 dark:bg-[#15202b] p-4 text-center border-t border-slate-200 dark:border-[#324d67]">
            <p className="text-slate-600 dark:text-[#92adc9] text-sm">
              Already have an account?
              <Link
                to="/login"
                className="text-primary font-medium hover:underline ml-1"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
