import { Request, Response } from 'express'
import prisma from '../prisma'

class CategoriaController {
  static async findAll(req: Request, res: Response) {
    const categorias = await prisma.categoria.findMany()
    return res.status(200).json(categorias)
  }

  static async getById(req: Request, res: Response) {
    const id = String(req.params.id)
    const categoria = await prisma.categoria.findUnique({ where: { id } })

    if (!categoria) {
      return res.status(404).json({ message: 'Categoria não encontrada' })
    }

    return res.status(200).json(categoria)
  }

  static async create(req: Request, res: Response) {
    const { descricao } = req.body

    if (!descricao || descricao === '') {
      return res.status(400).json({ message: 'Descrição é obrigatória' })
    }

    const categoria = await prisma.categoria.create({
      data: { descricao }
    })

    return res.status(201).json(categoria)
  }

  static async update(req: Request, res: Response) {
    const id = String(req.params.id)
    const { descricao, ativo } = req.body

    const categoria = await prisma.categoria.findUnique({ where: { id } })

    if (!categoria) {
      return res.status(404).json({ message: 'Categoria não encontrada' })
    }

    const atualizada = await prisma.categoria.update({
      where: { id },
      data: { descricao, ativo }
    })

    return res.status(200).json(atualizada)
  }

  static async remove(req: Request, res: Response) {
    const id = String(req.params.id)

    const categoria = await prisma.categoria.findUnique({ where: { id } })

    if (!categoria) {
      return res.status(404).json({ message: 'Categoria não encontrada' })
    }

    await prisma.categoria.delete({ where: { id } })

    return res.status(204).send()
  }
}

export default CategoriaController