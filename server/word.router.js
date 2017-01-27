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

router.get('/:id', (req, res, next) => {
	Word.findById(req.params.id)
	.then(foundWord => {
		res.json(foundList)
	})
})

module.exports = router;