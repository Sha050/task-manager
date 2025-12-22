import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import Navbar from "../layout/Navbar";

export default function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <div className="p-8 max-w-lg mx-auto">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">My Profile</h2>

          <p><b>Username:</b> {user.username}</p>
          <p><b>Role:</b> {user.role}</p>

          <p className="mt-4 text-gray-600">
            Your identity and permissions are derived securely from your JWT.
          </p>
        </div>
      </div>
    </>
  );
}
