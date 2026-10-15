const { DataTypes } = require('sequelize')

migration = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('reading_lists', 'created_at', {
      type: DataTypes.DATE
    })
    await queryInterface.addColumn('reading_lists', 'updated_at', {
      type: DataTypes.DATE
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('reading_lists', 'created_at')
    await queryInterface.removeColumn('reading_lists', 'updated_at')
  },
}

module.exports = migration