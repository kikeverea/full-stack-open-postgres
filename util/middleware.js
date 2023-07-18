const { decode } = require('./webToken')
const {Blog, User} = require("../models");

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = decode(authorization.substring(7))
    }
    catch {
      return res.status(401).json({ error: 'invalid token' })
    }
  }
  else {
    return res.status(401).json({ error: 'token missing' })
  }

  next()
}

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

const userFinder = async (req, res, next) => {
  req.user = await User.findOne({
    where: { username: req.params.username }
  })

  next()
}

const errorHandler = (error, req, res, next) => {
  res
    .status(500)
    .json({ error: error.message })
}

module.exports = {
  tokenExtractor,
  blogFinder,
  userFinder,
  errorHandler
}