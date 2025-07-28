import taskLogo from "/images/task-logo.png";

export default function Sidebar() {
  return (
    <aside className="w-20 bg-black text-white flex flex-col items-center py-1">
      <div className="mb-8">
        <img
          src={taskLogo}
          alt="Task Logo"
          className="w-20 h-20 rounded-full object-cover"
        />
      </div>
      <nav className="flex flex-col gap-6 mt-10 text-lg">
        <button>🏠</button>
        <button>🔍</button>
        <button>🚀</button>
      </nav>
    </aside>
  );
}
