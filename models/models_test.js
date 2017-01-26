const db = require('./index');

describe('Dictionary Model', () => {
	it('database creation', () => {
		return db.sync({force: true});
	})
})

