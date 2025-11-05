import express from "express"
import { produtosRoutes } from "./routes/produtosRoutes.js"
import { loginRoutes } from "./routes/loginRoutes.js"
import env from "dotenv"
env.config()

const app = express()

app.use(express.json())
app.use(express.static("public"))
app.use("/produtos", produtosRoutes)
app.use("/login", loginRoutes)

app.listen(process.env.PORT, () => {
  console.log(`servidor rodando na porta ${process.env.PORT}`)
})
