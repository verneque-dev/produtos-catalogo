import { pool } from "../db/db.js"

async function getProdutos() {
  const [rows] = await pool.execute("SELECT * FROM tb_produtos")

  return rows
}

async function getProdutoById(id) {
  const [row] = await pool.execute("SELECT * FROM tb_produtos WHERE tb_produtos_id = ?", [id])

  return row[0]
}

async function createProduto(name, desc, value) {
  const [result] = await pool.execute("INSERT INTO tb_produtos (tb_produtos_nome, tb_produtos_desc, tb_produtos_valor) VALUES (?, ?, ?)", [name, desc, value])

  return result
}

async function deleteProduto(id) {
  const [result] = await pool.execute("DELETE FROM tb_produtos WHERE tb_produtos_id = ?", [id])

  return result
}

async function updateProduto(id, name, desc, value) {
  const [result] = await pool.execute("UPDATE tb_produtos SET tb_produtos_nome = ?, tb_produtos_desc = ?, tb_produtos_valor = ? WHERE tb_produtos_id = ?", [name, desc, value, id])

  return result
}

async function getProdutosByName(name) {
  const [rows] = await pool.execute("SELECT * FROM tb_produtos WHERE tb_produtos_nome LIKE ?", [`%${name}%`])

  return rows
}

export default {
  createProduto,
  deleteProduto,
  getProdutoById,
  getProdutos,
  updateProduto,
  getProdutosByName
}