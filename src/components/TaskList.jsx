import { useContext, useLayoutEffect } from "react";
import TeamContext from "../context/TeamContext";
import { useModal } from "../store/ModalContext";
import useHttp from "../hooks/useHttp";
import Card from "./Card";

const requestConfig = {};

export default function TaskList() {
  const { openModal } = useModal();
  const { teams, selectedTeam, setSelectedTeam } = useContext(TeamContext);
  const {
    data: loadedTasks,
    isLoading,
    error,
  } = useHttp("http://localhost:3001/tasks", requestConfig, []);

  function showForm() {
    openModal("task-form");
  }

  const currentTasks = loadedTasks
    .filter((task) => (task.team === selectedTeam ? task : false))
    .map((t) => {
      // TODO
      t.tasks, t.id;
    });

  return (
    <div className="mt-5 ">
      <button onClick={showForm}>Add Task</button>
      {currentTasks && (
        <ul>
          {currentTasks.map((task) => (
            <li>
              <Card
                title={task.title}
                priority={task.priority}
                description={task.description}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
