import { Router } from 'express'
import ProdutoController from '../controllers/produto.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const produtoRouter = Router()

produtoRouter.get('/', authMiddleware, ProdutoController.findAll)
produtoRouter.get('/:id', authMiddleware, ProdutoController.getById)
produtoRouter.post('/', authMiddleware, ProdutoController.create)
produtoRouter.put('/:id', authMiddleware, ProdutoController.update)
produtoRouter.delete('/:id', authMiddleware, ProdutoController.remove)

export default produtoRouter