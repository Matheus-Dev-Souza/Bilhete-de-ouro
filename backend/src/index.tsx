// src/index.ts
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { connectDB } from './data/db';
import gameRouter from './routes/gameRoutes';
import adminRouter from './routes/adminRoutes';
import partnerRouter from './routes/partnerRoutes';
import { errorHandler } from './middlewares/errorHandler';
import { swaggerSpec } from './utils/swagger';
import swaggerUi from 'swagger-ui-express';

// Configuração do Express
const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares Essenciais
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*'
}));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));

// Database
connectDB();

// Rotas
app.use('/api/v1/game', gameRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/partner', partnerRouter);

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Views
app.set('view engine', 'ejs');
app.set('views', './src/views');

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Error Handling
app.use(errorHandler);

// Inicialização
app.listen(PORT, () => {
  console.log(`
  🚀 Server running in ${process.env.NODE_ENV} mode
  🔗 Base URL: http://localhost:${PORT}
  📚 API Docs: http://localhost:${PORT}/api-docs
  `);
});