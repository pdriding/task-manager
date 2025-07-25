import React, { useRef, useEffect } from "react";

export default function Input({
  label,
  id,
  type = "text",
  options = [],
  ...props
}) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (type === "textarea" && textareaRef.current) {
      const ta = textareaRef.current;
      const adjustHeight = () => {
        ta.style.height = "auto";
        ta.style.height = `${ta.scrollHeight}px`;
      };
      // initial resize
      adjustHeight();
      ta.addEventListener("input", adjustHeight);
      return () => ta.removeEventListener("input", adjustHeight);
    }
  }, [type]);

  let inputElement;

  if (type === "select") {
    inputElement = (
      <select
        id={id}
        name={id}
        {...props}
        className="w-full border-b px-1 py-0.5 focus:outline-none"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="block text-sm">
            {opt.label}
          </option>
        ))}
      </select>
    );
  } else if (type === "textarea") {
    inputElement = (
      <textarea
        required
        ref={textareaRef}
        id={id}
        name={id}
        {...props}
        className="w-full border-b px-1 py-0.5 focus:outline-none resize-none overflow-hidden"
      />
    );
  } else {
    inputElement = (
      <input
        className="w-full border-b px-1 py-0.5 focus:outline-none"
        id={id}
        name={id}
        type={type}
        required
        {...props}
      />
    );
  }

  return (
    <div className="control">
      <label htmlFor={id} className="block text-sm">
        {label}
      </label>
      {inputElement}
    </div>
  );
}
