import cors from "cors";
import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './config/mongo';
import attendanceRoute from './routes/attendace';
import employeeRoutes from './routes/employee';
import taksRoutes from './routes/taskRoute';
import userRoutes from './routes/userRoute';
const app = express();
dotenv.config();
const PORT = process.env.PORT

app.use(express.json());
connectDB()
const allowedOrigins = ["https://parlour-dashboard-delta.vercel.app","http://localhost:3000" 
  ,"https://parlour-dashboard-git-main-thashreefs-projects-29de65dc.vercel.app/"];
app.use(
  cors({
    origin: allowedOrigins,
  })
);


// Registering routes;
app.use('/api/user', userRoutes);
app.use('/api/task',taksRoutes);
app.use('/api/attendance',attendanceRoute);
app.use('/api/employee',employeeRoutes)

//base route;
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`App connected on PORT ${PORT}`);
});