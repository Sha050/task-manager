import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "../auth/AuthContext";

import AuthLayout from "../layout/AuthLayout";
import AppLayout from "../layout/AppLayout";

import Login from "../auth/Login";
import Register from "../auth/Register";

import Dashboard from "../pages/Dashboard";
import AdminDashboard from "../pages/AdminDashboard";
import CreateTask from "../pages/CreateTask";
import TaskDetails from "../pages/TaskDetails";
import Profile from "../pages/Profile";
import AdminUserProfile from "../pages/AdminUserProfile";

export default function AppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />

          <Route path="/tasks/new" element={<CreateTask />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/users/:id" element={<AdminUserProfile />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
