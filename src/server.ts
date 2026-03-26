import express from 'express'
import categoriaRouter from './routes/categoria.routes'
import produtoRouter from './routes/produto.routes'
import usuarioRouter from './routes/usuario.routes'

const app = express()
const PORT = 3000

app.use(express.json())

app.use('/categorias', categoriaRouter)
app.use('/produtos', produtoRouter)
app.use('/usuarios', usuarioRouter)

app.listen(PORT, () => {
  console.log(`Servidor da Estação do Forno rodando na porta ${PORT}`)
})