import useHttp from "../hooks/useHttp";
import Error from "./Error";

const updateConfig = {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function DeleteTask({ id, onClose }) {
  const { error, sendRequest } = useHttp(
    `http://localhost:3001/tasks/${id}`,
    updateConfig
  );
  async function handleDelete() {
    const data = {
      id,
    };
    await sendRequest(JSON.stringify(data));

    onClose();
  }

  return (
    <div className="p-6 bg-white  max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-red-600 mb-4">Delete Task?</h2>
      <p className="text-gray-700 mb-6">
        Are you sure you want to delete this task? This action cannot be undone.
      </p>
      {error && <Error title="Failed to submit..." message={error} />}
      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          Cancel
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
