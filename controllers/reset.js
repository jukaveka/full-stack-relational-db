const express = require("express")
const router = express.Router()

const { User, Blog, Session, ReadingList } = require("../models")


router.post("/", async (req, res) => {
  try {
    await ReadingList.destroy({ truncate: { cascade: true } })
    await Blog.destroy({ truncate: { cascade: true } })
    await Session.destroy({ truncate: { cascade: true } })
    await User.destroy({ truncate: { cascade: true } })
    return res.status(204).end()
  } catch (error) {
    console.log(error)
    return res.status(400).send({ error: error.message })
  }
})


module.exports = router