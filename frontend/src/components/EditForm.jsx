import { useState, useContext, useEffect } from "react";
import Input from "./UI/Input";
import Error from "./Error";
import TeamContext from "../context/TeamContext";
import useHttp from "../hooks/useHttp";

const updateConfig = {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function EditForm({ id, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");

  const {
    isLoading: isSending,
    error,
    sendRequest,
  } = useHttp(`http://localhost:3001/tasks/${id}`, updateConfig);

  const { tasks } = useContext(TeamContext);

  const currentTask = tasks.find((t) => t.id === id);

  useEffect(() => {
    if (currentTask) {
      setTitle(currentTask.title);
      setDescription(currentTask.description);
      setPriority(currentTask.priority);
    }
  }, [currentTask]);

  function handleSubmit(event) {
    event.preventDefault();
    const team = tasks.find((t) => t.id === id)?.team;
    const userData = { title, description, priority, team, id };

    sendRequest(JSON.stringify(userData));

    onClose();
  }

  return (
    <>
      <h2 className="text-center">Edit Task</h2>
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
          <button type="submit" className="button" disabled={isSending}>
            {isSending ? "Saving…" : "Edit Task"}
          </button>
          <button type="button" className="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
