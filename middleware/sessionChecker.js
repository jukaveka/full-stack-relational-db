const { Session } = require('../models')

const sessionChecker = async (req, res, next) => {
  const authorization = req.get('authorization')
  const token = authorization.substring(7)

  if (!authorization) {
    return res.status(401).json({ error: 'token missing' })
  }

  const session = await Session.findOne({ where: { token: token, active: true }})

  if (session) {
    req.session = { userId: session.userId }
  } else {
    return res.status(401).json({ error: "token invalid" })
  }

  next()
}

module.exports = sessionChecker