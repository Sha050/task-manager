import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function AdminLayout() {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen p-6">
      <Outlet />
    </div>
  );
}
