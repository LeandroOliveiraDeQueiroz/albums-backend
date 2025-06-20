import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import albumRoutes from './routes/albumRoutes';
import photoRoutes from './routes/photoRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const PORT = '3000';

//TODO create .env
app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
);

app.use(express.json({ limit: '10mb' }));

app.use('/users', userRoutes);
app.use('/albums', albumRoutes);
app.use('/photos', photoRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
