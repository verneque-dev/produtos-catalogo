import LoginModel from "../models/loginModel.js"
import jwt from "jsonwebtoken"


export default function LoginController (req, res) {
  try {
    const { username, password } = req.body

    if (!LoginModel(username, password)) {
      return res.status(401).json({ erro: "Login inválido" })
    }

    const token = jwt.sign({ user: username }, process.env.JWT_SECRET, { expiresIn: "30d" })
  
    res.status(200).json({ token })
  } 
  catch (error) {
    res.status(500).json({ erro: "Erro interno no servidor" })
    console.log(error)
  }
}