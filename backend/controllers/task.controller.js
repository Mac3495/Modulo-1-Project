const Task = require("../models/Task");

const createTask = async (req, res) => {
    try {
        // El user ID proviene del middleware de autenticación
        const { title, description, status, expireDate } = req.body;
        const userId = req.user.id; // El ID del usuario está disponible por el authMiddleware

        // Crear una nueva tarea
        const newTask = new Task({
            title,
            description,
            status,
            expireDate,
            user: userId, // Asignamos el ID del usuario al campo "user"
        });

        // Guardamos la tarea en la base de datos
        const savedTask = await newTask.save();

        // Enviar respuesta con la tarea guardada
        res.status(201).json(savedTask);
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Error creating task", error });
    }
};

// Obtener todas las tareas del usuario autenticado
const getUserTasks = async (req, res) => {
    try {
        const userId = req.user.id; // Obtenemos el id del usuario autenticado (proveniente del middleware)
        const { status, search , expireDate} = req.query; // Obtenemos los filtros 'status' y 'search' de la query

        // Creamos un objeto de filtro
        const query = { user: userId };

        // Si hay un filtro por status, lo agregamos al objeto de filtro
        if (status) {
            const validStatuses = ["pending", "in-progress", "completed"];
            if (!validStatuses.includes(status)) {
                return res.status(400).json({ message: 'Invalid status' });
            }
            query.status = status;
        }

        // Si hay un filtro de búsqueda, lo agregamos al objeto de filtro
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } }, // Búsqueda insensible a mayúsculas/minúsculas
                { description: { $regex: search, $options: "i" } }
            ];
        }

        if (expireDate) {
            const parsedDate = new Date(expireDate);
            if (isNaN(parsedDate.getTime())) {
                return res.status(400).json({ message: "Invalid date format. Use YYYY-MM-DD" });
            }
            query.expireDate = { $gte: parsedDate };
        }

        // Buscamos las tareas con los filtros especificados
        const tasks = await Task.find(query);
        // Enviamos las tareas
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Error fetching tasks' });
    }
};

const getTaskById = async (req, res) => {
    try {
        const { taskId } = req.params;
        const userId = req.user.id; // ID del usuario autenticado

        // Buscar la tarea por ID y asegurarse de que pertenece al usuario
        const task = await Task.findOne({ _id: taskId, user: userId });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(task);
    } catch (error) {
        console.error("Error fetching task by ID:", error);
        res.status(500).json({ message: "Error fetching task" });
    }
};

const updateTask = async (req, res) => {
    try {
        const userId = req.user.id; // Obtenemos el id del usuario autenticado
        const { taskId } = req.params; // Obtenemos el id de la tarea de los parámetros de la URL
        const { title, description, status } = req.body; // Obtenemos los datos a actualizar desde el cuerpo de la solicitud

        // Buscamos la tarea en la base de datos
        const task = await Task.findById(taskId);

        // Verificamos si la tarea existe
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Verificamos que el usuario autenticado sea el dueño de la tarea
        if (task.user.toString() !== userId) {
            return res.status(403).json({ message: 'You do not have permission to update this task' });
        }

        // Actualizamos la tarea con los nuevos valores
        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;

        // Guardamos la tarea actualizada
        await task.save();

        // Enviamos la tarea actualizada como respuesta
        res.status(200).json(task);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Error updating task' });
    }
};

const deleteTask = async (req, res) => {
    try {
        const userId = req.user.id; // Obtenemos el id del usuario autenticado
        const { taskId } = req.params; // Obtenemos el id de la tarea de los parámetros de la URL

        // Buscamos la tarea en la base de datos
        const task = await Task.findById(taskId);

        // Verificamos si la tarea existe
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        // Verificamos que el usuario autenticado sea el dueño de la tarea
        if (task.user.toString() !== userId) {
            return res.status(403).json({ message: 'You do not have permission to update this task' });
        }

        await Task.findByIdAndDelete(taskId); // Aquí se llama al método en el modelo, no en la instancia
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Error deleting task' });
    }
};

module.exports = { createTask, getUserTasks, getTaskById, updateTask, deleteTask };
