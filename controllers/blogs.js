const router = require('express').Router()
const { Blog } = require('../models')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

router.post('/', async (req, res) => {
  const blog = await Blog.create(req.body)
  res.status(201).json(blog)
})

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const blog = await Blog.findOne({ where: { id } })

  if (!blog)
    return res.sendStatus(404)

  await blog.destroy()

  res.sendStatus(204)
})

module.exports = router