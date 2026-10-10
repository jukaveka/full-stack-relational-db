const bcrypt = require("bcrypt")

const generateHash = async (value) => {
  return await bcrypt.hash(value, 10)
}

module.exports = {
  generateHash
}