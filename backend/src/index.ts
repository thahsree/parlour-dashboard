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

// Registering routes;
app.use('/api/user', userRoutes);
app.use('/api/task',taksRoutes);
app.use('/api/attendace',attendanceRoute);
app.use('/api/employee',employeeRoutes)

//base route;
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`App connected on PORT ${PORT}`);
});