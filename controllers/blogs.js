const router = require('express').Router()
const { Blog } = require('../models')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', async (req, res) => {
  const blog = await Blog.create(req.body)
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