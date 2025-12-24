export default function Loading({ text = "Loading…" }) {
  return (
    <div className="text-center text-slate-500 mt-20">
      {text}
    </div>
  );
}
