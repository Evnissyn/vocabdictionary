const db = require('./_db');
const Word = require('./word');
const English = require('./english');
const Entry = require('./entry');
const Template = require('./template');
const WordEntry = require('./wordEntry');

Entry.belongsTo(Template); // 'имя' entry belongs to 'noun' template
Template.hasMany(Entry); // 'noun' template has many entries

// Entry.hasMany(WordEntry); // 'имя' entry has many places wordEntry connections
// WordEntry.belongsTo(Entry); // each wordEntry connect goes to ONE SPOT in ONE ENTRY
// WordEntry.belongsTo(Word); // each SPOT in ONE ENTRY goes to ONE WORD (not dealing with the weirdness that is instrumental case right now)
// Word.hasMany(WordEntry); // each word CAN FIT IN MORE THAN ONE SPOT IN AN ENTRY

Entry.belongsToMany(Word, {through: WordEntry});

Entry.hasMany(English);



module.exports = db;