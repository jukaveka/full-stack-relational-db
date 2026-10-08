const express = require('express')
const router = express.Router()
const { Blog } = require('../models')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll();
  return res.json(blogs)
})

router.post('/', async (req, res) => {
  try {
    const blog = await Blog.create(req.body)
    return res.json(blog)
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    if (blog) {
      await blog.destroy()
    }
    return res.status(204).end()
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error })
  }
})

module.exports = router