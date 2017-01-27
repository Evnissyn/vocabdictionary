const Sequelize = require('sequelize')
const db = require('./_db')

const Source = db.define('source', {
	type: Sequelize.STRING,
	title: Sequelize.STRING,
	author: Sequelize.STRING
})

module.exports = Source;