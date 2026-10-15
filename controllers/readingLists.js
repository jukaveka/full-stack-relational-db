const express = require("express")
const router = express.Router()

const { ReadingList } = require("../models")


router.post("/", async (req, res) => {
  const readingList = await ReadingList.create({
    'userId': req.body.user_id,
    'blogId': req.body.blog_id
  })
  return res.json(readingList)
})

module.exports = router