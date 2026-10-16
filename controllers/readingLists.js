const express = require("express")
const router = express.Router()

const { ReadingList } = require("../models")
const sessionChecker = require("../middleware/sessionChecker")


router.post("/", async (req, res) => {
  const readingList = await ReadingList.create({
    'userId': req.body.user_id,
    'blogId': req.body.blog_id
  })
  return res.json(readingList)
})

router.put("/:id", sessionChecker, async (req, res) => {
  const readingListEntry = await ReadingList.findByPk(req.params.id)

  if (readingListEntry) {
    if (readingListEntry.userId !== req.session.userId) {
      return res.status(403).end()
    }

    readingListEntry.read = true
    readingListEntry.save()
    return res.json(readingListEntry)
  } else {
    return res.status(404).end()
  }
})

module.exports = router