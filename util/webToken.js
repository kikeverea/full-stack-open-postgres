const jwt = require('jsonwebtoken')
const { TOKEN_SECRET } = require('../util/config')

const userForToken = (user) => {
  return {
    username: user.username,
    id: user.id
  }
}

const tokenize = user => {
  const forToken = userForToken(user)
  return jwt.sign(forToken, TOKEN_SECRET)
}

const decode = token => {
  return jwt.verify(token, TOKEN_SECRET)
}

module.exports = {
  tokenize, decode
}