import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { connectDB } from './data/db.js';

import gameRoutes from './routes/gameRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import partnerRoutes from './routes/partnerRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/game', gameRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/partner', partnerRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
