import UserController from '../controllers/UserController.js'
import express from "express";

const router = express();

router.get('/',UserController.getAllUser)
router.post('/login',UserController.login)
router.post('/register',UserController.register)

export default router;