import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        placeholder="Search order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-48 rounded-full bg-yellow-100 px-4 py-2 text-sm text-stone-500 transition-all duration-200 focus:w-64 focus:outline-none"
      />
      <button
        type="submit"
        className="absolute end-2 top-1 cursor-pointer rounded-full bg-stone-100 px-2 py-1 text-sm text-stone-500 transition-all duration-150 hover:end-0 hover:top-0 hover:bg-stone-200 hover:px-4 hover:py-2 hover:text-stone-800"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </form>
  );
}

export default SearchOrder;
