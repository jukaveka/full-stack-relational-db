const express = require("express")
const router = express.Router()

const { ReadingList } = require("../models")
const sessionChecker = require("../middleware/sessionChecker")


router.post("/", async (req, res) => {
  const readingListEntry = await ReadingList.create({
    'userId': req.body.userId,
    'blogId': req.body.blogId
  })

  return res.json(readingListEntry)
})

router.put("/:id", sessionChecker, async (req, res) => {
  const readingListEntry = await ReadingList.findByPk(req.params.id)

  if (readingListEntry) {
    if (readingListEntry.userId !== req.session.userId) {
      return res.status(401).end()
    }

    readingListEntry.read = req.body.read
    readingListEntry.save()
    return res.json(readingListEntry)
  } else {
    return res.status(404).end()
  }
})

module.exports = router