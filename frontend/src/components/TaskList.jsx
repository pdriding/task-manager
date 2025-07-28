import { useContext } from "react";
import TeamContext from "../context/TeamContext";
import { useModal } from "../store/ModalContext";
import useHttp from "../hooks/useHttp";
import Card from "./Card";
import LoadingSpinner from "./UI/LoadingSpinner";
import Error from "./Error";
import Dropdown from "./Dropdown";

const requestConfig = {};

export default function TaskList() {
  const { openModal } = useModal();
  const { teams, selectedTeam } = useContext(TeamContext);
  const {
    tasks: loadedTasks,
    isLoading,
    error,
  } = useHttp("http://localhost:3001/tasks", requestConfig, []);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <Error title="Failed to fetch tasks." message={error} />;

  const currentTasks = (loadedTasks || []).filter(
    (task) => task.team === selectedTeam
  );

  return (
    <div className="mt-5 flex flex-col h-[calc(100vh-4rem)]">
      <Dropdown options={teams} />

      <div className="relative flex-1">
        {currentTasks.length === 0 && (
          <div className="absolute inset-x-0 top-[33%] flex justify-center transform -translate-y-13">
            <p className="text-gray-200 text-lg">No tasks for this team yet.</p>
          </div>
        )}

        <ul className="space-y-4 p-4">
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
      </div>
    </div>
  );
}
