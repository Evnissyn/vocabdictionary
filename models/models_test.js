const chai = require('chai');
const {expect, assert} = chai;
const db = require('./index');
const Template = require('./template');
const Word = require('./word')
const Entry = require('./entry');
const WordEntry = require('./wordEntry');
const EnglishTerm = require('./english');


describe('Dictionary Model', () => {
	let nounTemplate, pravilnaWord, pravilnaEntry, pravilnaEnglishTerm;

	describe('Template', () => {
		before('create a new \'noun\' template', () => {
			return Template.create({
				partOfSpeech: 'noun',
				wordsPerEntry: 12,
				// labelList: ['nominative singular', 'nominative plural']
				labelList: [	'nominative singular', 
								'nominative plural',
								'genitive singular',
								'genitive plural',
								'dative singular',
								'dative plural',
								'accusative singular',
								'accusative plural',
								'instrumental singular',
								'instrumental plural',
								'prepositional singular',
								'prepositional plural'
							]
			})
		})

		it('should exist in the database', () => {
			return Template.findOne({
				where: {
					partOfSpeech: 'noun'
				}
			})
			.then(foundTemplate => {
				nounTemplate = foundTemplate;
				expect(nounTemplate).to.exist;
				// console.log(nounTemplate);
			})
		})

		it('should have at least one wordsPerEntry', () => {
			expect(nounTemplate.wordsPerEntry).to.exist;
			expect(nounTemplate.wordsPerEntry).to.be.above(0)
		})
		
		it('should have at least one label in labelList', () => {
			expect(nounTemplate.labelList).to.exist;
			assert(Array.isArray(nounTemplate.labelList), 'labelList is an array');
		})

		it('has 12 wordsPerEntry', () => {
			expect(nounTemplate.wordsPerEntry).to.be.equal(12);
		})

		it('has the correct labels in the correct order', () => {
			let labelList = nounTemplate.labelList;
			let actualList = [	'nominative singular', 
								'nominative plural',
								'genitive singular',
								'genitive plural',
								'dative singular',
								'dative plural',
								'accusative singular',
								'accusative plural',
								'instrumental singular',
								'instrumental plural',
								'prepositional singular',
								'prepositional plural'
							];
			for (let i = 0; i < 12; i++) {
				expect(labelList[i]).to.be.equal(actualList[i]);
			}
		})
	})

	describe('Word', () => {
		before('create a new \'правильно\' word', () => {
			return Word.create({
				spelling: 'правильно',
				// pronunciation: 'пра́вильно'
			})
		})

		it('should exist in the database', () => {
			return Word.findOne({
				where: {
					spelling: 'правильно'
				}
			})
			.then(foundWord => {
				pravilnaWord = foundWord;
				expect(pravilnaWord).to.exist;
			})
		})
	})

	describe('Entry', () => {
		before('create a new \'правильно\' entry', () => {
			return Entry.create({
				base: 'правильно',
				partOfSpeech: 'adverb',
			})
		})

		it('should exist in the database', () => {
			return Entry.findOne({
				where: {
					base: 'правильно'
				}
			})
			.then(foundEntry => {
				pravilnaEntry = foundEntry;
				expect(pravilnaEntry).to.exist;
			})
		})

		it('should have a partOfSpeech', () => {
			expect(pravilnaEntry.partOfSpeech).to.exist;
			expect(pravilnaEntry.partOfSpeech).to.be.equal('adverb')
		})
	})

	describe('WordEntry', () => {
		before('connect pravilnaWord with pravilnaEntry', () => {
			return pravilnaEntry.addWord(
				pravilnaWord, 
				{
					positionList: [0],
					pronunciation: 'пра́вильно'
				})
			// return pravilnaWord.addEntry(pravilnaEntry, {positionList: 0})
		})

		let pravilnaWordEntry;

		it('should exist in database', () => {
			return WordEntry.findOne({
				where: {
					entryId: pravilnaEntry.id,
					wordId: pravilnaWord.id
				}
			})
			.then(foundWordEntry => {
				pravilnaWordEntry = foundWordEntry;
				expect(pravilnaWordEntry).to.exist;
			})
		})

		it('should have a positionList', () => {
			expect(pravilnaWordEntry.positionList).to.exist;
			assert(Array.isArray(pravilnaWordEntry.positionList))
			expect(pravilnaWordEntry.positionList[0]).to.be.equal(0);
		})

		it('should have a pronunciation', () => {
			expect(pravilnaWordEntry.pronunciation).to.exist;
			expect(pravilnaWordEntry.pronunciation).to.be.equal('пра́вильно');
		})

		it('should be accessible from pravilnaEntry', () => {
			return Entry.findById(pravilnaEntry.id)
			.then(foundEntry => {
				pravilnaEntry = foundEntry;
				return pravilnaEntry.getWords()
			})
			.then(foundThing => {
				expect(foundThing).to.exist;
				assert(Array.isArray(foundThing));
				expect(foundThing[0]).to.exist;
				expect(foundThing[0].spelling).to.exist;
				expect(foundThing[0].WordEntry).to.exist;
				expect(foundThing[0].WordEntry.positionList[0]).to.be.equal(0);
			})
		})

		it('should be accessible from pravilnaWord', () => {
			return Word.findById(pravilnaWord.id)
			.then(foundWord => {
				pravilnaWord = foundWord;
				return pravilnaWord.getEntries()
			})
			.then(foundThing => {
				expect(foundThing).to.exist;
				assert(Array.isArray(foundThing));
				expect(foundThing[0]).to.exist;
				expect(foundThing[0].base).to.exist;
				expect(foundThing[0].partOfSpeech).to.exist;
				expect(foundThing[0].WordEntry).to.exist;
				expect(foundThing[0].WordEntry.positionList[0]).to.be.equal(0);
			})

		})
	})

	describe('EnglishTerm', () => {
		before('create a new English meaning', () => {
			return EnglishTerm.create({
				phrase: 'correctly',
				partOfSpeech: 'adverb'
			})
		})

		it('should exist in the database', () => {
			return EnglishTerm.findOne({
				where: {
					phrase: 'correctly'
				}
			})
			.then(foundEnglishTerm => {
				pravilnaEnglishTerm = foundEnglishTerm;
				expect(pravilnaEnglishTerm).to.exist;
			})
		})

		it('should have a partOfSpeech', () => {
			expect(pravilnaEnglishTerm.partOfSpeech).to.be.equal('adverb')
		})

		it('can be connected to an Entry', () => {
			return pravilnaEntry.addEnglishTerm(pravilnaEnglishTerm)
			.then(_ => {
				return pravilnaEntry.getEnglishTerms()
			})
			.then(foundThing => {
				expect(foundThing).to.exist;
				assert(Array.isArray(foundThing));
				expect(foundThing[0]).to.exist;
				expect(foundThing[0].phrase).to.exist;

				return pravilnaEnglishTerm.getEntries()
			})
			.then(foundThing => {
				expect(foundThing).to.exist;
				assert(Array.isArray(foundThing));
				expect(foundThing[0]).to.exist;
				expect(foundThing[0].base).to.exist;
			})

			// return pravilnaEnglishTerm.addEntries(pravilnaEntry)
			// .then(_ => {
			// 	return pravilnaEntry.getEnglishTerms()
			// })
			// .then(foundThing => {
			// 	expect(foundThing).to.exist;
			// 	assert(Array.isArray(foundThing));
			// 	expect(foundThing[0]).to.exist;
			// 	expect(foundThing[0].phrase).to.exist;
			// })
		})
	})

	let imyaEntry, imyaEnglishTerm, imyaWord;

	describe('creating Entry from Template', () => {
		before('create new \'имя\' entry from noun template', () => {
			return nounTemplate.createEntry({
				base: 'имя',
				partOfSpeech: 'noun'
			})
		})

		it('Entry should exist in the database', () => {
			return Entry.findOne({
				where: {
					base: 'имя'
				}
			})
			.then(foundEntry => {
				imyaEntry = foundEntry;
				expect(imyaEntry).to.exist;
			})
		})

		it('Entry should be able to access Template', () => {
			imyaEntry.getTemplate()
			.then(foundThing => {
				expect(foundThing).to.exist;
				expect(foundThing.partOfSpeech).to.be.equal('noun');
				expect(foundThing.wordsPerEntry).to.be.equal(12);
			})
		})

		it('Template should be able to access Entry', () => {
			nounTemplate.getEntries()
			.then(foundThing => {
				expect(foundThing).to.exist;
				assert(Array.isArray(foundThing));
				expect(foundThing.length).to.be.equal(1);
				expect(foundThing[0].base).to.be.equal('имя');
			})
		})
	})

	describe('creating English meaning from Entry', () => {
		before('create new English term from \'имя\' entry', () => {
			return imyaEntry.createEnglishTerm({
				phrase: 'name',
				partOfSpeech: 'noun'
			})
		})

		it('new english term should exist in database', () => {
			return EnglishTerm.findOne({
				where: {
					phrase: 'name'
				}
			})
			.then(foundEnglishTerm => {
				imyaEnglishTerm = foundEnglishTerm
				expect(foundEnglishTerm).to.exist;
			})
		})

		it('english term should be accessible from entry', () => {
			imyaEntry.getEnglishTerms()
			.then(foundThing => {
				expect(foundThing).to.exist;
				assert(Array.isArray(foundThing));
				expect(foundThing[0].phrase).to.exist;
				expect(foundThing[0].phrase).to.be.equal('name');
			})
		})
		it('entry should be accessible from english term', () => {
			imyaEnglishTerm.getEntries()
			.then(foundThing => {
				expect(foundThing).to.exist;
				assert(Array.isArray(foundThing));
				expect(foundThing[0].base).to.exist;
				expect(foundThing[0].base).to.be.equal('имя');
			})
		})
	})

	describe('creating Word from Entry', () => {
		before('create new \'имя\' word from \'имя\' entry', () => {
			return imyaEntry.createWord({
				spelling: 'имя',
			}, {
				positionList: [0,6],
				pronunciation: 'и́мя'
			})
		})

		it('new word should exist in the database', () => {
			return Word.findOne({
				where: {
					spelling: 'имя'
				}
			})
			.then(foundWord => {
				imyaWord = foundWord;
				expect(foundWord).to.exist;
				// expect(foundWord.pronunciation).to.be.equal('и́мя');
			})
		})

		it('new wordEntry should exist in the database', () => {
			return WordEntry.findOne({
				where: {
					wordId: imyaWord.id,
					entryId: imyaEntry.id
				}
			})
			.then(foundWordEntry => {
				expect(foundWordEntry).to.exist;

				expect(foundWordEntry.positionList).to.exist;
				expect(foundWordEntry.positionList.length).to.be.equal(2);
				expect(foundWordEntry.positionList).to.include(0);
				expect(foundWordEntry.positionList).to.include(6);

				expect(foundWordEntry.pronunciation).to.exist;
				expect(foundWordEntry.pronunciation).to.be.equal('и́мя')
			})
		})
		it('new word should be accessible from entry', () => {
			return imyaEntry.getWords()
			.then(foundThing => {
				expect(foundThing).to.exist;
				assert(Array.isArray(foundThing));
				expect(foundThing[0].spelling).to.exist;
				expect(foundThing[0].spelling).to.be.equal('имя');
			})
		})

		it('entry should be accessible from new word', () => {
			return imyaWord.getEntries()
			.then(foundThing => {
				expect(foundThing).to.exist;
				assert(Array.isArray(foundThing));
				expect(foundThing[0].base).to.exist;
				expect(foundThing[0].base).to.be.equal('имя');
			})
		})
	})

	describe('Source', () => {
		before('create new source', () => {

		})

		it('should exist in the database')
		it('should have source type')
		it('should have source title')
		it('should have source author')
	})

	describe('Reference', () => {
		before('create new reference', () => {
			// need to create 2 references
		})

		it('should exist in the database')
		it('can be connected to source by source.addReference')
		it('can be connected to source by reference.setSource')
		it('can create new reference from source')
	})
})