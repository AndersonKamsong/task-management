import TaskController from '../controllers/TaskController.js'
import express from "express";
import { authenticate, authorizeRoles } from '../middleware/auth.middleware.js'
const router = express();

router.get('/', authenticate, authorizeRoles(["admin"]), TaskController.getAllTask)
router.post('/create', authenticate, TaskController.createTask)
router.get('/user', authenticate, TaskController.getAllUserTask)
router.put('/update/:taskId', authenticate, TaskController.updateTask)
router.put('/status/:taskId', authenticate, TaskController.updateStatusTask)
router.delete('/delete/:taskId', authenticate, TaskController.deleteTask)

export default router;