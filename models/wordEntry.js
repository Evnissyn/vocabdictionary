const Sequelize = require('sequelize')
const db = require('./_db')

const WordEntry = db.define('WordEntry', {
	positionList: Sequelize.ARRAY(Sequelize.INTEGER),
	pronunciation: Sequelize.STRING
})

module.exports = WordEntry;