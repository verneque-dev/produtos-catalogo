Catálogo de Produtos

Um sistema de catálogo de produtos com CRUD completo, painel administrativo simples e autenticação via JWT para acesso às rotas privadas.
O back-end foi construído em Node.js + Express usando padrão MVC, integrado a um banco MySQL.
O front-end é estático e servido pela própria API.

📸 Screenshot da Home

(adicione sua imagem aqui)

![Home](./screens/home.png)

✅ Funcionalidades

Listar produtos

Criar produtos

Editar produtos

Excluir produtos

Login exclusivo de administrador

Geração e validação de JWT

Rotas protegidas por middleware

Front-end estático integrado

Deploy completo no Railway

🏗️ Tecnologias Utilizadas

Node.js

Express

MySQL

JWT (jsonwebtoken)

dotenv

Railway (deploy)

📁 Estrutura de Pastas
src/
  db/
  controllers/
  models/
  routes/
  app.js
  middleware.js

public/              # front-end estático
.env.example
package.json

🔐 Autenticação

Após o login do administrador, um token JWT é retornado.

Para acessar rotas protegidas, envie no header:

Authorization: Bearer <token_aqui>

🗄️ Banco de Dados

O sistema usa MySQL.
Segue o script mínimo para criar a tabela principal:

CREATE TABLE tb_produtos (
  tb_produtos_id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
  tb_produtos_nome VARCHAR(50) NOT NULL,
  tb_produtos_desc VARCHAR(200),
  tb_produtos_valor DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


Obs:
O username e password do admin estão nas variáveis de ambiente.
Eles devem ser definidos no .env.

▶️ Como Rodar Localmente

Clone o repositório:

git clone https://github.com/verneque-dev/produtos-catalogo.git


Instale as dependências:

npm install


Configure o .env usando o .env.example como base.

Inicie o servidor:

npm start


A API roda na porta definida no .env.

🚀 Deploy

O projeto está hospedado no Railway:

🔗 https://produtos-catalogo.up.railway.app/

📌 Rotas Principais
Produtos

GET /produtos listar

POST /produtos criar

PUT /produtos/:id editar

DELETE /produtos/:id excluir
(As rotas POST/PUT/DELETE exigem JWT.)

Login

POST /login retorna token JWT

🎯 Próximas Evoluções

Paginação

Upload real de imagens

Painel administrativo mais completo

Relações mais complexas (categorias, usuários, estoque real)

Testes automatizados
