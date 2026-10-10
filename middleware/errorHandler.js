const errorHandler = (error, req, res, next) => {
  console.log("Error message:", error.message)
  console.log("Error name:", error.name)

  if (error.name === "SequelizeValidationError") {
    return res.status(400).send({ error: error.message })
  }

  next(error)
}

module.exports = errorHandler