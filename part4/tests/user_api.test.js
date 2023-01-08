const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../src/models/User')

const bcrypt = require('bcrypt')

const api = supertest(app)

describe('one initial user in database', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const hashedPassword = await bcrypt.hash('secretpassword', 10)
    const initialUser = new User({ username: 'root', passwordHash: hashedPassword })

    await initialUser.save()
  })

  test('create new user', async () => {
    const initialUsersResponse = await api.get('/api/users')

    const newUser = {
      username: 'nguyenfamj',
      name: 'Nguyen Pham',
      password: 'newpassword',
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const finalUsersResponse = await api.get('/api/users')

    expect(finalUsersResponse.body).toHaveLength(initialUsersResponse.body.length + 1)

    const usernames = finalUsersResponse.body.map((user) => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('user with short username', async () => {
    const newUser = {
      username: 'ng',
      name: 'Nguyen Pham',
      password: 'newpassword',
    }

    const createResponse = await api.post('/api/users').send(newUser)
    console.log(createResponse.body)

    expect(createResponse.statusCode).toEqual(400)
  })

  test('user with short password', async () => {
    const newUser = {
      username: 'nguyenfamj1',
      name: 'Nguyen Pham',
      password: 'ne',
    }

    const createResponse = await api.post('/api/users').send(newUser)
    console.log(createResponse.body)

    expect(createResponse.statusCode).toEqual(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
