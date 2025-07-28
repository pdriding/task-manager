import { useModal } from "../store/ModalContext";

export default function Header() {
  const { openModal } = useModal();
  return (
    <header className="h-20 w-full flex items-center justify-between px-6 bg-transparent">
      <h1 className="text-xl font-bold text-white">Tasks</h1>

      <div className="flex items-center gap-4">
        <button className="text-white" onClick={() => openModal("task-form")}>
          Add Task
        </button>
        <span className="text-white">🌙/☀️</span>
      </div>
    </header>
  );
}
