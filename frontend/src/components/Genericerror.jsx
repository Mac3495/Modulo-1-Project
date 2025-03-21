import React from "react";
import { useNavigate } from "react-router-dom";

const GenericError = () => {
  const navigate = useNavigate();
  const handleRetry = () => {
    navigate("/login")
  };

  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-80px)] text-white">
      <img
        src="https://cdn2.iconfinder.com/data/icons/task-board-1/100/taskboard_task_board_plan_schedule_list-07-512.png"
        alt="Error"
        className="w-52 h-52 mb-4"
      />
      <p className="text-lg mb-4">{errorMessage}</p>
      <button
        onClick={handleRetry}
        className="bg-[#FFB433] text-white py-2 px-4 rounded-lg hover:bg-[#e09e2c] transition"
      >
        Iniciar sesión
      </button>
    </div>
  );
};

export default GenericError;
