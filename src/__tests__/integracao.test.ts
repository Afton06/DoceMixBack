import request from 'supertest'
import app from '../app'

describe('Teste de integração - Categorias', () => {

  test('GET /categorias deve retornar 401 sem token', async () => {
    const result = await request(app).get('/categorias')
    expect(result.statusCode).toEqual(401)
  })

  test('POST /categorias sem token deve retornar 401', async () => {
    const result = await request(app).post('/categorias').send({ descricao: 'Teste' })
    expect(result.statusCode).toEqual(401)
  })

})

describe('Teste de integração - Usuários', () => {

  test('POST /usuarios com dados inválidos deve retornar 400', async () => {
    const result = await request(app).post('/usuarios').send({
      nome: 'Teste',
      email: 'emailinvalido',
      senha: '123',
      cpf: '11111111111'
    })
    expect(result.statusCode).toEqual(400)
  })

  test('POST /usuarios sem campos deve retornar 400', async () => {
    const result = await request(app).post('/usuarios').send({})
    expect(result.statusCode).toEqual(400)
  })

})

describe('Teste de integração - Auth', () => {

  test('POST /auth/login sem dados deve retornar 400', async () => {
    const result = await request(app).post('/auth/login').send({})
    expect(result.statusCode).toEqual(400)
  })

  test('POST /auth/login com email inválido deve retornar 400', async () => {
    const result = await request(app).post('/auth/login').send({
      email: 'emailinvalido',
      senha: 'Senha@123'
    })
    expect(result.statusCode).toEqual(400)
  })

  test('POST /auth/login com credenciais erradas deve retornar 401', async () => {
    const result = await request(app).post('/auth/login').send({
      email: 'naoexiste@email.com',
      senha: 'Senha@123'
    })
    expect(result.statusCode).toEqual(401)
  })

})