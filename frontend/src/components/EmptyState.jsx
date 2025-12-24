export default function EmptyState({ title, description }) {
  return (
    <div className="mt-20 text-center text-slate-500">
      <h2 className="text-xl font-semibold">
        {title ?? "Nothing here yet"}
      </h2>
      <p className="mt-2 text-sm">
        {description ?? "No data available."}
      </p>
    </div>
  );
}
