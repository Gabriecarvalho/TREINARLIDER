import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import trainingRoutes from './routes/trainingRoutes';
import emailRoutes from './routes/emailRoutes';

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use('/api/users', userRoutes);
app.use('/api', trainingRoutes);
app.use('/api/email', emailRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});