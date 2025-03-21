import { useState } from "react";

const SearchDate = ({ filters, setFilters, fetchFilteredTasks }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = (e) => {
    setSelectedDate(e.target.value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      expireDate: e.target.value, // Actualizar el filtro de status
    }));
    fetchFilteredTasks({
      ...filters,
      expireDate: e.target.value, // Actualizar status en los filtros
    });
  };

  return (
    <div className="relative w-full max-w-xs">
      <div className="flex items-center">
        <label className="text-[#767676] mr-4 text-xl">Fecha:</label>
        <div className="relative">
          <input
            type="date"
            className="bg-[#767676] text-white p-2 rounded-lg border-2 border-[#767676] pr-4 scheme-dark"
            value={selectedDate}
            onChange={handleChange}
            style={{
              WebkitAppearance: "none", // Para quitar el estilo predeterminado del navegador
              MozAppearance: "none",
              appearance: "none",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchDate;
