import Input from "./UI/Input";
import useHttp from "../hooks/useHttp";
import Error from "./Error";
import LoadingSpinner from "./UI/LoadingSpinner";
import { useContext, useState, useEffect } from "react";
import TeamContext from "../context/TeamContext";
import DateInput from "./UI/DateInput";
import Checkbox from "./UI/Checkbox";

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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [completed, setCompleted] = useState(false);

  const {
    isLoading: isSending,
    error,
    sendRequest,
  } = useHttp("http://localhost:3001/tasks", requestConfig);

  async function handleSubmit(event) {
    event.preventDefault();

    // Remove Time
    const isoFull = selectedDate.toISOString();
    const dateOnly = isoFull.split("T")[0];

    console.log(completed, selectedDate);
    const taskData = {
      team: selectedTeam,
      title,
      description,
      priority,
      completed,
      dueDate: dateOnly,
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
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
        <h2 className="text-center text-lg font-medium">Add New Task</h2>
        <div className="flex flex-col gap-2">
          <Input
            label="Title: "
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Input
            label="Description: "
            type="textarea"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
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
          <DateInput
            date={selectedDate}
            setDate={setSelectedDate}
            id="date"
            label="Due: "
          />

          <Checkbox
            label="Completed"
            id="completed"
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />

          {error && <Error title="Failed to submit..." message={error} />}
          <div className="mt-4 flex gap-2 justify-end">
            <button type="submit" className="button" disabled={isSending}>
              {isSending ? "Saving…" : "Add Task"}
            </button>
            <button type="button" className="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
