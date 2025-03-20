import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Empty from "../components/Empty";
import Loader from "../components/Loader";
import GenericError from "../components/Genericerror";
import TaskCard from "../components/TaskCard";
import Filters from "../components/filters/Filters";

const Home = () => {
    const navigate = useNavigate();
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => setMenuVisible(!menuVisible);

    const handleOptionClick = (option) => {
        console.log(option);
        setMenuVisible(false); // Oculta el menú después de hacer clic
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
                        onClick={toggleMenu} // Muestra/oculta el menú
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
            {/* <Empty/> */}
            {/* <Loader/> */}
            {/* <GenericError errorMessage="Ha ocurrido un error al cargar las tareas" /> */}
            <Filters />
            <div className="flex justify-center flex-wrap gap-4 px-6">
                <TaskCard />
                <TaskCard />
                <TaskCard />
                <TaskCard />
            </div>
        </div>
    );
};

export default Home;
