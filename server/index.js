const express = require('express')
const bodyParser = require('body-parser')

const app = express();

// body-parsing middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('./public'))

app.use('/api', require('./api'))

app.get('/*', (req, res, next) => {
	res.sendFile(resolve(__dirname, '..', 'public', 'index.html'))
})


if (module === require.main) {
	// Start listening only if we're the main module.
	// https://nodejs.org/api/modules.html#modules_accessing_the_main_module
	const server = app.listen(
		process.env.PORT || 1337,
		() => {
			// console.log(`--- Started HTTP Server for ${pkg.name} ---`)
			// console.log(`Listening on ${JSON.stringify(server.address())}`)
			console.log('--- Started HTTP Server for RusDict ---')
			console.log('Listening on Port 1337')
		}
	)
}
