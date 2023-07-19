const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.renameColumn('blogs', 'created_At', 'created_at')
    await queryInterface.renameColumn('blogs', 'updated_At', 'updated_at')
    await queryInterface.renameColumn('users', 'created_At', 'created_at')
    await queryInterface.renameColumn('users', 'updated_At', 'updated_at')
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.renameColumn('blogs', 'created_at', 'created_At')
    await queryInterface.renameColumn('blogs', 'updated_at', 'updated_At')
    await queryInterface.renameColumn('users', 'created_at', 'created_At')
    await queryInterface.renameColumn('users', 'updated_at', 'updated_At')
  },
}