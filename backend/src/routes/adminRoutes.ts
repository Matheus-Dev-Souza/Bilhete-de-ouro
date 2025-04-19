import { Router } from 'express';

const adminRouter = Router();

// Exemplo de rota: obter status da API
adminRouter.get('/status', (req, res) => {
  res.json({ message: 'Painel administrativo funcionando ✅' });
});

// Adicione outras rotas administrativas aqui (ex: ver RTP geral, gerenciar usuários/parceiros, etc.)

export { adminRouter };
