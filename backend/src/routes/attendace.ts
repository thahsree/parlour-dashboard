import express from 'express';
import { addAttendance, getAllAttendance } from '../controller/attendanceController';
import { verifyToken } from '../middleware/verifyJWT';
import { verifyRoles } from '../middleware/verifyRoles';

const router = express.Router()

// Roles = SuperAdmin:5555 , Admin:4444
router.get('/',verifyToken,verifyRoles(5555,4444),getAllAttendance);
router.post('/add-attendance',addAttendance);



export default router;