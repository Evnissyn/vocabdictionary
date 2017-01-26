const chai = require('chai');
const {expect, assert} = chai;
const db = require('./index');
const Template = require('./template');
const Word = require('./word')
const Entry = require('./entry');
const WordEntry = require('./wordEntry');
const English = require('./english');


describe('Dictionary Model', () => {
	let nounTemplate, pravilnaWord, pravilnaEntry;

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
				pronunciation: 'пра́вильно'
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

		it('should have a pronunciation', () => {
			expect(pravilnaWord.pronunciation).to.exist;
			expect(pravilnaWord.pronunciation).to.be.equal('пра́вильно')
		})
	})

	describe('Entry', () => {
		before('create a new \'правильно\' entry', () => {
			return Entry.create({
				base: 'правильно',
				partOfSpeech: 'adverb',
			})
		})

		it('should exist in the database')

		it('should have a partOfSpeech')
	})

	describe('WordEntry', () => {
		before('connect pravilnaWord with pravilnaEntry', () => {

		})

		it('should exist in database')

		it('should have a positionInEntry')

		it('should be accessible from pravilnaEntry')

		it('should be accessible from pravilnaWord')
	})

	describe('English', () => {
		before('create a new English meaning', () => {

		})

		it('should exist in the database')

		it('should have ')
	})
})