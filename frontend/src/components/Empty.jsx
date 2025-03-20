import React from 'react';

const Empty = () => {
  const handleCreateTask = () => {
    console.log('Crear tarea');
  };

  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-80px)] text-white">
      <img 
        src="https://cdn-icons-png.flaticon.com/256/1028/1028163.png"
        alt="No tasks"
        className="mb-4"
      />
      <p className="text-lg">Aún no tienes tareas</p>
      <button 
        onClick={handleCreateTask}
        className="bg-[#FFB433] text-white py-2 mt-4 px-6 rounded-lg hover:bg-[#e09e2c] transition"
      >
        Crear tarea
      </button>
    </div>
  );
};

export default Empty;
