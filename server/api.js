const express = require('express');

const router = express.Router()

router.use('/word', require('./word.router'));
router.use('/entry', require('./entry.router'));
router.use('/template', require('./template.router'))



// Send along any errors
router.use((err, req, res, next) => {
	console.log("ERROR")
	console.log(err)
  res.status(500).send(err)
})

// No routes matched? 404.

router.use((req, res) => res.status(404).end())

module.exports = router;