const express = require('express');

const Template = require('../models/template');
const Word = require('../models/word');
const Template = require('../models/template');

const router = express.Router();

router.get('/', (req, res, next) => {
	Template.findAll()
	.then(foundList => {
		res.json(foundList);
	})
	.catch(next);
})

router.get('/partOfSpeech/:partOfSpeech', (req, res, next) => {
	Template.findOne({
		where: {
			partOfSpeech: req.params.partOfSpeech
		},
		include: [{model: Entry}]
	})
	.then(foundTemplate => {
		res.json(foundTemplate);
	})
	.catch(next)
})

router.post('new', (req, res, next) => {

})

router.post('edit/:partOfSpeech', (req, res, next) => {

})

module.exports = router;