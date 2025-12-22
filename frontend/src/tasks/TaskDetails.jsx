import { useParams } from "react-router-dom";
import Navbar from "../layout/Navbar";
import CommentSection from "../comments/CommentSection";
import AssignUser from "./AssignUser";

export default function TaskDetails() {
  const { taskId } = useParams();

  return (
    <>
      <Navbar />
      <div className="p-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Task #{taskId}</h2>

        <section className="bg-white p-6 rounded shadow mb-6">
          <h3 className="font-semibold mb-2">Task Overview</h3>
          <p className="text-gray-600">
            This task represents a unit of collaborative work. Progress is tracked
            per user and discussions are restricted to assigned members.
          </p>
        </section>

        <section className="bg-white p-6 rounded shadow mb-6">
          <h3 className="font-semibold mb-2">Attachments (Local Preview)</h3>
          <input type="file" multiple />
          <p className="text-sm text-gray-500 mt-2">
            Files are previewed locally. Backend storage can be added later.
          </p>
        </section>

        <AssignUser taskId={taskId} />

        <CommentSection taskId={taskId} />
      </div>
    </>
  );
}
