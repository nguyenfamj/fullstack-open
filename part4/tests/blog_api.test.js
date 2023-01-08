const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { deleteMany } = require('../src/models/Blog')
const Blog = require('../src/models/Blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('data deleted')

  for (let blog of initialBlogs) {
    let newBlog = new Blog(blog)
    await newBlog.save()
    console.log('saved')
  }

  console.log('Blogs saved in the database')
})

test('get all blogs', async () => {
  console.log('Started the test get all blogs')
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
  expect(response.status).toBe(200)
  expect(response.header['content-type']).toBe('application/json; charset=utf-8')
})

test('verify the unique identifier of blog post is id', async () => {
  const response = await api.get('/api/blogs')

  response.body.map((blog) => {
    expect(blog.id).toBeDefined()
  })
})

test('create new blog post', async () => {
  const exampleBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  }
  const response = await api.post('/api/blogs').send(exampleBlog)

  expect(response.status).toBe(200)
  expect(response.body.title).toEqual('Go To Statement Considered Harmful')

  const getResponse = await api.get('/api/blogs')
  expect(getResponse.body).toHaveLength(initialBlogs.length + 1)
})

test('verify the default value of likes property', async () => {
  const exampleBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  }
  const response = await api.post('/api/blogs').send(exampleBlog)

  expect(response.body.likes).toEqual(0)
})

test('in case either title or url is missing', async () => {
  const exampleBlog = {
    author: 'Edsger W. Dijkstra',
    likes: 17,
  }
  const response = await api.post('/api/blogs').send(exampleBlog)

  expect(response.statusCode).toEqual(400)
})

afterAll(() => {
  mongoose.connection.close()
})
