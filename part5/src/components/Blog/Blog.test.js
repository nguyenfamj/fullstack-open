import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content and check without clicking button', () => {
  const exampleBlog = {
    author: 'Edsger W. Dijkstra',
    id: '63bab48a1f23b6854a6daed5',
    likes: 6,
    title: 'Go To Statement Considered Harmful',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  }

  const { container, queryByText } = render(<Blog blog={exampleBlog} />)

  const title = container.querySelector('.title')
  expect(title).toHaveTextContent(exampleBlog.title)

  expect(queryByText(exampleBlog.author)).toBeNull()
  expect(queryByText(exampleBlog.url)).toBeNull()
})

test('renders content and check with button clicked', async () => {
  const exampleBlog = {
    author: 'Edsger W. Dijkstra',
    id: '63bab48a1f23b6854a6daed5',
    likes: 6,
    title: 'Go To Statement Considered Harmful',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  }

  const { container, queryByText } = render(<Blog blog={exampleBlog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(queryByText(exampleBlog.author)).toBeDefined()
  expect(queryByText(exampleBlog.url)).toBeDefined()
})

test('button clicked twice', async () => {
  const exampleBlog = {
    author: 'Edsger W. Dijkstra',
    id: '63bab48a1f23b6854a6daed5',
    likes: 6,
    title: 'Go To Statement Considered Harmful',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  }

  const mockHandler = jest.fn()

  const { container } = render(<Blog blog={exampleBlog} updateLikesTest={mockHandler} />)

  const user = userEvent.setup()
  const view = screen.getByText('view')
  await user.click(view)

  const likeButton = container.querySelector('.like-button')

  //   Click likeButton twice
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
