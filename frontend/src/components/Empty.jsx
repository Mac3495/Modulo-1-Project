import CreateTaskButton from "./CreateTaskButton";

const Empty = ({ refreshTasks }) => {
  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-80px)] text-white">
      <img 
        src="https://cdn-icons-png.flaticon.com/256/1028/1028163.png"
        alt="No tasks"
        className="mb-4"
      />
      <p className="text-lg">Aún no tienes tareas</p>
      <CreateTaskButton refreshTasks={refreshTasks} />
    </div>
  );
};

export default Empty;
