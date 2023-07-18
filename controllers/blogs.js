const router = require('express').Router()
const { Blog, User } = require('../models')
const { tokenExtractor, blogFinder } = require('../util/middleware')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findOne({ where: { id: req.decodedToken.id }} )
  // Exercise 13.10: link logged-in user to new blogs: already implemented
  const blog = await Blog.create({ ...req.body, userId: user.id })
  res.status(201).json(blog)
})

router.put('/:id', blogFinder, async (req, res) => {
  const blog = req.blog

  if (!blog)
    res.sendStatus(404)

  const likes = parseInt(req.body.likes)

  if (blog.likes !== likes) {
    blog.likes = likes
    await blog.save()
  }

  res.sendStatus(204)
})

router.delete('/:id', blogFinder, async (req, res) => {
  const blog = req.blog

  if (!blog)
    res.sendStatus(404)

  await blog.destroy()

  res.sendStatus(204)
})

module.exports = router