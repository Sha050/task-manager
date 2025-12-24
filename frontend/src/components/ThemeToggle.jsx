export default function ThemeToggle() {
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 px-3 py-2 rounded-lg
                 bg-white dark:bg-[#1A2634]
                 border border-slate-300 dark:border-[#324d67]
                 shadow text-sm"
    >
      🌓
    </button>
  );
}
