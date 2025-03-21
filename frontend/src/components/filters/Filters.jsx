import SearchBar from "./SearchBar";
import SearchStatus from "./SearchStatus";
import SearchDate from "./SearchDate";

const Filters = ({ filters, setFilters, fetchFilteredTasks }) => {
  // Verifica si hay algún filtro activo
  const hasFilters = filters.status || filters.expireDate || filters.search;

  const clearFilters = () => {
    setFilters({ status: "", expireDate: "", search: "" }); // Restablecer filtros
    fetchFilteredTasks({ status: "", expireDate: "", search: "" }); // Recargar tareas sin filtros
  };

  return (
    <div className="p-4 flex justify-center">
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-col max-w-2xl">
        <div className="flex justify-between items-center space--2">
          <SearchBar filters={filters} setFilters={setFilters} fetchFilteredTasks={fetchFilteredTasks}/>
          <SearchStatus filters={filters} setFilters={setFilters} fetchFilteredTasks={fetchFilteredTasks}/>
          <SearchDate filters={filters} setFilters={setFilters} fetchFilteredTasks={fetchFilteredTasks}/>
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="ml-2 text-gray-600 hover:text-red-500 transition"
              title="Borrar filtros"
            >
              X
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;
