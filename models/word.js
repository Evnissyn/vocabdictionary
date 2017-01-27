const Sequelize = require('sequelize')
const db = require('./_db')

const Word = db.define('word', {
	spelling: Sequelize.STRING,
	// pronunciation: Sequelize.STRING
})

module.exports = Word;