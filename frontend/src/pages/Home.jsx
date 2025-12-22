import { Link } from "react-router-dom";
import Navbar from "../layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-100">
        <div className="max-w-4xl bg-white rounded-xl shadow-lg p-10 text-center">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
            alt="Teamwork"
            className="rounded-lg mb-6 mx-auto w-full max-h-64 object-cover"
          />

          <h1 className="text-4xl font-bold mb-4">
            A Secure Task Collaboration Platform
          </h1>

          <p className="text-gray-600 mb-6 leading-relaxed">
            TaskForge is a role-based task management system designed to help teams
            collaborate securely. It features JWT authentication, strict access control,
            per-user task status tracking, and protected discussions — all backed by a
            robust Spring Boot backend.
          </p>

          <div className="flex justify-center gap-6">
            <Link to="/tasks" className="bg-indigo-600 text-white px-6 py-3 rounded-lg">
              View My Tasks
            </Link>
            <Link to="/tasks/create" className="bg-green-600 text-white px-6 py-3 rounded-lg">
              Create New Task
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
