const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
      validate: {
        validYear(value) {
          const year = parseInt(value)
          const thisYear = new Date().getFullYear()

          if (year > thisYear)
            throw new Error(`Invalid creation year ${ year }. Creation year can't be in the future`)
        }
      }
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'year')
  },
}