import express from 'express'
import categoriaRouter from './routes/categoria.routes'
import produtoRouter from './routes/produto.routes'
import usuarioRouter from './routes/usuario.routes'
import authRouter from './routes/auth.routes'
import administradorRouter from './routes/administrador.routes'

const app = express()

app.use(express.json())

app.use('/categorias', categoriaRouter)
app.use('/produtos', produtoRouter)
app.use('/usuarios', usuarioRouter)
app.use('/auth', authRouter)
app.use('/administradores', administradorRouter)

export default app