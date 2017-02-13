const express = require('express');

const Word = require('../models/word');

const router = express.Router();

router.get('/', (req, res, next) => {
	Word.findAll()
	.then(foundList => {
		res.json(foundList);
	})
	.catch(next);
})

router.get('/spelling/:spelling', (req, res, next) => {
	Word.findOne({
		where: {
			spelling: req.params.spelling
		}
	})
	.then(foundWord => {
		res.json(foundWord);
	})
	.catch(next)
})

router.get('/id/:id', (req, res, next) => {
	Word.findById(req.params.id)
	.then(foundWord => {
		res.json(foundWord)
	})
	.catch(next)
})

module.exports = router;