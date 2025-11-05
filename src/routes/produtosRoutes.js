import express from "express"
import ProdutosController from "../controllers/produtosController.js"
import { middleWareAuth } from "../middleware.js"

const produtosRoutes = express.Router()

produtosRoutes.get("/", ProdutosController.getProdutosController)
produtosRoutes.get("/:id", ProdutosController.getProdutosByIdController)
produtosRoutes.post("/", middleWareAuth,ProdutosController.createProdutoController)
produtosRoutes.delete("/:id", middleWareAuth, ProdutosController.deleteProdutoController)
produtosRoutes.put("/:id", middleWareAuth,ProdutosController.updateProdutoController)

export { produtosRoutes }