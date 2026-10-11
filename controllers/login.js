const express = require("express")
const router = express.Router()

const jwt = require("jsonwebtoken")

const { User } = require("../models")
const { verifyAgainstHash } = require("../util/hash")
const { SECRET } = require("../util/config")


router.post("/", async (req, res) => {
  const user = await User.findOne({ where: { username: req.body.username }})

  if (!user) {
    return res.status(401).json({ error: "invalid user or password" })
  }

  const correctPassword = await verifyAgainstHash(req.body.password, user.passwordHash)

  if (!correctPassword) {
    return res.status(401).json({ error: "invalid user or password" })
  }

  const userToken = {
    username: user.username,
    id: user.id
  }

  const token = jwt.sign(userToken, SECRET)

  return res.status(200).send({ token, username: user.username, name: user.username})
})


module.exports = router