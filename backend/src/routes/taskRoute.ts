import express from 'express';
import { createTask, deleteTask, getTasks, updateTask } from '../controller/taskController';

const router = express();

router.get('/',getTasks)
router.post('/create-task',createTask)
router.patch('/update-task/:id',updateTask)
router.delete('/delete-task/:id',deleteTask);
export default router;