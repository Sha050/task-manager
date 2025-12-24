export default function Alert({ type = "error", message }) {
  return (
    <div className="p-4 rounded-lg border border-red-300 bg-red-50 text-red-700">
      {message}
    </div>
  );
}
