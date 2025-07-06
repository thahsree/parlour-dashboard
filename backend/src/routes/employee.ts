import express from 'express';
import { createEmployee, deleteEmployee, getEmployees, updateEmployee } from '../controller/employeeController';
import { verifyToken } from '../middleware/verifyJWT';
import { verifyRoles } from '../middleware/verifyRoles';

const router = express.Router();


// Roles = SuperAdmin:5555 , Admin:4444

router.get('/',getEmployees); // will handle GET /api/user
router.post('/create-employee',verifyToken,verifyRoles(5555),createEmployee)
router.patch('/update-employee/:id',verifyToken,verifyRoles(5555),updateEmployee);
router.delete('/delete-employee/:id',verifyToken,verifyRoles(5555), deleteEmployee);

export default router;