import express from 'express';
import { createTask, deleteTask, getTasks, updateTask } from '../controller/taskController';
import { verifyToken } from '../middleware/verifyJWT';
import { verifyRoles } from '../middleware/verifyRoles';

const router = express.Router();

//Roles 5555 = SuperAdmin  4444= Admin
router.get('/',verifyToken,verifyRoles(5555,4444),getTasks)
router.post('/create-task',verifyToken,verifyRoles(5555),createTask)
router.patch('/update-task/:id',verifyToken,verifyRoles(5555),updateTask)
router.delete('/delete-task/:id',verifyToken,verifyRoles(5555),deleteTask);
export default router;