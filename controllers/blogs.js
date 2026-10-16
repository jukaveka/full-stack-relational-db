const express = require('express')
const router = express.Router()

const { Blog, User } = require('../models')
const sessionChecker = require('../middleware/sessionChecker')
const { Op } = require('sequelize')


router.get('/', async (req, res) => {
  where = {}

  if (req.query.search) {
    where = {
      [Op.or]: [
        { title: {
          [Op.iLike]: `%${req.query.search}%`
        }},
        { author: {
          [Op.iLike]: `%${req.query.search}%`
        }}
      ]
    }
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    },
    where,
    order: [["likes", "DESC"]]
  });

  return res.json(blogs)
})

router.post('/', sessionChecker, async (req, res) => {
  const blog = await Blog.create({...req.body, "userId": req.session.userId})
  return res.json(blog)
})

router.delete('/:id', sessionChecker, async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)

  if (blog) {
    if (req.session.userId !== blog.userId) {
      return res.status(403).end()
    }

    await blog.destroy()
  }

  return res.status(204).end()
})

router.put('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  blog.likes = req.body.likes
  await blog.save()
  return res.json(blog)
})

module.exports = router