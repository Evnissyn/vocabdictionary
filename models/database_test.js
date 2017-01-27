const db = require('./index');

describe('Set up dictionary database', () => {
	it('database creation', () => {
		return db.sync({force: true});
	})
})

