import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
    const { signup, login } = useAuth();
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await signup(userName, email, password);
        if (response === 'success') {
            const response = await login(email, password);
            if (response === 'success') {
                navigate("/home")
            } else {
                alert(response)
            }
        } else {
            alert(response)
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-[#007074]">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-6 text-[#1A1A19]">
                    YourTasks App
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-[#1A1A19] font-medium">Nombre de usuario</label>
                        <input
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-lg mt-1"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-[#1A1A19] font-medium">Correo</label>
                        <input
                            type="email"
                            className="w-full p-2 border border-gray-300 rounded-lg mt-1"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-[#1A1A19] font-medium">Contraseña</label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded-lg mt-1"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#FFB433] text-white py-2 rounded-lg font-bold hover:bg-[#e09e2c] transition"
                    >
                        Registrar
                    </button>
                    <button
                        type="button"
                        className="w-full text-[#007074] underline mt-4"
                        onClick={() => navigate("/")}
                    >
                        Iniciar sesión
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
