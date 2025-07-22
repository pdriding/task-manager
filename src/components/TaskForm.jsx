import Input from "./UI/Input";
import useHttp from "../hooks/useHttp";
import Error from "./Error";
import LoadingSpinner from "./UI/LoadingSpinner";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function TaskForm() {
  const { teams, selectedTeam, setSelectedTeam } = useContext(TeamContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3001/tasks", requestConfig);

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const taskData = Object.fromEntries(fd.entries());

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
        <Input label="Title:" type="text" id="title" />
        <Input label="Description:" type="text" id="description" />
        <Input
          label="Priority:"
          type="select"
          id="priority"
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
