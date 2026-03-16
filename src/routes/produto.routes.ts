import { Router } from 'express'
import ProdutoController from '../controllers/produto.controller'

const produtoRouter = Router()

produtoRouter.get('/', ProdutoController.findAll)
produtoRouter.get('/:id', ProdutoController.getById)
produtoRouter.post('/', ProdutoController.create)
produtoRouter.put('/:id', ProdutoController.update)
produtoRouter.delete('/:id', ProdutoController.remove)

export default produtoRouter