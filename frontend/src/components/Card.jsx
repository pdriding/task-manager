import React, { memo } from "react";
import PropTypes from "prop-types";
import { format, parseISO } from "date-fns";

/**
 * Compute task status text and color based on completion and due date.
 */
function getTaskStatus(completed, dueDate) {
  const due = new Date(dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (completed) {
    return { text: "Completed", color: "green" };
  }
  if (due < today) {
    return { text: "Past Due", color: "red" };
  }
  return { text: "On Track", color: "blue" };
}

/**
 * Task card component with colored left-side priority stripe.
 */
function Card({
  title,
  description,
  priority,
  editForm,
  deleteTask,
  completed,
  dueDate,
}) {
  const { text: statusText, color: statusColor } = getTaskStatus(
    completed,
    dueDate
  );

  // Left stripe color based on priority
  const priorityStripe = {
    high: "border-l-4 border-red-500",
    medium: "border-l-4 border-gray-500",
    low: "border-l-4 border-yellow-500",
  };

  return (
    <div className="max-w-md mx-auto mt-4">
      <div
        className={`flex flex-col bg-white rounded-2xl shadow-md p-6 ${priorityStripe[priority]}`}
      >
        <h3 className="text-xl font-semibold text-gray-800 ">{title}</h3>

        <p className="text-sm text-gray-500 mt-2">
          {console.log(dueDate)}
          Due {format(parseISO(dueDate), "MMM d, yyyy")}
        </p>

        <p className="text-gray-600 mt-2 line-clamp-3">{description}</p>

        <div className="mt-6 flex justify-between items-center">
          <span
            className={`text-sm px-2 py-1 rounded-full font-medium bg-${statusColor}-100 text-${statusColor}-800`}
          >
            {statusText}
          </span>
          <div className="flex gap-2 justify-end mt-auto">
            <button
              onClick={editForm}
              aria-label="Edit task"
              className="p-1 rounded focus:outline-none focus:ring"
            >
              <span role="img" aria-label="Edit">
                ✏️
              </span>
            </button>
            <button
              onClick={deleteTask}
              aria-label="Delete task"
              className="p-1 rounded focus:outline-none focus:ring"
            >
              <span role="img" aria-label="Delete">
                🗑️
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  priority: PropTypes.oneOf(["low", "medium", "high"]),
  completed: PropTypes.bool,
  dueDate: PropTypes.string.isRequired,
  editForm: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

Card.defaultProps = {
  description: "",
  priority: "medium",
  completed: false,
};

export default memo(Card);
