import Input from "./UI/Input";
import useHttp from "../hooks/useHttp";
import Error from "./Error";
import LoadingSpinner from "./UI/LoadingSpinner";
import { useContext, useState, useEffect } from "react";
import TeamContext from "../context/TeamContext";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function TaskForm({ onClose }) {
  useEffect(() => {
    const handler = () => console.log("PAGE IS RELOADING");
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  const { selectedTeam } = useContext(TeamContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");

  const {
    isLoading: isSending,
    error,
    sendRequest,
  } = useHttp("http://localhost:3001/tasks", requestConfig);

  async function handleSubmit(event) {
    event.preventDefault();

    const taskData = {
      team: selectedTeam,
      title,
      description,
      priority,
    };

    try {
      await sendRequest(JSON.stringify(taskData));

      onClose();
    } catch (err) {
      console.error("Fetch error:", err.message);
    }
  }

  if (isSending) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <h2 className="text-center">Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <Input
          label="Title: "
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          label="Description: "
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          label="Priority: "
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
        <div className="mt-4 flex gap-2 justify-end">
          <button
            type="button"
            className="button"
            onClick={handleSubmit}
            disabled={isSending}
          >
            {isSending ? "Saving…" : "Add Task"}
          </button>
          <button type="button" className="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
