const express = require("express")
const router = express.Router()

const { ReadingList } = require("../models")
const tokenExtractor = require("../middleware/tokenExtractor")


router.post("/", async (req, res) => {
  const readingList = await ReadingList.create({
    'userId': req.body.user_id,
    'blogId': req.body.blog_id
  })
  return res.json(readingList)
})

router.put("/:id", tokenExtractor, async (req, res) => {
  const readingListEntry = await ReadingList.findByPk(req.params.id)

  if (readingListEntry) {
    if (readingListEntry.userId !== req.decodedToken.id) {
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