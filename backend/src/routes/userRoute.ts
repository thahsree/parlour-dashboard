import express from 'express';
import { getUser } from '../controller/userController';

const router = express.Router();

router.get('/', getUser); // will handle GET /api/user

export default router;