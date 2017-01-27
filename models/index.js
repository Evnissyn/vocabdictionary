const db = require('./_db');

const Word = require('./word');
const EnglishTerm = require('./english');
const Entry = require('./entry');
const Template = require('./template');
const WordEntry = require('./wordEntry');

const Reference = require('./reference');
const Source = require('./source');

Entry.belongsTo(Template); // 'имя' entry belongs to 'noun' template
Template.hasMany(Entry); // 'noun' template has many entries

// Entry.hasMany(WordEntry); // 'имя' entry has many places wordEntry connections
// WordEntry.belongsTo(Entry); // each wordEntry connect goes to ONE SPOT in ONE ENTRY
// WordEntry.belongsTo(Word); // each SPOT in ONE ENTRY goes to ONE WORD (not dealing with the weirdness that is instrumental case right now)
// Word.hasMany(WordEntry); // each word CAN FIT IN MORE THAN ONE SPOT IN AN ENTRY

Entry.belongsToMany(Word, {through: WordEntry});
Word.belongsToMany(Entry, {through: WordEntry});

Entry.belongsToMany(EnglishTerm, {through: "EnglishEntries"});
EnglishTerm.belongsToMany(Entry, {through: "EnglishEntries"});

Reference.belongsTo(Source);
Source.hasMany(Reference);

Word.belongsToMany(Reference, {through: "WordReferences"});
Reference.belongsToMany(Word, {through: "WordReferences"});

module.exports = db;