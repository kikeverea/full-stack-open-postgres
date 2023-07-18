const router = require('express').Router()
const { User, Blog } = require('../models')
const bcrypt = require('bcrypt')
const { userFinder } = require('../util/middleware')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: {
        exclude: ['userId']
      }
    }
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  const { name, username, password } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = await User.create({ name, username, passwordHash })

  res.status(201).json({ name: user.name, username: user.username })
})

router.put('/:username', userFinder, async (req, res) => {
  const user = req.user

  if (!user)
    return res.sendStatus(404)

  const newUsername = req.body.username

  if (user.username !== newUsername) {
    user.username = newUsername
    await user.save()
  }

  res.sendStatus(204)
})

router.delete('/:id', userFinder, async (req, res) => {
  const user = req.user

  if (!user)
    return res.sendStatus(404)

  await user.destroy()

  res.sendStatus(204)
})

module.exports = router