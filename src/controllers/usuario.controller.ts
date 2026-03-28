import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import prisma from '../prisma'

class UsuarioController {
  static async findAll(req: Request, res: Response) {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    const [usuarios, total] = await Promise.all([
      prisma.usuario.findMany({
        skip,
        take: limit,
        select: { id: true, nome: true, email: true, cpf: true, createdAt: true }
      }),
      prisma.usuario.count()
    ])

    return res.status(200).json({
      dados: usuarios,
      total,
      pagina: page,
      totalPaginas: Math.ceil(total / limit)
    })
  }

  static async getById(req: Request, res: Response) {
    const id = String(req.params.id)
    const usuario = await prisma.usuario.findUnique({
      where: { id },
      select: { id: true, nome: true, email: true, cpf: true, createdAt: true }
    })

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' })
    }

    return res.status(200).json(usuario)
  }

  static async create(req: Request, res: Response) {
    const { nome, email, senha, cpf } = req.body

    if (!nome || nome === '') {
      return res.status(400).json({ message: 'Nome é obrigatório' })
    }

    if (!email || email === '') {
      return res.status(400).json({ message: 'Email é obrigatório' })
    }

    if (!senha || senha === '') {
      return res.status(400).json({ message: 'Senha é obrigatória' })
    }

    if (!cpf || cpf === '') {
      return res.status(400).json({ message: 'CPF é obrigatório' })
    }

    const emailExiste = await prisma.usuario.findUnique({ where: { email } })
    if (emailExiste) {
      return res.status(400).json({ message: 'Email já cadastrado' })
    }

    const cpfExiste = await prisma.usuario.findUnique({ where: { cpf } })
    if (cpfExiste) {
      return res.status(400).json({ message: 'CPF já cadastrado' })
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10)

    const usuario = await prisma.usuario.create({
      data: { nome, email, senha: senhaCriptografada, cpf }
    })

    return res.status(201).json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      cpf: usuario.cpf,
      createdAt: usuario.createdAt
    })
  }

  static async update(req: Request, res: Response) {
    const id = String(req.params.id)
    const { nome, senha, cpf } = req.body

    const usuario = await prisma.usuario.findUnique({ where: { id } })

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' })
    }

    const senhaCriptografada = senha
      ? await bcrypt.hash(senha, 10)
      : usuario.senha

    const atualizado = await prisma.usuario.update({
      where: { id },
      data: { nome, senha: senhaCriptografada, cpf }
    })

    return res.status(200).json({
      id: atualizado.id,
      nome: atualizado.nome,
      email: atualizado.email,
      cpf: atualizado.cpf,
      updatedAt: atualizado.updatedAt
    })
  }

  static async remove(req: Request, res: Response) {
    const id = String(req.params.id)

    const usuario = await prisma.usuario.findUnique({ where: { id } })

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' })
    }

    await prisma.usuario.delete({ where: { id } })

    return res.status(204).send()
  }
}

export default UsuarioController