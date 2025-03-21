import { useState } from "react";

const SearchStatus = ({ filters, setFilters, fetchFilteredTasks }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Mapeo entre los valores visibles y los valores internos
  const statusOptions = {
    "Pendiente": "pending",
    "En proceso": "in-progress",
    "Completado": "completed",
  };

  const handleChange = (visibleStatus) => {
    const internalStatus = statusOptions[visibleStatus]; // Obtener el valor interno
    setFilters((prevFilters) => ({
      ...prevFilters,
      status: internalStatus, // Actualizar el filtro de status
    }));
    setIsOpen(false); // Cerrar el menú después de seleccionar

    // Llamar a la función de filtrado
    fetchFilteredTasks({
      ...filters,
      status: internalStatus, // Actualizar status en los filtros
    });
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-full max-w-xs">
      <label className="text-[#767676] mr-2 text-xl">Estado:</label>
      <button
        className="bg-[#767676] text-white p-2 rounded-lg"
        onClick={toggleMenu}
      >
        {status || "Seleccionar"}
      </button>

      {isOpen && (
        <div className="absolute top-12 left-0 bg-white border border-gray-300 rounded-lg shadow-lg w-40">
          <ul>
            <li
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleChange("Pendiente")}
            >
              Pendiente
            </li>
            <li
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleChange("En proceso")}
            >
              En proceso
            </li>
            <li
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleChange("Completado")}
            >
              Completado
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchStatus;
