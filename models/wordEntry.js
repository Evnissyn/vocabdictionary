const Sequelize = require('sequelize')
const db = require('./_db')

const WordEntry = db.define('WordEntry', {
	positionInEntry: Sequelize.INTEGER
})

module.exports = WordEntry;