export default function login(name, password) {
  if (name !== process.env.USER || password !== process.env.PASSWORD) return false
  
  return true
}