const router = require('express').Router()
const { Blog } = require('../models')
const { sequelize } = require('../util/db')

router.get('/', async (req, res) => {
  const authors = await
    Blog.findAll({
      group: 'author',
      attributes: [
        'author',
        [sequelize.fn('COUNT', sequelize.col('author')), 'blog_count'],
        [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
      ]
    })

  res.json(authors)
})

module.exports = router