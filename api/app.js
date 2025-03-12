import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv/config';
//import database
import { connectDB } from './config/db.js';
import router from './routes/routes.js';

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/API', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));