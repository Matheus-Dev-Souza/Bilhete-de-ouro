
# Bilhete de Ouro - Plataforma de Apostas Online

## Descrição do Projeto

**Bilhete de Ouro** é uma plataforma de apostas online desenvolvida para oferecer uma experiência envolvente e segura para jogadores e parceiros de negócios. A aplicação é projetada para ser utilizada em ambientes de jogos de azar, como slot machines, proporcionando aos usuários a possibilidade de apostar em uma variedade de jogos e acompanhar seus resultados em tempo real. A plataforma permite que os donos de iframe, parceiros da aplicação, integrem seus próprios jogos, monitorando o desempenho financeiro e a interação dos jogadores por meio de uma API robusta e recursos administrativos.

O sistema inclui funcionalidades como controle de saldo dos usuários, integração com parceiros para gestão de jogos, coleta de dados sobre o desempenho dos jogos (GGR - Gross Gaming Revenue), e mais. Além disso, a plataforma oferece uma interface de backend bem estruturada para facilitar o gerenciamento de usuários, jogadas e relatórios financeiros.

## Funcionalidades Principais

### Para Usuários:
- **Apostas em Jogos de Slot**: Os jogadores podem realizar apostas em jogos de slot, com a possibilidade de ganhar prêmios conforme o resultado das jogadas.
- **Saldo e Free Spins**: O sistema gerencia o saldo do jogador e oferece recursos de "free spins" (giros gratuitos) para aumentar a experiência de jogo.
- **RTP Dinâmico**: O retorno ao jogador (RTP) é calculado dinamicamente, ajustando-se de acordo com as condições do jogo e outros parâmetros definidos pela plataforma.

### Para Parceiros (Donos de Iframe):
- **Gerenciamento de Jogos e Parceiros**: Permite que os parceiros integrem seus próprios jogos na plataforma, definindo parâmetros como apostas mínimas e máximas.
- **Relatórios Financeiros**: Os parceiros podem acessar relatórios detalhados sobre as apostas realizadas, ganhos e o GGR gerado pelas jogadas.
- **Autenticação e Controle de Acesso**: A autenticação baseada em tokens garante que somente parceiros autorizados acessem as rotas e dados confidenciais da plataforma.

### Para Administradores:
- **Gestão de Usuários**: Ferramentas para gerenciar usuários, como verificar o saldo e o histórico de apostas.
- **Relatórios Financeiros Avançados**: Acesso a relatórios sobre o desempenho financeiro geral da plataforma, incluindo o total de apostas realizadas, o total de ganhos e o GGR.
- **Segurança**: Mecanismos de autenticação e autorização para garantir que apenas usuários e parceiros válidos acessem as áreas protegidas.

## Tecnologias Utilizadas

- **Backend**: Node.js com Express para a criação da API.
- **Banco de Dados**: MongoDB para armazenamento de dados de usuários, jogos e parceiros.
- **JWT**: Para autenticação segura de usuários e parceiros.
- **Mongoose**: ORM para facilitar a interação com o banco de dados MongoDB.
- **Docker**: Para containerização da aplicação e facilitar o deploy.
- **Bibliotecas e Frameworks**: `jsonwebtoken`, `bcryptjs`, `express`, entre outras dependências.
- **Testes**: Frameworks de testes como Mocha e Chai para garantir a estabilidade do código.

## Estrutura de Diretórios

```
/backend
├── /controllers     # Controladores para lidar com requisições HTTP
├── /middlewares     # Middleware de autenticação e autorização
├── /models          # Definições de modelos de dados com Mongoose
├── /routes          # Definição das rotas da API
├── /services        # Lógica de negócios, como spinService para jogos
├── /utils           # Funções utilitárias, como geradores de símbolos
├── /data            # Conexão com o banco de dados e arquivos de configuração
└── /config          # Arquivos de configuração do sistema
```

## Instalação

### Requisitos

- **Node.js**: 12.x ou superior
- **MongoDB**: Instância local ou MongoDB Atlas para banco de dados na nuvem
- **Docker** (opcional): Para rodar a aplicação em contêineres

### Passos para Configuração

1. Clone o repositório:

   ```bash
   git clone https://github.com/usuario/bilhete-de-ouro.git
   cd bilhete-de-ouro
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto e defina as variáveis de ambiente necessárias, como a URL do MongoDB e a chave secreta JWT:

   ```dotenv
   MONGO_URI=mongodb://localhost:27017/bilhete_de_ouro
   JWT_SECRET=seu_secreto
   ```

4. Para rodar a aplicação em modo de desenvolvimento, use:

   ```bash
   npm run dev
   ```

   Ou, para rodar em produção, use:

   ```bash
   npm run start
   ```

5. Se você preferir usar o Docker, basta construir e rodar os contêineres:

   ```bash
   docker-compose up --build
   ```

## Testes

1. Para rodar os testes, use o seguinte comando:

   ```bash
   npm run test
   ```

2. Os testes são escritos utilizando o framework Mocha e Chai, e são executados automaticamente durante o processo de CI/CD.

## Contribuição

Contribuições são bem-vindas! Para contribuir, por favor siga os seguintes passos:

1. Faça um fork do repositório
2. Crie uma branch para a sua feature (`git checkout -b feature/nome-da-feature`)
3. Faça o commit das suas mudanças (`git commit -m 'Add nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nome-da-feature`)
5. Abra um Pull Request explicando as mudanças feitas

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
