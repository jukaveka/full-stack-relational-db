const express = require("express")
const router = express.Router()

const sessionChecker = require("../middleware/sessionChecker")
const { Session } = require("../models")

router.delete("/", sessionChecker, async (req, res) => {
  const session = await Session.findOne({ where: { token: req.session.token, active: true }})

  session.active = false
  await session.save()
  return res.status(204).end()
})

module.exports = router