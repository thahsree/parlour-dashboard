import express from 'express';
import { createUser, getUser } from '../controller/userController';

const router = express.Router();

router.get('/', getUser); // will handle GET /api/user
router.post('/signup',createUser)

export default router;