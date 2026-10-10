const express = require("express")
const router = express.Router()

const { User, Blog } = require("../models")

const { generateHash } = require("../util/hash")

router.get("/", async (req, res) => {
  const users = await User.findAll({
    attributes: {
      exclude: ["userId"]
    },
    include: {
      model: Blog
    }
  })

  return res.json(users)
})

router.post("/", async (req, res) => {
  const { username, name, password } = req.body
  const passwordHash = await generateHash(password)

  const user = await User.create({ 
    username,
    name,
    passwordHash
  })

  return res.json(user)
})

router.put("/:username", async (req, res) => {
  const user = await User.findOne({
    where: { 
      username: req.params.username 
    }
  })

  user.name = req.body.name
  await user.save()

  return res.json(user)
})

router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id)
  return res.json(user)
})

module.exports = router
