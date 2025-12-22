import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./auth/AuthContext";
import { useContext } from "react";

import Home from "./pages/Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import TaskList from "./tasks/TaskList";
import TaskDetails from "./tasks/TaskDetails";
import CreateTask from "./tasks/CreateTask";
import Profile from "./user/Profile";

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                <TaskList />
              </PrivateRoute>
            }
          />

          <Route
            path="/tasks/create"
            element={
              <PrivateRoute>
                <CreateTask />
              </PrivateRoute>
            }
          />

          <Route
            path="/tasks/:taskId"
            element={
              <PrivateRoute>
                <TaskDetails />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
