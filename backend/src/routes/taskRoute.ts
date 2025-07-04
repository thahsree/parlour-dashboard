import express from 'express';
import { createTask, getTasks } from '../controller/taskController';

const router = express();

router.get('/',getTasks)
router.post('/create-task',createTask)

export default router;