import { useState } from "react";
import { deleteTask, updateTask } from "../services/taskService"; // Asegúrate de importar updateTask también

const TaskCard = ({ task, refreshTasks }) => {
  const [status, setStatus] = useState(task.status);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskData, setTaskData] = useState({
    title: task.title,
    description: task.description,
    expireDate: task.expireDate,
  });

  // Formatear la fecha de expiración si existe
  const formattedExpireDate = task.expireDate
    ? new Date(task.expireDate).toLocaleDateString("es-ES")
    : "";

  const handleDelete = async () => {
    try {
      await deleteTask(task._id);
      refreshTasks();
    } catch (error) {
      console.error("Error al borrar la tarea:", error);
    }
  };

  // Función para manejar los cambios en los campos del formulario de edición
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Función para manejar el guardado de los cambios
  const handleSave = async () => {
    try {
      await updateTask(task._id, taskData); // Llamada al servicio de actualización
      setIsModalOpen(false); // Cerrar el modal
      refreshTasks(); // Refrescar la lista de tareas
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
    }
  };

  // Función para manejar el cierre del modal
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Función para cambiar el estado de la tarea
  const handleStatusChange = async () => {
    let newStatus = status === "pending" ? "in-progress" : "completed";
    setStatus(newStatus);
    
    try {
      // Llamamos al servicio para actualizar la tarea con el nuevo estado
      await updateTask(task._id, { ...taskData, status: newStatus });
      refreshTasks(); // Refrescar las tareas después de la actualización
    } catch (error) {
      console.error("Error al cambiar el estado de la tarea:", error);
    }
  };

  // Función para manejar la edición
  const handleEdit = () => {
    setIsModalOpen(true); // Abrir el modal para editar
  };

  return (
    <div className="w-80 p-8 px-4 py-4 bg-white rounded-lg shadow-lg mb-2">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-[#1A1A19]">{task.title}</h3>
        <span
          className={`text-white text-sm px-3 py-1 rounded-lg ${status === "pending"
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
      {(formattedExpireDate.length > 0 && <p className="text-sm text-gray-500">
        <strong>Expiración:</strong> {formattedExpireDate}
      </p>)}

      {/* Botones para cambiar estado y eliminar */}
      <div className="flex justify-between items-center mt-4">
        {/* Botón para cambiar estado, solo si el estado no es 'completed' */}
        {status !== "completed" && (
          <button
            onClick={handleStatusChange} // Cambia el estado al hacer clic
            className="bg-[#FFB433] text-white px-2 py-2 rounded-lg hover:bg-[#e09e2c] transition"
          >
            Cambiar estado
          </button>
        )}
        {status !== "completed" && (
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white px-2 py-2 rounded-lg hover:bg-[#e09e2c] transition"
          >
            Editar
          </button>
        )}
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-700 transition"
        >
          Eliminar
        </button>
      </div>

      {/* Modal para editar tarea */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-[#1A1A19]">Editar Tarea</h2>

            <input
              type="text"
              placeholder="Título"
              className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              name="title"
              value={taskData.title}
              onChange={handleChange}
            />
            <textarea
              placeholder="Descripción"
              className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              name="description"
              value={taskData.description}
              onChange={handleChange}
            />
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              name="expireDate"
              value={taskData.expireDate}
              onChange={handleChange}
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition"
                onClick={handleCancel}
              >
                Cancelar
              </button>
              <button
                className="bg-[#FFB433] text-white py-2 px-4 rounded-lg hover:bg-[#e09e2c] transition"
                onClick={handleSave}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
