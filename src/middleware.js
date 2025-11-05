import jwt from "jsonwebtoken"

export function middleWareAuth(req, res, next) {
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).json({ erro: "Token não fornecido" })
  }
  const token = authorization.split(" ")[1]
  if (!token) {
    return res.status(401).json({ erro: "Token invalido" })
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ erro: "Falha na autenticação, token expirado ou invalido" })
    }
    req.user = user
    next()
  })
}
