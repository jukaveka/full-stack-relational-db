const { DataTypes } = require('sequelize')

const timestamp_attributes = {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }

migration = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('users', 'created_at', timestamp_attributes)
    await queryInterface.addColumn('users', 'updated_at', timestamp_attributes)
    await queryInterface.addColumn('blogs', 'created_at', timestamp_attributes)
    await queryInterface.addColumn('blogs', 'updated_at', timestamp_attributes)
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'created_at')
    await queryInterface.removeColumn('blogs', 'updated_at')
    await queryInterface.removeColumn('users', 'created_at')
    await queryInterface.removeColumn('users', 'updated_at')
  },
}

module.exports = migration