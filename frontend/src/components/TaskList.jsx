import { useContext } from "react";
import TeamContext from "../context/TeamContext";
import { useModal } from "../store/ModalContext";
import useHttp from "../hooks/useHttp";
import Card from "./Card";
import LoadingSpinner from "./UI/LoadingSpinner";
import Error from "./Error";

const requestConfig = {};

export default function TaskList() {
  const { openModal } = useModal();
  const { selectedTeam } = useContext(TeamContext);
  const {
    tasks: loadedTasks,
    isLoading,
    error,
  } = useHttp("http://localhost:3001/tasks", requestConfig, []);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <Error title="Failed to fetch tasks." message={error} />;
  if (!loadedTasks || loadedTasks.length === 0) {
    return (
      <div className="mt-5">
        <button onClick={() => openModal("task-form")}>Add Task</button>
        <p className="mt-4 text-gray-600">No tasks yet. Please add some!</p>
      </div>
    );
  }

  const currentTasks = loadedTasks.filter((task) => task.team === selectedTeam);
  console.log(loadedTasks);
  return (
    <div className="mt-5">
      <button onClick={() => openModal("task-form")}>Add Task</button>

      {currentTasks.length === 0 ? (
        <p className="mt-4 text-gray-500">No tasks for this team yet.</p>
      ) : (
        <ul className="mt-4 space-y-4">
          {currentTasks.map((task) => (
            <li key={task.id}>
              <Card
                title={task.title}
                priority={task.priority}
                description={task.description}
                id={task.id}
                completed={task.completed}
                dueDate={task.dueDate}
                editForm={() => openModal("edit-form", task.id)}
                deleteTask={() => openModal("delete-task", task.id)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
