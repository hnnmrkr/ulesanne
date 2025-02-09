import { useState } from "react";

export const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="search__wrapper">
      <input
        className="search__input"
        type="text"
        placeholder="Search by name"
        value={query}
        onChange={handleChange}
      />
    </div>
  );
};