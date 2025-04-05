import TaskController from '../controllers/TaskController.js'
import express from "express";

const router = express();

router.get('/',TaskController.getAllTask)
router.post('/create',TaskController.createTask)
router.get('/user',TaskController.getAllUserTask)
router.put('/update/:taskId',TaskController.updateTask)
router.put('/status/:taskId',TaskController.updateStatusTask)
router.delete('/delete/:taskId',TaskController.deleteTask)

export default router;