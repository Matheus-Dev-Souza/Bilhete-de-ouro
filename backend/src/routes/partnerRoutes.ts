import { Router } from 'express';

const partnerRouter = Router();

// Exemplo de rota: obter dados do parceiro autenticado
partnerRouter.get('/me', (req, res) => {
  res.json({ message: 'Informações do parceiro carregadas com sucesso ✅' });
});

// Adicione outras rotas específicas para os donos de iframe/parceiros

export { partnerRouter };
