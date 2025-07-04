import express from 'express';
import userRoutes from './routes/userRoute'; // no .js extension needed in TS

const app = express();
const PORT = process.env.PORT || 5555;

app.use(express.json());

// Register route
app.use('/api/user', userRoutes);
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`App connected on PORT ${PORT}`);
});