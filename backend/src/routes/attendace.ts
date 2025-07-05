import express from 'express';
import { addAttendance, getAllAttendance } from '../controller/attendanceController';

const router = express.Router()

router.get('/',getAllAttendance);
router.post('/add-attendance',addAttendance);



export default router;