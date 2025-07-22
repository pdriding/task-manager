import Input from "./UI/Input";
import useHttp from "../hooks/useHttp";
import Error from "./Error";
import LoadingSpinner from "./UI/LoadingSpinner";
import { useContext, useState } from "react";
import TeamContext from "../context/TeamContext";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function TaskForm() {
  const { selectedTeam } = useContext(TeamContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");

  const {
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3001/tasks", requestConfig);

  function handleSubmit(event) {
    event.preventDefault();

    const taskData = { title, description, priority };

    sendRequest(
      JSON.stringify({
        newTask: {
          team: selectedTeam,
          tasks: taskData,
        },
      })
    );
    clearData();
  }

  if (isSending) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <h2 className="text-center">Add New Task</h2>

      <form onSubmit={handleSubmit}>
        <Input
          label="Title:"
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          label="Description:"
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          label="Priority:"
          type="select"
          id="priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          options={[
            { value: "low", label: "Low" },
            { value: "high", label: "High" },
          ]}
        />

        {error && <Error title="Failed to submit..." message={error} />}
        <div className="mt-4 flex justify-end">
          <button type="submit" className="button">
            Add Task
          </button>
        </div>
      </form>
    </>
  );
}
