import { useNavigate } from "react-router-dom";

export default function TaskCard({ task }) {
  const navigate = useNavigate();

  if (!task || !task.id) return null;

  const {
    id,
    title = "Untitled task",
    description = "No description provided",
    priority = "LOW",
    status = "OPEN",
  } = task;

    const goToDetails = () => {
    navigate(`/tasks/${id}`, {
        state: { task },
    });
  };

  return (
    <div
      onClick={goToDetails}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && goToDetails()}
      className="
        cursor-pointer
        p-5 rounded-xl
        border border-slate-200 dark:border-[#233648]
        bg-white dark:bg-[#111a22]
        hover:border-primary
        hover:shadow-md
        transition-all
        flex flex-col gap-3
      "
    >
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-slate-900 dark:text-white">
          {title}
        </h3>

        <span className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-[#233648]">
          {priority}
        </span>
      </div>

      <p className="text-sm text-slate-600 dark:text-[#92adc9] line-clamp-2">
        {description}
      </p>

      <div className="flex justify-between text-xs text-slate-400 pt-2 border-t border-slate-100 dark:border-[#233648]">
        <span>Status: {status}</span>
        <span className="text-primary">View →</span>
      </div>
    </div>
  );
}
