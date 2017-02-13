const express = require('express');

const Entry = require('../models/entry');
const Word = require('../models/word');
const Template = require('../models/template');

const router = express.Router();

router.get('/', (req, res, next) => {
	Entry.findAll()
	.then(foundList => {
		res.json(foundList);
	})
	.catch(next);
})

router.get('/base/:base', (req, res, next) => {
	Entry.findOne({
		where: {
			base: req.params.base
		},
		include: [{model: Word}, {model: Template}]
	})
	.then(foundEntry => {
		res.json(foundEntry);
	})
	.catch(next)
})

router.get('/id/:id', (req, res, next) => {
	Entry.findById(req.params.id)
	.then(foundEntry => {
		res.json(foundEntry)
	})
	.catch(next)
})

module.exports = router;