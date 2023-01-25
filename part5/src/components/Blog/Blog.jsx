import React from 'react'
import { useState } from 'react'
import './Blog.css'
import blogService from '../../services/blogs'

const Blog = ({ blog }) => {
  const [blogState, setBlogState] = useState({
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
  })
  const [isOpen, setIsOpen] = useState(false)

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
        {blogState.title} <button onClick={toggleView}>{isOpen ? 'hide' : 'view'}</button>
      </div>
      {isOpen && (
        <>
          <div>
            {blogState.likes} likes
            <button onClick={updateLikes}>like</button>
          </div>
          <div>{blogState.url}</div>
          <div>{blogState.author}</div>
          <button onClick={deleteBlog}>Delete</button>
        </>
      )}
    </div>
  )
}

export default Blog
