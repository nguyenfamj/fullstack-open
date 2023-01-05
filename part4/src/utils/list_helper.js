const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sumReducer = (accumulator, currentValue) => accumulator + currentValue

  return blogs.map((blog) => blog.likes).reduce(sumReducer)
}

const favoriteBlog = (blogs) => {
  const reducer = (accumulator, currentValue) =>
    accumulator.likes > currentValue.likes ? accumulator : currentValue

  const mostLikedBlog = blogs.reduce(reducer)

  return { title: mostLikedBlog.title, author: mostLikedBlog.author, likes: mostLikedBlog.likes }
}

const mostBlog = (blogs) => {
  const authorWithMostBlog = _.maxBy(Object.entries(_.groupBy(blogs, 'author')), '[1].length')

  return { author: authorWithMostBlog[0], blogs: authorWithMostBlog[1].length }
}

const mostLikes = (blogs) => {
  const authorWithMostLikes = _.maxBy(Object.entries(_.groupBy(blogs, 'author')), (obj) => {
    return _.sumBy(obj[1], 'likes')
  })

  return { author: authorWithMostLikes[0], likes: _.sumBy(authorWithMostLikes[1], 'likes') }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlog, mostLikes }
