const router = require('express').Router()
const { Blog, User } = require('../models')
const { tokenExtractor, blogFinder } = require('../util/middleware')
const { Op } = require('sequelize')

router.get('/', async (req, res) => {
  const where =
    req.query.search
      ?
        {
          [Op.or]: [
            {
              title: { [Op.iLike]: `%${req.query.search}%` }
            },
            {
              author: { [Op.iLike]: `%${req.query.search}%`}
            }
          ]
        }
      : {}

  const blogs = await Blog.findAll({
    include: {
      model: User,
      attributes: {
        exclude: ['id', 'passwordHash', 'createdAt', 'updatedAt']
      }
    },
    where,
    order: [
      ['likes', 'DESC']
    ]
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findOne({ where: { id: req.decodedToken.id }} )
  const blog = await Blog.create({ ...req.body, userId: user.id })
  res.status(201).json(blog)
})

router.put('/:id', blogFinder, async (req, res) => {
  const blog = req.blog

  if (!blog)
    return res.sendStatus(404)

  const likes = parseInt(req.body.likes)

  if (blog.likes !== likes) {
    blog.likes = likes
    await blog.save()
  }

  res.sendStatus(204)
})

router.delete('/:id', [blogFinder, tokenExtractor], async (req, res) => {
  const user = await User.findOne({ where: { id: req.decodedToken.id }} )
  const blog = req.blog

  if (!blog)
    return res.sendStatus(404)

  if (blog.userId !== user.id)
    return res.status(401).json({
      error: 'User not authorized to delete this blog'
    })

  await blog.destroy()

  res.sendStatus(204)
})

module.exports = router