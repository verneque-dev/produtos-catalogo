import express from "express"
import LoginController from "../controllers/loginController.js"

const loginRoutes = express.Router()

loginRoutes.post("/", LoginController)

export { loginRoutes }