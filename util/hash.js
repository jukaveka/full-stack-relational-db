const bcrypt = require("bcrypt")

const generateHash = async (value) => {
  return await bcrypt.hash(value, 10)
}

const verifyAgainstHash = async (plainValue, hashedValue) => {
  return await bcrypt.compare(plainValue, hashedValue)
}

module.exports = {
  generateHash,
  verifyAgainstHash
}