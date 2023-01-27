import React, { useState } from 'react'
import blogService from '../../services/blogs'

const CreateBlogForm = ({ refetchBlogs, handleMessageDelay, handleCreateBlogTest }) => {
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
            className='title-input'
            type='text'
            value={form.title}
            onChange={(event) => setForm({ ...form, title: event.target.value })}
          />
        </label>
        <br />
        <label>
          author:
          <input
            type='text'
            value={form.author}
            onChange={(event) => setForm({ ...form, author: event.target.value })}
          />
        </label>
        <br />
        <label>
          url:
          <input
            type='text'
            value={form.url}
            onChange={(event) => setForm({ ...form, url: event.target.value })}
          />
        </label>
        <br />
        <button className='create-button' onClick={handleCreateBlogTest}>
          Create
        </button>
      </form>
    </div>
  )
}

export default CreateBlogForm
