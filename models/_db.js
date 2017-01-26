var Sequelize = require('sequelize');

const name = it ? 'RussianTest' : 'Russian'
const url = `postgres://localhost:5432/${name}`

var db = new Sequelize(url, {
// var db = new Sequelize('postgres://localhost:5432/Russian', {
  logging: false,
  native: true
});

module.exports = db;