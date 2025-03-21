import { useState } from "react";

const SearchBar = ({ filters, setFilters, fetchFilteredTasks }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    if (searchText.trim()) { 
      setFilters((prevFilters) => ({
        ...prevFilters,
        search: searchText, // Actualizar el filtro de status
      }));
      fetchFilteredTasks({
        ...filters,
        search: searchText, // Actualizar status en los filtros
      });
    }
  };

  return (
    <div className="relative w-full max-w-xs mr-4">
      <input
        type="text"
        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-[#767676] rounded-md pl-3 pr-10 py-2 transition duration-300 ease focus:outline-none focus:border-[#767676] hover:border-[#767676] shadow-sm focus:shadow"
        placeholder="Buscar tareas..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="absolute right-1 top-1 rounded bg-[#767676] p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-[#767676] focus:shadow-none active:bg-[#767676] hover:bg-[#767676] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
          <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
