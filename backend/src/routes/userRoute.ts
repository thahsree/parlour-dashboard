import express from 'express';
import { createUser, deleteUser, editUser, getUser } from '../controller/userController';

const router = express.Router();

router.get('/', getUser); // will handle GET /api/user
router.post('/signup',createUser)
router.patch('/update-user/:id',editUser);
router.delete('/delete-user/:id', deleteUser)

export default router;