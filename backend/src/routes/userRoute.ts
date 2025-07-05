import express from 'express';
import { createUser, deleteUser, editUser, getUser, login } from '../controller/userController';
import { verifyToken } from '../middleware/verifyJWT';
import { verifyRoles } from '../middleware/verifyRoles';

const router = express.Router();


// Roles = SuperAdmin:5555 , Admin:4444

router.get('/',verifyToken , verifyRoles(5555,4444), getUser); // will handle GET /api/user
router.post('/login',login);
router.post('/signup',createUser);
router.patch('/update-user/:id',verifyToken,verifyRoles(5555),editUser);
router.delete('/delete-user/:id',verifyToken,verifyRoles(5555), deleteUser);

export default router;