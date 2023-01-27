import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlogForm from './CreateBlogForm'

test('Test the createBlogForm event', async () => {
  const handleCreateBlogTest = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<CreateBlogForm handleCreateBlogTest={handleCreateBlogTest} />)

  const titleInput = screen.getByRole('textbox')
  const createButton = container.querySelector('.create-button')

  await user.click(createButton)
  await user.type(titleInput, 'testing a form...')

  expect(handleCreateBlogTest.mock.calls).toHaveLength(1)
})
