export default function Input({ label, id, type, options = [], ...props }) {
  return (
    <div className="control">
      <label htmlFor={id}>{label}</label>
      {type === "select" ? (
        <select id={id} name={id}>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input id={id} name={id} type={type} required {...props} />
      )}
    </div>
  );
}
