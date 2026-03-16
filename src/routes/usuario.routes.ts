import { Router } from 'express'
import UsuarioController from '../controllers/usuario.controller'

const usuarioRouter = Router()

usuarioRouter.get('/', UsuarioController.findAll)
usuarioRouter.get('/:id', UsuarioController.getById)
usuarioRouter.post('/', UsuarioController.create)
usuarioRouter.put('/:id', UsuarioController.update)
usuarioRouter.delete('/:id', UsuarioController.remove)

export default usuarioRouter