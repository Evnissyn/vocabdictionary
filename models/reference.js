const Sequelize = require('sequelize')
const db = require('./_db')

const Reference = db.define('reference', {
	context: Sequelize.TEXT,
	page: Sequelize.INTEGER,
	line: Sequelize.INTEGER
})

module.exports = Reference;