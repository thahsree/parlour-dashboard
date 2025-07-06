import express from 'express';
import {
    addAttendance,
    getAllAttendance,
} from '../controller/attendanceController';
import { verifyToken } from '../middleware/verifyJWT';
import { verifyRoles } from '../middleware/verifyRoles';

const router = express.Router();

// Example roles: SuperAdmin = 5555, Admin = 4444
router.post(
  '/',
  verifyToken,
  verifyRoles(5555,4444), // Only SuperAdmin can access
  getAllAttendance
);

// Optionally protect add-attendance as well if needed
router.post(
  '/add-attendance',
  verifyToken, // optional: protect this too
  addAttendance
);

export default router;
