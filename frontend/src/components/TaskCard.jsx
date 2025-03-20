import React, { useState } from "react";

const TaskCard = () => {
  // Objeto 'hardcodeado'
  const task = {
    _id: "67d88318934b8a9f88a2b1ca",
    title: "Titulo 1",
    description: "Descripcion",
    status: "pending", // También puede ser 'in-progress' o 'completed'
    expireDate: "2025-05-05T04:00:00.000+00:00", // Puede ser nulo o tener una fecha
    user: "67d839afa89134c393671513",
    createdAt: "2025-03-17T20:16:24.881+00:00",
    updatedAt: "2025-03-17T20:16:24.881+00:00",
  };

  const [status, setStatus] = useState(task.status); // Estado local para el status

  // Formatear la fecha de expiración si existe
  const formattedExpireDate = task.expireDate
    ? new Date(task.expireDate).toLocaleDateString("es-ES")
    : "Sin fecha de expiración";

  // Función para manejar el cambio de estado
  const handleStatusChange = () => {
    if (status === "pending") {
      setStatus("in-progress");
      console.log("in-progress");
    } else if (status === "in-progress") {
      setStatus("completed");
      console.log("complete");
    }
  };

  // Función para manejar el borrado de tarea
  const handleDelete = () => {
    console.log("Borrar tarea");
  };

  return (
    <div className="w-80 p-8 px-4 py-4 bg-white rounded-lg shadow-lg mb-2">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-[#1A1A19]">{task.title}</h3>
        <span
          className={`text-white text-sm px-3 py-1 rounded-lg ${
            status === "pending"
              ? "bg-yellow-500"
              : status === "in-progress"
              ? "bg-blue-500"
              : "bg-green-500"
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
      <p className="text-[#1A1A19] mb-2">{task.description}</p>
      <p className="text-sm text-gray-500">
        <strong>Expiración:</strong> {formattedExpireDate}
      </p>

      {/* Botones para cambiar estado y eliminar */}
      <div className="flex justify-between items-center mt-4">
        {/* Botón para cambiar estado, solo si el estado no es 'complete' */}
        {status !== "completed" && (
          <button
            onClick={handleStatusChange}
            className="bg-[#FFB433] text-white px-4 py-2 rounded-lg"
          >
            Cambiar estado
          </button>
        )}
        {/* Icono de basurero */}
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white p-2 rounded-lg"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
