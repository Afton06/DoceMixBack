import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import prisma from '../prisma'
import { validarEmail, validarCPF, validarSenha } from '../utils/validacoes'

class AdministradorController {
    static async findAll(req: Request, res: Response) {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        const skip = (page - 1) * limit

        const [administradores, total] = await Promise.all([
            prisma.administrador.findMany({
                skip,
                take: limit,
                select: { id: true, nome: true, email: true, cpf: true, createdAt: true }
            }),
            prisma.administrador.count()
        ])

        return res.status(200).json({
            dados: administradores,
            total,
            pagina: page,
            totalPaginas: Math.ceil(total / limit)
        })
    }

    static async getById(req: Request, res: Response) {
        const id = String(req.params.id)
        const administrador = await prisma.administrador.findUnique({
            where: { id },
            select: { id: true, nome: true, email: true, cpf: true, createdAt: true }
        })

        if (!administrador) {
            return res.status(404).json({ message: 'Administrador não encontrado' })
        }

        return res.status(200).json(administrador)
    }

    static async create(req: Request, res: Response) {
        const { nome, email, senha, cpf } = req.body

        if (!nome || nome === '') {
            return res.status(400).json({ message: 'Nome é obrigatório' })
        }

        if (!email || email === '') {
            return res.status(400).json({ message: 'Email é obrigatório' })
        }

        if (!validarEmail(email)) {
            return res.status(400).json({ message: 'Email inválido' })
        }

        if (!senha || senha === '') {
            return res.status(400).json({ message: 'Senha é obrigatória' })
        }

        if (!validarSenha(senha)) {
            return res.status(400).json({ message: 'Senha deve ter no mínimo 8 caracteres, letra maiúscula, minúscula, número e caractere especial' })
        }

        if (!cpf || cpf === '') {
            return res.status(400).json({ message: 'CPF é obrigatório' })
        }

        if (!validarCPF(cpf)) {
            return res.status(400).json({ message: 'CPF inválido' })
        }

        const emailExiste = await prisma.administrador.findUnique({ where: { email } })
        if (emailExiste) {
            return res.status(400).json({ message: 'Email já cadastrado' })
        }

        const cpfExiste = await prisma.administrador.findUnique({ where: { cpf } })
        if (cpfExiste) {
            return res.status(400).json({ message: 'CPF já cadastrado' })
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const administrador = await prisma.administrador.create({
            data: { nome, email, senha: senhaCriptografada, cpf }
        })

        return res.status(201).json({
            id: administrador.id,
            nome: administrador.nome,
            email: administrador.email,
            cpf: administrador.cpf,
            createdAt: administrador.createdAt
        })
    }

    static async update(req: Request, res: Response) {
        const id = String(req.params.id)
        const { nome, senha, cpf } = req.body

        const administrador = await prisma.administrador.findUnique({ where: { id } })

        if (!administrador) {
            return res.status(404).json({ message: 'Administrador não encontrado' })
        }

        if (cpf && !validarCPF(cpf)) {
            return res.status(400).json({ message: 'CPF inválido' })
        }

        if (senha && !validarSenha(senha)) {
            return res.status(400).json({ message: 'Senha deve ter no mínimo 8 caracteres, letra maiúscula, minúscula, número e caractere especial' })
        }

        const senhaCriptografada = senha
            ? await bcrypt.hash(senha, 10)
            : administrador.senha

        const atualizado = await prisma.administrador.update({
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

        const administrador = await prisma.administrador.findUnique({ where: { id } })

        if (!administrador) {
            return res.status(404).json({ message: 'Administrador não encontrado' })
        }

        await prisma.administrador.delete({ where: { id } })

        return res.status(204).send()
    }
}

export default AdministradorController