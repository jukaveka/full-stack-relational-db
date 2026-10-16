const { DataTypes } = require('sequelize')

migration = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.removeConstraint('reading_lists', 'reading_lists_blog_id_fkey')
    await queryInterface.removeConstraint('reading_lists', 'reading_lists_user_id_fkey')

    await queryInterface.changeColumn('reading_lists', 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
      onDelete: "CASCADE"
    })

    await queryInterface.changeColumn('reading_lists', 'blog_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "blogs", key: "id" },
      onDelete: "CASCADE"
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeConstraint('reading_lists', 'reading_lists_blog_id_fkey')
    await queryInterface.removeConstraint('reading_lists', 'reading_lists_user_id_fkey')

    await queryInterface.addConstraint('reading_lists', {
      fields: ["blog_id"],
      type: "FOREIGN KEY",
      name: 'reading_lists_blog_id_fkey',
      references: { table: "blogs", field: "id" }
    })

    await queryInterface.addConstraint('reading_lists', {
      fields: ["user_id"],
      type: "FOREIGN KEY",
      name: 'reading_lists_user_id_fkey',
      references: { table: "users", field: "id" }
    })

    await queryInterface.changeColumn('reading_lists', 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
    })

    await queryInterface.changeColumn('reading_lists', 'blog_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
    })
  },
}

module.exports = migration