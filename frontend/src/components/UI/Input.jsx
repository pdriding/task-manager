export default function Input({ label, id, type, options = [], ...props }) {
  let inputElement;

  if (type === "select") {
    inputElement = (
      <select id={id} name={id} {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  } else {
    inputElement = <input id={id} name={id} type={type} required {...props} />;
  }

  return (
    <div className="control">
      <label htmlFor={id}>{label}</label>
      {inputElement}
    </div>
  );
}
