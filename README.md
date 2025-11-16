# Catalogo de Produtos
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/devsuperior/sds1-wmazoni/blob/master/LICENSE) 

# Sobre o projeto

https://produtos-catalogo.up.railway.app/

Um sistema de catálogo de produtos com CRUD completo, painel administrativo simples e autenticação via JWT para acesso às rotas privadas.
O back-end foi construído em Node.js + Express usando padrão MVC, integrado a um banco MySQL.
O front-end é estático e servido pela própria API.

## Layout web
<img width="1365" height="634" alt="image" src="https://github.com/user-attachments/assets/7e1d7e99-fb5e-4188-a2cc-9eb2591bfe3d" />

# Tecnologias utilizadas
## Back end
- Node.js
- Express
- JWT

## Front end
- HTML / CSS / JS
  
## Implantação em produção
- Back end + Front end: Railway
- Banco de dados: MySQL

# Como executar o projeto

## Back end + Front end

```bash
# clonar repositório
git clone https://github.com/verneque-dev/produtos-catalogo

# instalar dependências
npm install

# configure o .env usando o .env.example como base

# iniciar o servidor
npm start

# por padrão, roda na porta definida no .env
```

## O sistema usa MySQL - script para criação do Banco localmente

```sql
CREATE DATABASE db_catalogo_produtos;
USE db_catalogo_produtos;
CREATE TABLE tb_produtos (
  tb_produtos_id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
  tb_produtos_nome VARCHAR(50) NOT NULL,
  tb_produtos_desc VARCHAR(200),
  tb_produtos_valor DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

Obs:
O username e password do admin estão nas variaveis ambientes portanto devem ser definidos no .env

# Rotas Principais

## Produtos
- GET /produtos listar
- POST /produtos criar
- PUT /produtos/:id editar
- DELETE /produtos/:id excluir

(As rotas POST/PUT/DELETE exigem JWT.)

## Login
 - POST /login (retorna token JWT)

# Autor

Vitor Henrique Verneque Silva

https://www.linkedin.com/in/vitor-verneque
