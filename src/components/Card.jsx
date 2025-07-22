export default function Card({ title, description, priority }) {
  return (
    <div className="max-w-md mx-auto mt-4">
      <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <span className="text-sm px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 font-medium">
            {priority}
          </span>
        </div>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
}
