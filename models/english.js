const Sequelize = require('sequelize')
const db = require('./_db')

const English = db.define('english', {
	phrase: Sequelize.STRING,
	partOfSpeech: Sequelize.STRING
})

module.exports = English;