// src/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { gameRouter } from './routes/gameRoutes';
import { adminRouter } from './routes/adminRoutes';
import { partnerRouter } from './routes/partnerRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/game', gameRouter);       // Jogador
app.use('/api/admin', adminRouter);     // Dono da API
app.use('/api/partner', partnerRouter); // Donos dos iframes

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`🎰 API Slot Game rodando em http://localhost:${PORT}`);
});
