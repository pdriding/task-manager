export default function Card({ title, description, priority }) {
  return (
    <div class="max-w-md mx-auto mt-4">
      <div class="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
        <div class="flex justify-between items-start">
          <h3 class="text-xl font-semibold text-gray-800">{title}</h3>
          <span class="text-sm px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 font-medium">
            {priority}
          </span>
        </div>
        <p class="text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
}
