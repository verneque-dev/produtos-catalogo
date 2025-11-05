CREATE DATABASE db_estoque_produtos;
USE db_estoque_produtos;

CREATE TABLE tb_produtos (
	tb_produtos_id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    tb_produtos_nome VARCHAR(50) NOT NULL,
	tb_produtos_desc VARCHAR(200),
    tb_produtos_valor DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);