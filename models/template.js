const Sequelize = require('sequelize')
const db = require('./_db')

const Template = db.define('template', {
	partOfSpeech: Sequelize.STRING,
	wordsPerEntry: Sequelize.INTEGER,
	labelList: Sequelize.ARRAY(Sequelize.TEXT),
	// dimensions: Sequelize.ARRAY
})

module.exports = Template;