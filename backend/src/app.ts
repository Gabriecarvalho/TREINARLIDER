import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use('/api/users', userRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});