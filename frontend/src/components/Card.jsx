export default function Card({
  title,
  description,
  priority,
  editForm,
  id,
  deleteTask,
}) {
  return (
    <div className="max-w-md mx-auto mt-4">
      <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 flex flex-col">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <span
            className={`text-sm px-2 py-1 rounded-full font-medium ${
              priority === "high"
                ? "bg-red-100 text-red-800"
                : priority === "low"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {priority}
          </span>
        </div>
        <p className="text-gray-600 mt-2">{description}</p>
        <div className="flex gap-2 justify-end  mt-auto">
          <button onClick={() => editForm()}>edit</button>
          <button onClick={() => deleteTask()}>delete</button>
        </div>
      </div>
    </div>
  );
}
