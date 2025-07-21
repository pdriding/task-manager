import { useModal } from "../store/ModalContext";

export default function TaskList() {
  const { openModal } = useModal();
  function showForm() {
    openModal("task-form");
  }
  return (
    <div className="mt-5 ">
      <button onClick={showForm}>Add Task</button>
    </div>
  );
}
