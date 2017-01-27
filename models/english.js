const Sequelize = require('sequelize')
const db = require('./_db')

const EnglishTerm = db.define('englishTerm', {
	phrase: Sequelize.STRING,
	partOfSpeech: Sequelize.STRING
})

module.exports = EnglishTerm;