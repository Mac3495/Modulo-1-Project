const express = require("express");
const taskController = require("../controllers/task.controller");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new task
router.post("/", authMiddleware, taskController.createTask);
router.get("/", authMiddleware, taskController.getUserTasks);
router.get("/:taskId", authMiddleware, taskController.getTaskById);
router.put('/:taskId', authMiddleware, taskController.updateTask);
router.delete('/:taskId', authMiddleware, taskController.deleteTask);

module.exports = router;