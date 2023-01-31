import React, { useState } from 'react'
import blogService from '../../services/blogs'

const CreateBlogForm = ({ refetchBlogs, handleMessageDelay }) => {
  const [form, setForm] = useState({ title: '', author: '', url: '' })

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    try {
      const responseData = await blogService.createNew({
        data: form,
      })

      if (responseData) {
        refetchBlogs()
      }

      handleMessageDelay(`New blog "${responseData.title} by ${responseData.author} added"`, true)
    } catch (error) {
      handleMessageDelay(error.response.data, false)
    }
  }

  return (
    <div>
      <h2>create new</h2>
      <form>
        <label>
          title:
          <input
            id='title-input'
            type='text'
            value={form.title}
            onChange={(event) => setForm({ ...form, title: event.target.value })}
          />
        </label>
        <br />
        <label>
          author:
          <input
            id='author-input'
            type='text'
            value={form.author}
            onChange={(event) => setForm({ ...form, author: event.target.value })}
          />
        </label>
        <br />
        <label>
          url:
          <input
            id='url-input'
            type='text'
            value={form.url}
            onChange={(event) => setForm({ ...form, url: event.target.value })}
          />
        </label>
        <br />
        <button id='create-blog-button' onClick={handleCreateBlog}>
          Create
        </button>
      </form>
    </div>
  )
}

export default CreateBlogForm
