import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTasks, getFilteredTasks } from "../services/taskService";
import Empty from "../components/Empty";
import Loader from "../components/Loader";
import GenericError from "../components/GenericError";
import TaskCard from "../components/TaskCard";
import Filters from "../components/filters/Filters";
import CreateTaskButton from "../components/CreateTaskButton";

const Home = () => {
    const navigate = useNavigate();
    const [menuVisible, setMenuVisible] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        status: "",
        expireDate: "",
        search: "",
    });

    // Función para obtener tareas filtradas
    const fetchFilteredTasks = async (filters) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getFilteredTasks(filters);
            setTasks(data); // Actualizar las tareas con los resultados filtrados
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchTasks = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getTasks();
            setTasks(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const toggleMenu = () => setMenuVisible(!menuVisible);

    const handleOptionClick = (option) => {
        console.log(option);
        setMenuVisible(false);
    };

    return (
        <div className="h-screen bg-[#007074]">
            <div className="flex justify-between items-center p-6">
                <h2 className="text-3xl font-bold text-white">Your Tasks</h2>
                <div className="relative">
                    <img
                        src="https://media.lordicon.com/icons/wired/lineal/44-avatar-user-in-circle.svg"
                        alt="Avatar"
                        className="w-12 h-12 rounded-full cursor-pointer"
                        onClick={toggleMenu}
                    />
                    {menuVisible && (
                        <div className="absolute top-16 right-0 bg-white text-[#007074] rounded-lg shadow-lg w-40">
                            <ul className="py-2">
                                <li
                                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                    onClick={() => handleOptionClick("Mi perfil")}
                                >
                                    Mi perfil
                                </li>
                                <li
                                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                    onClick={() => navigate("/login")}
                                >
                                    Cerrar sesión
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            {!loading && !error && tasks.length > 0 && <Filters filters={filters} setFilters={setFilters} fetchFilteredTasks={fetchFilteredTasks} />}
            {tasks.length > 0 && (
                <div className="flex justify-end px-27 mb-4">
                    <CreateTaskButton refreshTasks={fetchTasks} />
                </div>
            )}

            <div className="flex justify-center flex-wrap gap-4 px-6">
                {loading ? (
                    <Loader />
                ) : error ? (
                    <GenericError errorMessage="Ha ocurrido un error al cargar las tareas" />
                ) : tasks.length === 0 ? (
                    <Empty refreshTasks={fetchTasks} />
                ) : (
                    tasks.map((task) => <TaskCard key={task._id} task={task} refreshTasks={fetchTasks} />)
                )}
            </div>
        </div>
    );
};

export default Home;
