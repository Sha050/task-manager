import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "./AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login, user } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/users/login", {
        username: email,
        password,
      });

      await login(res.data);

    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid credentials. Please try again."
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;

    if (user.role === "ADMIN") {
      navigate("/admin", { replace: true });
    } else {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="font-display bg-background-light dark:bg-background-dark min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[440px] flex flex-col gap-8">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
            <span className="material-symbols-outlined text-3xl text-primary">
              check_circle
            </span>
          </div>
          <h1 className="text-[22px] font-bold">TaskFlow</h1>
        </div>

        <div className="rounded-xl bg-white shadow-lg border overflow-hidden">
          <div className="p-8 flex flex-col gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold">Welcome back</p>
              <p className="text-slate-500 text-sm">
                Enter your credentials to continue
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 p-3 rounded text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={submit} className="flex flex-col gap-5">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Username"
                required
                className="h-12 rounded-lg border px-4"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                  className="h-12 w-full rounded-lg border px-4 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3"
                >
                  👁️
                </button>
              </div>

              <button
                disabled={loading}
                className="h-12 rounded-lg bg-primary text-white font-bold"
              >
                {loading ? "Logging in…" : "Log In"}
              </button>
            </form>
          </div>

          <div className="p-4 border-t text-center text-sm">
            Don’t have an account?
            <Link to="/register" className="text-primary ml-1">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
