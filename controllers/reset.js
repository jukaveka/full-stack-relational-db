const express = require("express")
const router = express.Router()

const { User, Blog } = require("../models")


router.post("/", async (req, res) => {
  try {
    await Blog.destroy({ truncate: { cascade: true } })
    await User.destroy({ truncate: { cascade: true } })
    return res.status(204).end()
  } catch (error) {
    console.log(error)
    return res.status(400).send({ error: error.message })
  }
})


module.exports = router