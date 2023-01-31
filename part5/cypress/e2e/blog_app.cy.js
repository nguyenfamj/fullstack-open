/// <reference types="cypress" />

describe('Blog', function () {
  it('front page can be opened', function () {
    cy.visit('http://localhost:3000')
    cy.contains('blogs')
  })
})

describe('Blog app', async () => {
  beforeEach(() => {
    cy.request({
      method: 'POST',
      url: 'http://localhost:3003/api/testing/reset',
      failOnStatusCode: false,
    })
    const user = {
      username: 'nguyenfamj',
      name: 'Nguyen',
      password: 'newpassword',
    }

    const user2 = {
      username: 'nguyenfamj2',
      name: 'Nguyen',
      password: 'newpassword',
    }

    cy.request({
      method: 'POST',
      url: 'http://localhost:3003/api/users',
      body: user2,
      failOnStatusCode: false,
    })
    cy.request({
      method: 'POST',
      url: 'http://localhost:3003/api/users',
      body: user,
      failOnStatusCode: false,
    }).then((response) => {
      localStorage.setItem('appUser', JSON.stringify(response.body))
      cy.visit('http://localhost:3000')
    })
  })

  describe('Login', async () => {
    it('Correct credentials', function () {
      cy.get('#username').type('nguyenfamj')
      cy.get('#password').type('newpassword')
      cy.get('#login-button').click()
      cy.contains('Nguyen logged in')
    })

    it('Wrong credentials', function () {
      cy.get('#username').type('nguyenfamj1')
      cy.get('#password').type('newpassword')
      cy.get('#login-button').click()
      cy.contains('Login to the application')
    })
  })

  describe('when logged in and blog created', function () {
    beforeEach(function () {
      cy.get('#username').type('nguyenfamj')
      cy.get('#password').type('newpassword')
      cy.get('#login-button').click()

      // Create blog
      cy.contains('Create New Blog').click()
      cy.get('#title-input').type('cypress title')
      cy.get('#author-input').type('cypress')
      cy.get('#url-input').type('cypress')
      cy.get('#create-blog-button').click()
    })
    it('Create new blog', function () {
      cy.get('.blog-container').contains('cypress title')
    })

    it('like a blog', () => {
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('1 likes')
    })

    it('delete a blog', () => {
      cy.contains('view').click()
      cy.get('#delete-blog-button').click()
    })

    it('other user logged in', () => {
      cy.contains('logout').click()
      cy.get('#username').clear().type('nguyenfamj2')
      cy.get('#password').clear().type('newpassword')
      cy.get('#login-button').click()
      cy.contains('view').click()
      cy.get('#delete-blog-button').should('not.exist')
    })

    it('compare likes', () => {
      // Create blog
      cy.get('#title-input').clear().type('cypress title 2')
      cy.get('#author-input').clear().type('cypress 2')
      cy.get('#url-input').clear().type('cypress 2')
      cy.get('#create-blog-button').click()
      cy.contains('cypress title 2').parent().contains('view').click()
      cy.contains('like').click()
    })
  })
})
