const Sequelize = require('sequelize')
const db = require('./_db')

const Entry = db.define('entry', {
	base: Sequelize.STRING,
	partOfSpeech: Sequelize.STRING,
	tags: Sequelize.ARRAY(Sequelize.STRING)
})

module.exports = Entry;