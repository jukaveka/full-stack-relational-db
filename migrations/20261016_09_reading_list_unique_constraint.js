const { DataTypes } = require('sequelize')

migration = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addIndex('reading_lists', {
      fields: ["blog_id", "user_id"],
      unique: true,
      name: "blog_id_user_id_unique"
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeIndex('reading_lists', 'blog_id_user_id_unique')
  },
}

module.exports = migration