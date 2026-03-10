import express from 'express'

const app = express()
const PORT = 3000

// Permite o servidor entender JSON
app.use(express.json())

// Rota de teste — só para confirmar que está funcionando
app.get('/', (req, res) => {
  res.json({ mensagem: 'Servidor Doce Mix funcionando! 🍬' })
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})