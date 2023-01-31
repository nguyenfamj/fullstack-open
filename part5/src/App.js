import { useState, useEffect } from 'react'
import Blog from './components/Blog/Blog'
import blogService from './services/blogs'
import { login } from './services/auth'
import Notification from './components/Notification/Notification'
import CreateBlogForm from './components/CreateBlogForm/CreateBlogForm'
import Togglable from './components/Togglable/Togglable'
import axios from 'axios'

const App = () => {
  // State
  const [blogs, setBlogs] = useState({
    data: [],
    // input: { title: '', author: '', url: '' },
    refetch: false,
  })

  const [user, setUser] = useState({
    input: { username: '', password: '' },
    info: { appToken: '', id: '', name: '', username: '' },
  })
  console.log(user)

  const [messageBox, setMessageBox] = useState({ message: null, success: true })

  // Effect
  useEffect(() => {
    blogService.getAll().then((fetchedBlogs) => setBlogs({ ...blogs, data: fetchedBlogs }))
  }, [blogs.refetch])

  useEffect(() => {
    try {
      const persistedUser = JSON.parse(window.localStorage.getItem('loggedUser'))
      axios.defaults.headers.common['Authorization'] = `Bearer ${persistedUser.appToken}`

      setUser({ ...user, info: persistedUser })
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

  // const handleCreateBlog = async (event) => {
  //   event.preventDefault()
  //   try {
  //     const responseData = await blogService.createNew({
  //       data: blogs.input,
  //       token: user.info.appToken,
  //     })

  //     if (responseData) {
  //       setBlogs({ ...blogs, refetch: !blogs.refetch })
  //     }

  //     handleMessageDelay(`New blog "${responseData.title} by ${responseData.author} added"`, true)
  //     console.log(messageBox)
  //   } catch (error) {
  //     handleMessageDelay(error.response.data, false)
  //   }
  // }

  // Helper
  const refetchBlogs = () => {
    setBlogs({ ...blogs, refetch: !blogs.refetch })
  }

  if (!user.info?.username) {
    return (
      <div>
        <h2>blogs</h2>
        <h2>Login to the application</h2>
        <Notification {...messageBox} />
        <form>
          <label>
            Username:
            <input
              id='username'
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
              id='password'
              type='password'
              value={user.input.password}
              onChange={(event) =>
                setUser({ input: { ...user.input, password: event.target.value } })
              }
            />
          </label>
          <br />
          <button id='login-button' onClick={handleSubmit}>
            Login
          </button>
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
        <Togglable buttonLabel='Create New Blog'>
          <CreateBlogForm
            token={user.info.appToken}
            refetchBlogs={refetchBlogs}
            handleMessageDelay={handleMessageDelay}
          />
        </Togglable>

        <br />

        {blogs.data
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} userId={user.info.id} />
          ))}
      </div>
    </>
  )
}

export default App
