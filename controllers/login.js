const router = require('express').Router()
const bcrypt = require('bcrypt')
const { User } = require('../models')
const { tokenize } = require('../util/webToken')

router.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({
    where: { username: username }
  })

  const passwordCorrect =
    user &&
    user.passwordHash &&
    await bcrypt.compare(password, user.passwordHash)

  if (!passwordCorrect)
    return res.status(401).json({ error: 'invalid username or password' })

  const token = tokenize(user)

  res
    .status(200)
    .json({ token, username: user.username, name: user.name })
})

module.exports = router