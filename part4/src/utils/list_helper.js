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

  return blogs.reduce(reducer)
}

module.exports = { dummy, totalLikes, favoriteBlog }
