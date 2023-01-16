import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import { login } from './services/auth'
import Notification from './components/Notification/Notification'

const App = () => {
  // State
  const [blogs, setBlogs] = useState({
    data: [],
    input: { title: '', author: '', url: '' },
    refetch: false,
  })

  const [user, setUser] = useState({
    input: { username: '', password: '' },
    info: { appToken: '', id: '', name: '', username: '' },
  })

  const [messageBox, setMessageBox] = useState({ message: null, success: true })
  console.log(messageBox)
  // Effect
  useEffect(() => {
    blogService.getAll().then((fetchedBlogs) => setBlogs({ ...blogs, data: fetchedBlogs }))
  }, [blogs.refetch])

  useEffect(() => {
    try {
      const persistedUser = window.localStorage.getItem('loggedUser')

      setUser({ ...user, info: JSON.parse(persistedUser) })
    } catch (error) {
      console.error(error)
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setMessageBox({ message: null, success: true })
    }, 2000)
  }, [messageBox.message])

  // Event handler
  const handleMessageDelay = (message, success) => {
    setTimeout(() => {
      setMessageBox({ message, success })
    }, 500)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    // Perform login logic here
    try {
      const responseData = await login(user.input)
      window.localStorage.setItem('loggedUser', JSON.stringify(responseData))
      setUser({ ...user, info: responseData })

      handleMessageDelay(`Logged in successfully`, true)
    } catch (error) {
      handleMessageDelay(error.response.data.error, false)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    setUser({ ...user, info: { appToken: '', id: '', name: '', username: '' } })
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    try {
      const responseData = await blogService.createNew({
        data: blogs.input,
        token: user.info.appToken,
      })

      if (responseData) {
        setBlogs({ ...blogs, refetch: !blogs.refetch })
      }

      handleMessageDelay(`New blog "${responseData.title} by ${responseData.author} added"`, true)
      console.log(messageBox)
    } catch (error) {
      handleMessageDelay(error.response.data, false)
    }
  }

  if (!user.info?.username) {
    return (
      <div>
        <h2>Login to the application</h2>
        <Notification {...messageBox} />
        <form>
          <label>
            Username:
            <input
              type='text'
              value={user.input.username}
              onChange={(event) =>
                setUser({ input: { ...user.input, username: event.target.value } })
              }
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type='password'
              value={user.input.password}
              onChange={(event) =>
                setUser({ input: { ...user.input, password: event.target.value } })
              }
            />
          </label>
          <br />
          <button onClick={handleSubmit}>Login</button>
        </form>
      </div>
    )
  }

  return (
    <>
      <div>
        <h2>blogs</h2>

        <Notification {...messageBox} />

        <div style={{ display: 'flex', marginBottom: 20 }}>
          <div>{user.info.name} logged in</div>
          <button onClick={handleLogout}>logout</button>
        </div>

        <div>
          <h2>create new</h2>
          <form>
            <label>
              title:
              <input
                type='text'
                value={blogs.input.title}
                onChange={(event) =>
                  setBlogs({ ...blogs, input: { ...blogs.input, title: event.target.value } })
                }
              />
            </label>
            <br />
            <label>
              author:
              <input
                type='text'
                value={blogs.input.author}
                onChange={(event) =>
                  setBlogs({ ...blogs, input: { ...blogs.input, author: event.target.value } })
                }
              />
            </label>
            <br />
            <label>
              url:
              <input
                type='text'
                value={blogs.input.url}
                onChange={(event) =>
                  setBlogs({ ...blogs, input: { ...blogs.input, url: event.target.value } })
                }
              />
            </label>
            <br />
            <button onClick={handleCreateBlog}>Create</button>
          </form>
        </div>

        <br />

        {blogs.data.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  )
}

export default App
