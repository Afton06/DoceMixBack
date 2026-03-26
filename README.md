# 🍞 Estação do Forno | API

<p align="center">
<img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" />
<img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" />
<img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" />
</p>

## Status: 🛠️ Em desenvolvimento

API REST do e-commerce Estação do Forno. Desenvolvida com Node.js e TypeScript, gerencia o banco de dados e as regras de negócio da loja.

## 🛠️ Tecnologias

- **Node.js** + **TypeScript**
- **Express** — framework HTTP
- **PostgreSQL** — banco de dados
- **Prisma** — ORM para comunicação com o banco

## 📁 Estrutura
```
src/
├── controllers/   ← lógica de cada recurso
├── routes/        ← endereços da API
├── middlewares/   ← autenticação JWT
├── services/      ← regras de negócio
├── repositories/  ← acesso ao banco
└── types/         ← tipos globais TypeScript
```

## 🚀 Como rodar localmente

### 1. Clonar o repositório
```bash
git clone https://github.com/Afton06/EstacaoDoFornoBack.git
cd EstacaoDoFornoBack
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar o banco de dados
Crie um arquivo `.env` na raiz com:
```
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/estacao_do_forno_db"
```
Substitua `SUA_SENHA` pela senha local do PostgreSQL.

### 4. Criar as tabelas
```bash
npx prisma db push
```

### 5. Gerar o Prisma Client
```bash
npx prisma generate
```

### 6. Rodar o servidor
```bash
npx ts-node src/server.ts
```

O servidor estará disponível em `http://localhost:3000`

## 📡 Rotas disponíveis

### Categorias
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /categorias | Lista todas |
| GET | /categorias/:id | Busca uma |
| POST | /categorias | Cria nova |
| PUT | /categorias/:id | Edita |
| DELETE | /categorias/:id | Deleta |

### Produtos
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /produtos | Lista todos |
| GET | /produtos/:id | Busca um |
| POST | /produtos | Cria novo |
| PUT | /produtos/:id | Edita |
| DELETE | /produtos/:id | Deleta |

### Usuários
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /usuarios | Lista todos |
| GET | /usuarios/:id | Busca um |
| POST | /usuarios | Cadastra |
| PUT | /usuarios/:id | Edita |
| DELETE | /usuarios/:id | Deleta |