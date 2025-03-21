import { useState } from "react";
import { createTask } from "../services/taskService";

const CreateTaskButton = ({ refreshTasks }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "pending",
    expireDate: "",
  });

  const handleCreateTask = async () => {
    try {
      await createTask(taskData);
      setIsModalOpen(false);
      refreshTasks();
      setTaskData({ title: "", description: "", status: "pending", expireDate: "" }); // Resetear campos
    } catch (error) {
      console.error("Error al crear la tarea:", error);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-[#FFB433] text-white py-2 px-6 rounded-lg hover:bg-[#e09e2c] transition"
      >
        Crear tarea
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-[#1A1A19]">Nueva Tarea</h2>

            <input
              type="text"
              placeholder="Título"
              className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              value={taskData.title}
              onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
            />
            <textarea
              placeholder="Descripción"
              className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              value={taskData.description}
              onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
            />
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded-lg mb-2"
              value={taskData.expireDate}
              onChange={(e) => setTaskData({ ...taskData, expireDate: e.target.value })}
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-[#FFB433] text-white py-2 px-4 rounded-lg hover:bg-[#e09e2c] transition"
                onClick={handleCreateTask}
              >
                Crear tarea
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateTaskButton;
