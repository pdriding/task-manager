import React from "react";

export default function Checkbox({ label, id, ...props }) {
  return (
    <div className="flex items-center space-x-2">
      <input
        id={id}
        name={id}
        type="checkbox"
        {...props}
        className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
    </div>
  );
}
