const express = require("express")
const router = express.Router()

const { Blog } = require("../models")
const { sequelize } = require("../util/db")


router.get("/", async (req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      "author", 
      [sequelize.fn("COUNT", sequelize.col("id")), "blogs"],
      [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
    ],
    group: "author",
    order: [
      ["likes", "DESC"]
    ]
  })

  return res.json(authors)
})


module.exports = router