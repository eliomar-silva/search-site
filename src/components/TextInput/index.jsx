import "./styles.css";

export const TextInput = ({ searchValue, onChange }) => {
  return (
    <input
      className="text-input"
      type="search"
      onChange={onChange}
      value={searchValue}
      placeholder="Type your search"
    />
  );
};
