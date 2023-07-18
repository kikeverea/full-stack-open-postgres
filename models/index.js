const Blog = require('../models/blog')

Blog.sync()

module.exports = {
  Blog
}
