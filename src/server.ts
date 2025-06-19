import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import albumRoutes from './routes/albumRoutes';
import photoRoutes from './routes/photoRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const PORT = '3000';

//TODO configure CORS accept correctly domains
app.use(
  cors({
    origin: '*',
  }),
);

app.use(express.json({ limit: '10mb' }));

app.get('/', (req, res) => {
  res.send('Hello World!');
  console.log('Response sent');
});
app.use('/users', userRoutes);
app.use('/albums', albumRoutes);
app.use('/photos', photoRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
