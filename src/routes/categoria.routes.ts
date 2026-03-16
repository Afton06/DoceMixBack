import { Router } from 'express'
import CategoriaController from '../controllers/categoria.controller'

const categoriaRouter = Router()

categoriaRouter.get('/', CategoriaController.findAll)
categoriaRouter.get('/:id', CategoriaController.getById)
categoriaRouter.post('/', CategoriaController.create)
categoriaRouter.put('/:id', CategoriaController.update)
categoriaRouter.delete('/:id', CategoriaController.remove)

export default categoriaRouter