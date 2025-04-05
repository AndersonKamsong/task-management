import UserController from '../controllers/UserController.js'
import express from "express";
import { authenticate,authorizeRoles } from '../middleware/auth.middleware.js'

const router = express();

router.get('/',authenticate,UserController.getAllUser)
router.post('/login',UserController.login)
router.post('/register',UserController.register)

export default router;