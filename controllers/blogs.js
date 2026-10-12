const express = require('express')
const router = express.Router()

const { Blog, User } = require('../models')
const tokenExtractor = require('../middleware/tokenExtractor')
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
    where
  });

  return res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findOne({ where: { username: req.decodedToken.username }})
  const blog = await Blog.create({...req.body, "userId": user.id})
  return res.json(blog)
})

router.delete('/:id', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.findByPk(req.params.id)

  if (user.id !== blog.userId) {
    return res.status(401).end()
  }

  if (blog) {
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