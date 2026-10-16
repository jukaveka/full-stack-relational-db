const express = require("express")
const router = express.Router()

const { User, Blog } = require("../models")

const { generateHash } = require("../util/hash")

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: {
        exclude: ["userId"]
      }
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
  const where = {}

  if (req.query.read && ["true", "false"].includes(req.query.read)) {
    where.read = req.query.read
  }

  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ["id", "passwordHash", "createdAt", "updatedAt"] },
    include: [
      {
        model: Blog,
        as: "readings",
        attributes: { exclude: ["userId", "createdAt", "updatedAt"] },
        through: { attributes: ["read", "id"], where},
      }
    ],
  })
  return res.json(user)
})

module.exports = router
