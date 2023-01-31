import React from 'react'
import { useState } from 'react'
import './Blog.css'
import blogService from '../../services/blogs'

const Blog = ({ blog, userId }) => {
  const [blogState, setBlogState] = useState({
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
  })
  const [isOpen, setIsOpen] = useState(false)

  console.log(blog, userId)

  const toggleView = (event) => {
    event.preventDefault()
    setIsOpen(!isOpen)
  }
  // Event Handler
  const updateLikes = async () => {
    const data = await blogService.updateBlog({
      blogId: blog.id,
      data: {
        title: blogState.title,
        author: blogState.author,
        url: blogState.url,
        likes: blogState.likes + 1,
      },
    })
    setBlogState({ ...blogState, likes: data.likes })
  }

  const deleteBlog = async () => {
    const confirmation = window.confirm(`Remove blog ${blogState.title} by ${blogState.author}?`)

    if (confirmation) {
      const data = await blogService.deleteBlog({ blogId: blog.id })
      console.log(data)

      setBlogState(null)
    }
  }

  if (blogState === null) return <></>

  return (
    <div className='blog-container'>
      <div className='title'>
        {blogState.title}
        <button className='toggle-view' onClick={toggleView}>
          {isOpen ? 'hide' : 'view'}
        </button>
      </div>
      {isOpen && (
        <>
          <div>
            {blogState.likes} likes
            <button className='like-button' onClick={updateLikes}>
              like
            </button>
          </div>
          <div className='blog-url'>{blogState.url}</div>
          <div className='blog-author'>{blogState.author}</div>
          {blog.user.id === userId && (
            <button id='delete-blog-button' onClick={deleteBlog}>
              Delete
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default Blog
