import ProdutosModel from "../models/produtosModel.js"

async function getProdutosController(req, res) {
  try {
    const { name } = req.query
    let rows

    if(name) {
      rows = await ProdutosModel.getProdutosByName(name)
    }
    else {
      rows = await ProdutosModel.getProdutos()
    }

    if (rows.length === 0) {
      return res.status(404).json({ erro: "Produto não encontrado" })
    }

    res.status(200).json(rows)
  }
  catch (error) {
    res.status(500).json({ erro: "Erro interno no servidor" })
    console.log(error)
  }
}

async function getProdutosByIdController(req, res) {
  try {
    const { id } = req.params

    if (isNaN(Number(id))) {
      return res.status(400).json({ erro: "Dados invalidos" })
    }
    const row = await ProdutosModel.getProdutoById(id)
    if (!row) {
      return res.status(404).json({ erro: "Produto não encontrado" })
    }

    res.status(200).json(row)
  }
  catch (error) {
    res.status(500).json({ erro: "Erro interno no servidor" })
    console.log(error)
  }
}

async function createProdutoController(req, res) {
  try {
    const { name, description, value } = req.body

    const price = Number(value.replace(",", "."))

    if (name.trim() === "" || isNaN(Number(price))) {
      return res.status(400).json({ erro: "Dados invalidos" })
    }

    const result = await ProdutosModel.createProduto(name, description, price)

    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: "Nenhuma linha afetada" })
    }

    res.status(201).json({
      message: "Produto criado com sucesso",
      id: result.insertId
    })
  }
  catch (error) {
    res.status(500).json({ erro: "Erro interno no servidor" })
    console.log(error)
  }
}

async function deleteProdutoController(req, res) {
  try {
    const { id } = req.params
    if (isNaN(Number(id))) {
      return res.status(400).json({ erro: "Dados invalidos" })
    }
    const result = await ProdutosModel.deleteProduto(id)
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: "Produto não encontrado" })
    }
    res.status(200).json({ message: "Produto deletado com sucesso" })
  }
  catch (error) {
    res.status(500).json({ erro: "Erro interno no servidor" })
    console.log(error)
  }
}

async function updateProdutoController(req, res) {
  try {
    const { id } = req.params
    const { name, description, value } = req.body
    
    const price = Number(value.replace(",", "."))

    if (name.trim() === "" || isNaN(price) || isNaN(Number(id))) {
      return res.status(400).json({ erro: "Dados invalidos" })
    }
    
    const result = await ProdutosModel.updateProduto(id, name, description, price)

    if (result.affectedRows === 0) {
      return res.status(500).json({ erro: "Produto não encontrado" })
    }

    res.status(200).json({ message: "Produto atualizado com sucesso" })
  } 
  catch (error) {
    res.status(500).json({ erro: "Erro interno no servidor" })
    console.log(error)
  }
}

export default {
  getProdutosController,
  getProdutosByIdController,
  createProdutoController,
  deleteProdutoController,
  updateProdutoController
}