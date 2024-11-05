

# Documentação Técnica do Projeto "Cadastro de Usuários"

## Sumário
- [Descrição do Projeto](#descrição-do-projeto)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Instalação](#instalação)
- [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
- [Endpoints da API](#endpoints-da-api)
- [Execução de Testes](#execução-de-testes)
- [Autenticação e Segurança](#autenticação-e-segurança)
- [Considerações Finais](#considerações-finais)

## Descrição do Projeto
Este projeto é uma API RESTful para um sistema de cadastro de usuários com operações de CRUD. Ele foi desenvolvido em Node.js utilizando Express, Sequelize para persistência de dados, e JWT para autenticação.

## Estrutura do Projeto
```
projeto-cadastro-usuarios/
├── config/
│   └── database.js
├── controllers/
│   ├── authController.js
│   └── userController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   └── User.js
├── routes/
│   └── userRoutes.js
├── .env
├── app.js
├── package.json
└── testRequests.js
```

## Configuração do Ambiente
Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente conforme as credenciais do banco de dados e da aplicação:
```env
DB_NAME=u866210236_projeto
DB_USER=u866210236_adminprojeto
DB_PASSWORD=P@ssw0rd@2024%pedro
DB_HOST=45.152.46.204
PORT=3000
JWT_SECRET=sua_chave_secreta
```

## Instalação
1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd projeto-cadastro-usuarios
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

## Configuração do Banco de Dados
Certifique-se de que o banco de dados MySQL está configurado com as credenciais do arquivo `.env`. Utilize o script `database.js` para gerenciar a conexão.

### Sincronização do Banco de Dados
O Sequelize está configurado para sincronizar o banco de dados na inicialização do projeto.
```javascript
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database connected and tables synchronized');
  })
  .catch(err => console.error('Error connecting to the database', err));
```

## Endpoints da API
### 1. Registro de Usuário
**POST** `/api/users/register`

**Body**:
```json
{
  "cpf": "134265776541",
  "nome": "Paulo Souza Almeida",
  "dataNascimento": "1993-04-10",
  "endereco": {
    "rua": "Avenida Teste Nova",
    "numero": "10",
    "complemento": "Sala 1",
    "bairro": "Bairro Central",
    "cidade": "Rio de Janeiro",
    "estado": "RJ",
    "cep": "22000-000"
  },
  "password": "senhaForte123",
  "createdBy": "admin_teste"
}
```

### 2. Login de Usuário
**POST** `/api/users/login`

**Body**:
```json
{
  "cpf": "134265776541",
  "password": "senhaForte123"
}
```

**Resposta**:
```json
{
  "message": "Login successful",
  "token": "seu_token_jwt"
}
```

### 3. Buscar Usuário por ID
**GET** `/api/users/:id`

**Headers**:
```
Authorization: Bearer <seu_token_jwt>
```

### 4. Atualizar Usuário
**PUT** `/api/users/:id`

**Headers**:
```
Authorization: Bearer <seu_token_jwt>
```

**Body**:
```json
{
  "nome": "Paulo Souza Almeida Atualizado",
  "dataNascimento": "1993-04-15",
  "endereco": {
    "rua": "Rua Atualizada",
    "numero": "55",
    "complemento": "Sala 2",
    "bairro": "Bairro Atualizado",
    "cidade": "Niterói",
    "estado": "RJ",
    "cep": "24000-000"
  },
  "updatedBy": "editor_teste"
}
```

### 5. Remover Usuário
**DELETE** `/api/users/:id`

**Headers**:
```
Authorization: Bearer <seu_token_jwt>
```

**Body**:
```json
{
  "removedBy": "admin_teste"
}
```

## Execução de Testes
O arquivo `testRequests.js` contém scripts para testar as funcionalidades da API. Execute o arquivo com:
```bash
node testRequests.js
```

## Autenticação e Segurança
A autenticação é feita usando JWT (JSON Web Token). O middleware `authMiddleware.js` é responsável por proteger as rotas, verificando a presença e a validade do token.

### Middleware de Autenticação
```javascript
module.exports = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }

    req.userId = decoded.id;
    next();
  });
};
```

## Considerações Finais
- **Segurança**: Certifique-se de usar um JWT_SECRET forte e armazenar as senhas de forma segura usando hashing com `bcrypt`.
- **Melhorias Futuras**: Implementar mais testes automatizados e um sistema de validação de dados mais robusto.
- **Escalabilidade**: O projeto está estruturado para fácil adição de novos recursos e funcionalidades.
