import { Router } from 'express'
import AdministradorController from '../controllers/administrador.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const administradorRouter = Router()

administradorRouter.post('/', AdministradorController.create)
administradorRouter.get('/', authMiddleware, AdministradorController.findAll)
administradorRouter.get('/:id', authMiddleware, AdministradorController.getById)
administradorRouter.put('/:id', authMiddleware, AdministradorController.update)
administradorRouter.delete('/:id', authMiddleware, AdministradorController.remove)

export default administradorRouter